import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

export interface IUser {
  primaryId: string; // email or phone
  name?: string;
  preferredName?: string;
  profilePicture?: string;
  email?: string;
  phone?: string | null | undefined;
  isEmailVerified: boolean;
  isPhoneVerified?: boolean;
  stripeCustomerId?: string;
  oneTimePurchases?: string[];
  preferences: {
    emailNotifications: boolean;
    activityReminders: boolean;
    personalizedSuggestions: boolean;
  };
  sid?: string;
  _id: string;
}

export interface IUserSlice extends IUser {
  isAuthenticated: boolean;
}

export const initialUserState: IUserSlice = {
  primaryId: '',
  isAuthenticated: false,
  name: '',
  preferredName: '',
  isEmailVerified: true,
  profilePicture: '',
  email: '',
  phone: '',
  isPhoneVerified: false,
  sid: '',
  _id: '',
  preferences: {
    emailNotifications: true,
    activityReminders: true,
    personalizedSuggestions: true,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserSlice>) => {
      return { ...state, ...action.payload };
    },
    logout: () => initialUserState,
    setOneTimePurchases(state, action: PayloadAction<string[]>) {
      state.oneTimePurchases = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setPreferredName(state, action: PayloadAction<string>) {
      state.preferredName = action.payload;
    },
    setProfilePicture(state, action: PayloadAction<string>) {
      state.profilePicture = action.payload;
    },
    setPreferences(
      state,
      action: PayloadAction<{
        emailNotifications: boolean;
        activityReminders: boolean;
        personalizedSuggestions: boolean;
      }>
    ) {
      state.preferences = action.payload;
    },
  },
});

export const { setUser, logout, setOneTimePurchases, setName, setPreferredName, setProfilePicture, setPreferences } =
  userSlice.actions;

export const selectUser = (state: RootState): IUserSlice => state.user;
export const selectIsAuthenticated = (state: RootState): boolean => state.user.isAuthenticated;
export const selectName = (state: RootState): string | undefined => state.user.name;
export const selectPreferredName = (state: RootState): string | undefined => state.user.preferredName;
export const selectProfilePicture = (state: RootState): string => state.user.profilePicture ?? '';
export const selectEmail = (state: RootState): string => state.user.email ?? '';
export const selectPhone = (state: RootState): string | null | undefined => state.user.phone;
export const selectIsEmailVerified = (state: RootState): boolean => state.user.isEmailVerified ?? false;
export const selectIsPhoneVerified = (state: RootState): boolean => state.user.isPhoneVerified ?? false;
export const selectSid = (state: RootState): string => state.user.sid ?? '';
export const selectUserId = (state: RootState): string => state.user._id;
export const selectPreferences = (
  state: RootState
): {
  emailNotifications: boolean;
  activityReminders: boolean;
  personalizedSuggestions: boolean;
} => {
  return state.user.preferences;
};

export const userReducer = userSlice.reducer;
