import { Schema } from 'mongoose';

import { User } from '@/features/user/types/User';

export const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    preferredName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: false },
    stripeCustomerId: { type: String, required: false },
    isEmailVerified: { type: Boolean, required: true, default: false },
    oneTimePurchases: { type: [String], required: true, default: [] },
    receiptUrls: { type: [String], required: true, default: [] },
  },
  { timestamps: true }
);
