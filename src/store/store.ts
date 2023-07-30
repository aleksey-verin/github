import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userReposSlice from './reducers/userReposSlice';
import searchValueSlice from './reducers/searchValueSlice';
import userAuthSlice from './reducers/userAuthSlice';
import searchSortingValueSlice from './reducers/searchSortingValueSlice';
import userSettingsSlice from './reducers/userSettingsSlice';
import searchUsersSlice from './reducers/searchUsersSlice';
import singleUserSlice from './reducers/singleUserSlice';
import { storage, storageSetItem } from '../utils/storage';

export const rootReducer = combineReducers({
  searchValueSlice,
  searchUsersSlice,
  searchSortingValueSlice,
  singleUserSlice,
  userAuthSlice,
  userReposSlice,
  userSettingsSlice
});

export const store = configureStore({
  reducer: rootReducer
});

store.subscribe(() => {
  storageSetItem(storage.isAuth, store.getState().userAuthSlice.isAuth);
  storageSetItem(storage.userAuth, store.getState().userAuthSlice.user);
  storageSetItem(storage.searchValue, store.getState().searchValueSlice.search);
  storageSetItem(
    storage.searchSortingValue,
    store.getState().searchSortingValueSlice.searchSortingValue
  );
  storageSetItem(storage.searchUsersResults, store.getState().searchUsersSlice);
  storageSetItem(storage.settings, store.getState().userSettingsSlice);
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
