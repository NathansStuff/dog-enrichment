import sanityClient from '@sanity/client';

import { env } from '@/constants';

export const sanityConfig = {
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  apiVersion: '2021-04-20',
  useCdn: env.NEXT_PUBLIC_ENVIRONMENT === 'production',
  token: env.SANITY_API_TOKEN,
};

export const mySanityClient = sanityClient(sanityConfig);
