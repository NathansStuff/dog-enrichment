'use client';

import React from 'react';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

export default function Hero(): React.JSX.Element {
  return (
    <section className='bg-gradient pb-20 pt-8'>
      <div className='container mx-auto px-4'>
        <div className='items-center md:flex md:gap-8'>
          <div className='md:w-[500px]'>
            <div className='inline-block rounded-full bg-background px-3 py-1 text-sm font-semibold text-primary'>
              100+ Enrichment Activities
            </div>
            <h1 className='mt-6 bg-gradient-to-b from-primary to-primary/60 bg-clip-text text-4xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl'>
              Enrich Your Dog&apos;s Life Every Day
            </h1>
            <p className='mt-6 text-xl tracking-tight text-primary-foreground'>
              Discover fun and engaging activities to keep your furry friend happy, healthy, and mentally stimulated.
            </p>
            <div className='mt-8 flex items-center gap-4'>
              <Button
                size='lg'
                className='bg-primary text-primary-foreground hover:bg-primary/90'
              >
                Get Started
              </Button>
              <Button
                variant='ghost'
                size='lg'
                className='text-primary hover:bg-primary/10 hover:text-primary'
              >
                <span>Learn more</span>
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </div>
          <div className='relative mt-12 md:mt-0 md:flex-1'>
            <div className='aspect-square overflow-hidden rounded-lg shadow-xl'>
              <Image
                src='/hero.jpg'
                alt='Happy dog playing with a colorful toy'
                width={648}
                height={648}
                className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
