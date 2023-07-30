import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, IRootState } from '../store';
import { SingleUser } from '../types/usersType';

interface initialStateTypes {
  singleUserInfo: SingleUser | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState = {
  singleUserInfo: null,
  isLoading: false,
  isSuccess: false,
  isError: false
};

export const getSingleUserInfo = createAsyncThunk<
  SingleUser,
  string,
  {
    dispatch: AppDispatch;
    state: IRootState;
  }
>('getSingleUserInfo', async (userName, thunkAPI) => {
  try {
    if (!userName) return;
    const url = `https://api.github.com/users/${userName}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data?.message);
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const singleUserSlice = createSlice({
  name: 'singleUserSlice',
  initialState: initialState as initialStateTypes,
  reducers: {
    clearSingleUserInfo: (state) => {
      state.singleUserInfo = initialState.singleUserInfo;
      state.isSuccess = initialState.isSuccess;
      state.isError = initialState.isError;
    }
    // setParamsPage: (state, { payload }: PayloadAction<number>) => {
    //   state.params.page = payload;
    // },
    // resetParamsPage: (state) => {
    //   state.params.page = defaultValues.params.page;
    // },
    // setParamsPerPage: (state, { payload }: PayloadAction<number>) => {
    //   state.params.per_page = payload;
    // },
    // resetParamsPerPage: (state) => {
    //   state.params.per_page = defaultValues.params.per_page;
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(getSingleUserInfo.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(
      getSingleUserInfo.fulfilled,
      (state, { payload }: PayloadAction<SingleUser>) => {
        state.singleUserInfo = payload;
        state.isLoading = false;
        state.isSuccess = true;
      }
    );
    builder.addCase(getSingleUserInfo.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const selectorSingleUsersSlice = (state: IRootState) => state.singleUserSlice;
export const { clearSingleUserInfo } = singleUserSlice.actions;
export default singleUserSlice.reducer;
