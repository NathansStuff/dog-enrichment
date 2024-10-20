import React from 'react';

import Link from 'next/link';

import { Category } from '../types/Category';

interface Props {
  category: Category;
}

function CategoryPill({ category }: Props): React.JSX.Element {
  return (
    <Link
      key={category.slug?.current}
      href={`/articles?category=${category.slug}`}
      // https://v2.tailwindcss.com/docs/optimizing-for-production
      // Can't use string concatenation or move this to a switch function due to tailwind purge
      className={`my-2 inline-block rounded-full px-4 py-1 text-sm font-medium leading-none transition-colors ${category.tagColor?.toLocaleUpperCase() === 'BLUE' && 'bg-blue-500 text-white'} ${category.tagColor?.toLocaleUpperCase() === 'GREEN' && 'bg-green-500 text-white'} ${category.tagColor?.toLocaleUpperCase() === 'YELLOW' && 'bg-yellow-500 text-white'} ${category.tagColor?.toLocaleUpperCase() === 'RED' && 'bg-red-500 text-white'} ${category.tagColor?.toLocaleUpperCase() === 'PURPLE' && 'bg-purple-500 text-white'}`}
    >
      {category.title}
    </Link>
  );
}

export default CategoryPill;
