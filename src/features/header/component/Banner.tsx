import React from 'react';

import { ArrowRight } from 'lucide-react';

function Banner(): React.JSX.Element {
  return (
    <div className='flex items-center justify-center gap-3 bg-black py-3 text-sm text-white dark:bg-white/10 dark:text-black'>
      <p className='hidden text-white/60 dark:text-white/60 md:block'>
        Discover creative DIY puzzle toys to keep your furry friend mentally stimulated and happy.
      </p>
      <div className='inline-flex items-center gap-1 dark:text-white'>
        <p className=''>Join Now</p>
        <ArrowRight className='inline-flex size-4 items-center justify-center' />
      </div>
    </div>
  );
}

export default Banner;
