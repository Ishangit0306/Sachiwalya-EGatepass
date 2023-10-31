import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../types';

export const isAuthenticated = createSelector(
    (state: RootState) => state.authentication.isLoggedIn,
    isLoggedIn => isLoggedIn,
);

export const selectAuthenticated = (state: RootState) => state.authentication
