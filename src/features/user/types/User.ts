import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const User = z.object({
  name: z.string(),
  preferredName: z.string(),
  email: z.string().email(),
  imageUrl: z.string().optional(),
  stripeCustomerId: z.string().optional(), // The Stripe customer ID
  isEmailVerified: z.boolean().default(false),
  oneTimePurchases: z.array(z.string()).default([]), // IDs of purchased products
  receiptUrls: z.array(z.string()).default([]).optional(),
});

export const UserPartial = User.partial();

export type User = z.infer<typeof User>;
export interface UserWithId extends User {
  _id: ObjectId;
}
export type UserPartial = z.infer<typeof UserPartial>;
