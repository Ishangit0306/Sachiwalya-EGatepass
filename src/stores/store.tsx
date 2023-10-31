import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authentication } from './authentication/slice';
import { appointment } from './appointment/slice';
import { visitors } from './visitors/slice';
import { RootState } from '../types';
import { user } from './userdata/slice';

/* This creates a configuration object that defines how the Redux store's state 
  should be persisted to AsyncStorage.
  It specifies AsyncStorage as the storage engine to be used, 
  key prefix to avoid conflicts, and any other necessary options.
*/
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: AsyncStorage,
};

/**
  This creates a persisted reducer by combining the root reducer with the persisted state 
  using the persistConfig options.
  It ensures that the Redux store's state is persisted even after 
  a page refresh or app restart.
 */
const rootReducer = combineReducers({
  authentication,
  appointment,
  visitors,
  user
});

// Wraps the root reducer with the persist reducer to persist the Redux store's state.
const persistedReducer = persistReducer<RootState, Action>(
  persistConfig,
  rootReducer,
);

// Creates and exports the Redux store, which holds the complete state tree of the application.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableStateInvariant: false
    }),
});

// Creates a Redux persistor that can be used to persist and rehydrate the store's state.
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
