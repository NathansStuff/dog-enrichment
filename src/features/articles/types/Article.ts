import { Category } from './Category';

export interface Article {
  _id: string;
  publishedAt: string;
  updatedAt: string;
  title: string;
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  categories: Category[];
  slug: {
    current: string;
  };
  body: object[];
  keywords: string;
}
