import createImageUrlBuilder from '@sanity/image-url';
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';

import { sanityConfig } from '@/lib/sanity';

export const urlFor = (source: { asset: { url: string } }): ImageUrlBuilder =>
  createImageUrlBuilder(sanityConfig).image(source);
