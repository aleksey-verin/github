import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, IRootState } from '../store';
import { getSearchUsersUrl } from '../../utils/api-helpers';
import { getNumberOfPages, getSearchParamsFormSelect } from '../../utils/helpers';
import { storage, storageGetItem } from '../../utils/storage';
import { ResultUser, ResultUserList, UsersSearchParams } from '../types/usersType';
import { searchUserSortingOptions } from '../../utils/constants';

const defaultValues = {
  resultUserList: null,
  totalCountUsers: null,
  params: {
    per_page: 12,
    page: 1,
    sort: null,
    order: null
  },
  numberOfPages: 0
};

interface initialStateTypes {
  resultUserList: ResultUser[] | null;
  totalCountUsers: number | null;
  params: UsersSearchParams;
  numberOfPages: number;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState = storageGetItem(storage.searchUsersResults) ?? {
  resultUserList: defaultValues.resultUserList,
  totalCountUsers: defaultValues.totalCountUsers,
  params: {
    per_page: defaultValues.params.per_page,
    page: defaultValues.params.page,
    sort: defaultValues.params.sort,
    order: defaultValues.params.order
  },
  numberOfPages: defaultValues.numberOfPages,
  isLoading: false,
  isSuccess: false,
  isError: false
};

export const getResultUsers = createAsyncThunk<
  ResultUserList,
  { searchValue: string; oAuthToken: string | undefined; params?: UsersSearchParams },
  {
    dispatch: AppDispatch;
    state: IRootState;
  }
>('getResultUsers', async ({ searchValue, oAuthToken, params = initialState.params }, thunkAPI) => {
  try {
    const url = getSearchUsersUrl(searchValue, params);
    const headersList = {
      Accept: '*/*',
      Authorization: `Bearer ${oAuthToken}`
    };
    if (!url) return;
    const response = await fetch(url, {
      method: 'GET',
      headers: oAuthToken ? headersList : {}
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      // thunkAPI.dispatch(set)
      return thunkAPI.rejectWithValue(data?.message);
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const searchUsersSlice = createSlice({
  name: 'searchUsersSlice',
  initialState: initialState as initialStateTypes,
  reducers: {
    clearSearchData: (state) => {
      state.resultUserList = defaultValues.resultUserList;
      state.totalCountUsers = defaultValues.totalCountUsers;
      state.numberOfPages = defaultValues.numberOfPages;
      state.params.page = defaultValues.params.page;
      state.params.sort = defaultValues.params.sort;
      state.params.order = defaultValues.params.order;
    },
    setParamsPage: (state, { payload }: PayloadAction<number>) => {
      state.params.page = payload;
    },
    resetParamsPage: (state) => {
      state.params.page = defaultValues.params.page;
    },
    setParamsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.params.per_page = payload;
    },
    resetParamsPerPage: (state) => {
      state.params.per_page = defaultValues.params.per_page;
    },
    setParamsSorting: (
      state,
      { payload }: PayloadAction<keyof typeof searchUserSortingOptions>
    ) => {
      const sortParams = getSearchParamsFormSelect(payload);
      state.params.sort = sortParams.sort;
      state.params.order = sortParams.order;
    },
    resetParamsSorting: (state) => {
      state.params.sort = defaultValues.params.sort;
      state.params.order = defaultValues.params.order;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getResultUsers.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(
      getResultUsers.fulfilled,
      (state, { payload }: PayloadAction<ResultUserList>) => {
        state.resultUserList = payload.items;
        state.totalCountUsers = payload.total_count;
        state.numberOfPages = getNumberOfPages(payload.total_count, state.params.per_page);
        state.isLoading = false;
        state.isSuccess = true;
      }
    );
    builder.addCase(getResultUsers.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const selectorSearchUsersSlice = (state: IRootState) => state.searchUsersSlice;
export const {
  clearSearchData,
  setParamsPage,
  resetParamsPage,
  setParamsPerPage,
  resetParamsPerPage,
  setParamsSorting
} = searchUsersSlice.actions;
export default searchUsersSlice.reducer;
