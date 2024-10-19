'use client';

import React from 'react';

import { CheckIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import { pricingFeatures } from '@/data/pricingFeatures';
import { products } from '@/data/products';
import ProductCard from '@/features/user/components/ProductCard';

export default function BillingPage(): React.JSX.Element {
  const user = useAppSelector(selectUser);
  const purchases = user.oneTimePurchases;

  const hasPurchased = purchases && purchases?.length > 0;

  const product = products[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {hasPurchased ? (
          <ProductCard />
        ) : (
          <>
            <div>
              <h3 className='text-lg font-medium'>Lifetime Access</h3>
              <p className='text-muted-foreground'>Unlock a world of dog enrichment with a one-time payment.</p>
            </div>
            <div>
              <span className='text-2xl font-bold text-foreground'>$19.99</span>
              <span className='text-muted-foreground'> one-time</span>
            </div>
            <Button
              className='w-full'
              size='lg'
              asChild
            >
              <Link href={`/checkout/product/${product.productId}`}>Get Started</Link>
            </Button>
            <div>
              <h3 className='mb-2 text-lg font-medium'>Features</h3>
              <ul className='space-y-2'>
                {pricingFeatures.map((feature, index) => (
                  <li
                    key={index}
                    className='flex items-center'
                  >
                    <CheckIcon className='mr-2 h-5 w-5 text-primary' />
                    <span className='text-foreground'>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
