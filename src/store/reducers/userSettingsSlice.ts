import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from '../store';
import { storage, storageGetItem } from '../../utils/storage';

export type langType = 'en' | 'ru';
interface initialStateTypes {
  isThemeLight: boolean;
  searchDebounce: number;
  language: langType;
}

const initialState = storageGetItem(storage.settings) ?? {
  isThemeLight: false,
  searchDebounce: 1000,
  language: 'en'
};

export const userSettingsSlice = createSlice({
  name: 'userSettingsSlice',
  initialState: initialState as initialStateTypes,
  reducers: {
    setThemeLight: (state) => {
      state.isThemeLight = true;
    },
    setThemeDark: (state) => {
      state.isThemeLight = false;
    },
    setSearchDebounce: (state, { payload }: PayloadAction<number>) => {
      state.searchDebounce = payload;
    },
    setLanguage: (state, { payload }: PayloadAction<langType>) => {
      state.language = payload;
    }
  }
});

export const selectorUserSettingsSlice = (state: IRootState) => state.userSettingsSlice;
export const { setThemeLight, setThemeDark, setSearchDebounce, setLanguage } =
  userSettingsSlice.actions;
export default userSettingsSlice.reducer;
