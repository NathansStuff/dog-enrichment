'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BillingPage(): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <h3 className='text-lg font-medium'>Current Plan</h3>
          <p className='text-muted-foreground'>Lifetime Access</p>
        </div>
        <div>
          <h3 className='text-lg font-medium'>Payment Method</h3>
          <p className='text-muted-foreground'>Visa ending in 1234</p>
        </div>
        <div>
          <h3 className='text-lg font-medium'>Billing History</h3>
          <ul className='list-inside list-disc text-muted-foreground'>
            <li>June 1, 2023 - $19.99</li>
          </ul>
        </div>
        <Button>Download Invoice</Button>
      </CardContent>
    </Card>
  );
}
