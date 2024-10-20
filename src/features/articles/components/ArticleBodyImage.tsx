import React from 'react';

import Image from 'next/image';

interface Props {
  text: string;
}

function ArticleBodyImage({ text }: Props): React.JSX.Element {
  // expect text to be like "ARTICLEIMAGE: https://trailkitchens.com/cdn/shop/articles/sprinter_campervan_conversion_by_grant_wilson_c9c759e1-8a01-4f10-9a6c-55763da262b7_1024x.jpg?v=1554225295 alt=test alt description"
  // we want to get the first match and then the second group which is the url
  const image = text.split(' ')[1];
  const altAndDescription = text
    .split(' ')
    .slice(2) // Skip the first two elements which are '{{image:' and the URL
    .join(' ') // Join the remaining parts
    .split('alt=')[1]; // Get the part after 'alt='
  const alt = altAndDescription?.trim(); // Remove any leading or trailing whitespace

  return (
    <Image
      src={image}
      alt={alt}
      width={1920}
      height={1080}
    />
  );
}

export default ArticleBodyImage;
