import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from '../store';
import { storage, storageGetItem } from '../../utils/storage';
import { searchUserSortingOptions } from '../../utils/constants';

interface initialStateTypes {
  searchSortingValue: keyof typeof searchUserSortingOptions;
}

const initialState = {
  searchSortingValue: storageGetItem(storage.searchSortingValue) ?? 'bestMatch'
};

export const searchSortingValueSlice = createSlice({
  name: 'searchSortingValueSlice',
  initialState: initialState as initialStateTypes,
  reducers: {
    setSortingValue: (state, { payload }: PayloadAction<keyof typeof searchUserSortingOptions>) => {
      state.searchSortingValue = payload;
    },
    clearSortingValue: (state) => {
      state.searchSortingValue = 'bestMatch';
    }
  }
});

export const selectorSearchSortingValue = (state: IRootState) => state.searchSortingValueSlice;
export const { setSortingValue, clearSortingValue } = searchSortingValueSlice.actions;
export default searchSortingValueSlice.reducer;
