import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';
import { ROLE_TYPE_USER } from '../../utils/config';

export type LoginPayloadType = {
  user: User;
  token: string;
  role: string | number;
 orgName:string;
};

const initialState: AuthState = {
  user: null,
  token: null,
  role: null,
  isLoggedIn: false,
  sendSmsStatus: false,
  smsSendToNumber: null,
  number:null,
  orgName:null,
};

export const slice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<LoginPayloadType>,
    ) => {
      const { user, token, role ,orgName} = action.payload;

      return {
        ...state,
        user,
        token,
        role,
        isLoggedIn: true,
        sendSmsStatus: false,
        orgName
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
        state.orgName=action.payload.orgName
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
