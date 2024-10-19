import { ReactNode } from 'react';

import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function Footer(): ReactNode {
  return (
    <footer className='bg-primary py-12 text-primary-foreground'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Dog Enrichment</h3>
            <p className='text-sm'>Enhancing the lives of dogs through engaging activities and mental stimulation.</p>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='#'
                  className='text-sm hover:underline'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-sm hover:underline'
                >
                  Activities
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-sm hover:underline'
                >
                  Calendar
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-sm hover:underline'
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Resources</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='#'
                  className='text-sm hover:underline'
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-sm hover:underline'
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-sm hover:underline'
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-sm hover:underline'
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Follow Us</h3>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='hover:text-green-300'
              >
                <Instagram className='h-6 w-6' />
              </a>
              <a
                href='#'
                className='hover:text-green-300'
              >
                <Facebook className='h-6 w-6' />
              </a>
              <a
                href='#'
                className='hover:text-green-300'
              >
                <Twitter className='h-6 w-6' />
              </a>
              <a
                href='#'
                className='hover:text-green-300'
              >
                <Youtube className='h-6 w-6' />
              </a>
            </div>
          </div>
        </div>
        <div className='mt-8 border-t border-primary/20 pt-8 text-center text-sm'>
          <p>&copy; {new Date().getFullYear()} Dog Enrichment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
