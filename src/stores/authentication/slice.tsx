import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';

export type LoginPayloadType = {
  user: User;
  token: string;
  role: string | number;
};

const initialState: AuthState = {
  user: null,
  token: null,
  role: null,
  isLoggedIn: false,
  sendSmsStatus: false,
  smsSendToNumber: null
};

export const slice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<LoginPayloadType>,
    ) => {
      const { user, token, role } = action.payload;

      return {
        ...state,
        user,
        token,
        role,
        isLoggedIn: true,
        sendSmsStatus: false
      };
    },
    smsStatus: (state, action: PayloadAction<{ status: boolean, number: number }>) => {
      state.sendSmsStatus = action.payload.status;
      state.smsSendToNumber = action.payload. number
    },
    logoutSuccess: () => {
      return initialState;
    },
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  smsStatus
} = slice.actions;

export const authentication = slice.reducer;
