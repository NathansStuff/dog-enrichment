import Stripe from 'stripe';

import { env } from '@/constants';
import { products } from '@/data/products';
import { BadRequestError } from '@/exceptions';
import { getUserByEmailService, getUserByIdService, updateUserByIdService } from '@/features/user/server/userService';
import { UserPartial } from '@/features/user/types/User';
import { stripe } from '@/lib/serverStripe';

// Retrieve or create a customer
async function getOrCreateStripeCustomer(customerId: string | null, email: string): Promise<Stripe.Customer> {
  if (customerId) {
    const customer = await stripe.customers.retrieve(customerId);
    if (customer) return customer as Stripe.Customer;
  }

  // If customerId is not provided or the customer does not exist, create a new customer
  const customer = await stripe.customers.create({
    email,
  });

  return customer;
}

// Create a PaymentIntent for a one-time purchase
export async function createPaymentIntent(
  email: string,
  priceId: string,
  customerId: string | null,
  userId: string
): Promise<Stripe.PaymentIntent> {
  // Find the product based on the priceId
  const product = products.find((p) => p.priceId === priceId);

  if (!product) {
    throw new Error('Product not found');
  }

  // Retrieve or create the customer
  const customer = await getOrCreateStripeCustomer(customerId, email);

  // Create the PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(product.amount),
    currency: 'usd',
    customer: customer.id,
    payment_method_types: ['card'],
    receipt_email: email,
    metadata: {
      productId: product.productId,
      userId: userId,
    },
  });

  return paymentIntent;
}

export function getStripeEvent(signature: string | null, body: string): Stripe.Event {
  if (!signature) {
    throw new BadRequestError('Stripe signature is missing');
  }

  try {
    return stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    if (err instanceof Error) {
      throw new BadRequestError(`Webhook signature verification failed. ${err.message}`);
    } else {
      throw new BadRequestError('Webhook signature verification failed');
    }
  }
}

export async function handleStripeEventService(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case 'payment_intent.created': {
      // ✅ Product ❌ Subscription
      // Logic for when a payment intent is created
      // Do nothing
      break;
    }
    case 'payment_intent.succeeded': {
      // ✅ Product ✅ Subscription
      // Logic for handling successful payments
      // Do nothing => (success is handled by `charge.succeeded` or `invoice.payment_succeeded`)
      break;
    }
    case 'payment_intent.payment_failed': {
      // ✅ Product ✅ Subscription
      // Logic for when the payment fails
      // Do nothing
      break;
    }
    case 'charge.succeeded': {
      // ✅ Product ✅ Subscription
      // Logic for successful charge
      const isSubscription = event.data.object.invoice !== null;
      if (isSubscription) break;
      const { userId, productId } = event.data.object.metadata;
      const receiptUrl = event.data.object.receipt_url;
      await handleProductPurchase(userId, productId, receiptUrl);
      break;
    }
    case 'charge.failed': {
      // ✅ Product ✅ Subscription
      // Logic for failed charge
      // Do nothing => Failure is handled by stripe dashboard settings
      break;
    }
    case 'charge.updated': {
      // ✅ Product ✅ Subscription
      // Logic for when a charge is updated
      // Generally used for dispute or payment method updates
      // You can log the update or notify the user of any critical charge changes
      // todo: Log this event
      break;
    }
    case 'payment_method.attached': {
      // ❌Product ✅ Subscription
      // Logic to handle when a payment method is attached to a customer
      // Do nothing
      break;
    }
    case 'customer.subscription.updated': {
      // ❌Product ✅ Subscription
      // Handle non-payment subscription updates, like plan changes or cancellations
      break;
    }
    case 'invoice.updated': {
      // ❌Product ✅ Subscription
      // Logic to handle updates to invoices, such as new charges or adjustments.
      // Do nothing
      break;
    }
    case 'invoice.paid': {
      // ❌Product ✅ Subscription
      // Logic to handle fully paid invoices, such as activating or extending subscriptions.
      // Do nothing => Handled in `invoice.payment_succeeded`
      break;
    }
    case 'invoice.payment_succeeded': {
      // ❌Product ✅ Subscription
      // Logic for successful invoice payment, updating the subscription status accordingly.
      // This is the place to handle subscription payments and update user status
      const invoice = event.data.object;
      handleInvoicePaymentSucceeded(invoice);
      console.log('invoice.payment_succeeded');
      break;
    }
    case 'invoice.created':
      await handleInvoiceCreated(event.data.object as Stripe.Invoice);
      break;

    default:
    // Unhandled event type
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
  const { subscription, customer_email } = invoice;
  const invoiceUrl = invoice.invoice_pdf;

  console.log('Invoice URL:', invoiceUrl);

  if (!subscription || !customer_email) {
    console.log('subscription', subscription, 'customer_email', customer_email);
    throw new BadRequestError('Subscription or customer email not found');
  }

  const user = await getUserByEmailService(customer_email);
  if (!user) {
    throw new BadRequestError('User not found');
  }

  if (!invoiceUrl) {
    console.log('no invoice Url');
    return;
  }
  const newUser: UserPartial = {
    // Update invoiceUrls instead of receiptUrls
    receiptUrls: [...(user.receiptUrls || []), invoiceUrl],
  };

  // Always update the user
  await updateUserByIdService(user._id.toString(), newUser);

  // Log the subscription update
  console.log(`Subscription ${subscription} updated for user ${user._id}`);
}

async function handleProductPurchase(userId: string, productId: string, receiptUrl: string | null): Promise<void> {
  const user = await getUserByIdService(userId);
  // Identify if new purchase includes tokens
  const product = products.find((prod) => prod.productId === productId);
  if (!user || !product) {
    // todo: Log
    console.log('User or product not found', { userId, productId });
    throw new BadRequestError('User or product not found');
  }
  const wasOneTimePurchase = true;
  const oneTimePurchases = user.oneTimePurchases || [];
  if (wasOneTimePurchase) {
    oneTimePurchases.push(productId);
  }

  const newUser: UserPartial = {
    oneTimePurchases,
    receiptUrls: receiptUrl ? [...(user.receiptUrls || []), receiptUrl] : user.receiptUrls,
  };
  await updateUserByIdService(userId, newUser);
}

async function handleInvoiceCreated(invoice: Stripe.Invoice): Promise<void> {
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);

    if (subscription.metadata.downgrade_scheduled === 'true') {
      const newPriceId = subscription.metadata.new_price_id;

      if (newPriceId) {
        await stripe.subscriptions.update(subscription.id, {
          items: [
            {
              id: subscription.items.data[0].id,
              price: newPriceId,
              quantity: 1,
            },
          ],
          proration_behavior: 'none',
          metadata: {
            downgrade_scheduled: 'false',
            new_price_id: '',
          },
        });

        console.log(`Downgrade applied for subscription ${subscription.id}`);
      }
    }
  }
}
