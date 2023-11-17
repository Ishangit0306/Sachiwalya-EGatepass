import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';
import { ROLE_TYPE_USER } from '../../utils/config';

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
  smsSendToNumber: null,
  number:null
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
      state.smsSendToNumber = action.payload.number
    },
    logoutSuccess: () => {
      return initialState;
    },
    userloginSuccess: (state,action) => {
      state.number=action.payload.data
      state.isLoggedIn = true,
        state.role = ROLE_TYPE_USER
    }
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  userloginSuccess,
  smsStatus
} = slice.actions;

export const authentication = slice.reducer;
