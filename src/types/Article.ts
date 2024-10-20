import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface Article {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  category: {
    _ref: string;
    _type: string;
  };
  heroImage: SanityImageSource;
  content: any[]; // This can be further typed if needed
  publishedAt: string;
}
