import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { CreatePurchaseRequest } from '@/features/stripe/types/CreatePurchaseRequest';
import { ResponseCode } from '@/types/ResponseCode';

import { createPaymentIntent, getStripeEvent, handleStripeEventService } from './stripeService';

export async function createOneTimePurchaseHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = CreatePurchaseRequest.parse(data);
  const paymentIntent = await createPaymentIntent(
    safeBody.email,
    safeBody.priceId,
    safeBody.customerId,
    safeBody.userId
  );
  return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: ResponseCode.OK });
}

export async function stripeWebhookHandler(req: NextRequest): Promise<NextResponse> {
  const body = await req.text();
  const signature = headers().get('stripe-signature');
  const event = getStripeEvent(signature, body);
  await handleStripeEventService(event);
  return NextResponse.json({ received: true }, { status: ResponseCode.OK });
}
