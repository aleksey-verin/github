import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import useDebounce from '../../hooks/useDebounce';
import { selectorUserSettingsSlice } from '../../store/reducers/userSettingsSlice';
import {
  clearSearchValue,
  selectorSearchValue,
  setSearchValue
} from '../../store/reducers/searchValueSlice';
import ImgLoader from '../ui/images/ImgLoader';
import { showNoteSameWordForSearch, showNoteSearchRequest } from '../../utils/notifications';
import {
  clearSearchData,
  getResultUsers,
  resetParamsPage,
  selectorSearchUsersSlice
} from '../../store/reducers/searchUsersSlice';
import { clearSortingValue } from '../../store/reducers/searchSortingValueSlice';

const defaultValue = '';

const FormSearch: FC = () => {
  const dispatch = useAppDispatch();

  const { searchDebounce } = useSelector(selectorUserSettingsSlice);
  const { search } = useSelector(selectorSearchValue);
  const { params, isLoading } = useSelector(selectorSearchUsersSlice);

  const [searchInputValue, setSearchInputValue] = useState<string>(search);
  const debouncedValue = useDebounce<string>(searchInputValue, searchDebounce);

  const requestRestApi = async (value: string, per_page: number) => {
    dispatch(resetParamsPage());
    const searchData = dispatch(
      getResultUsers({
        searchValue: value,
        params: { page: 1, per_page: per_page }
      })
    );
    showNoteSearchRequest(searchData, value);
    dispatch(setSearchValue(value));
  };

  useEffect(() => {
    if (!debouncedValue) return;
    const value = debouncedValue.trim();
    if (value === search) return;

    requestRestApi(value, params.per_page);
  }, [debouncedValue]);

  useEffect(() => {
    dispatch(getResultUsers({ searchValue: search, params }));
  }, [dispatch, params]);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userTypedValue = e.target.value;
    setSearchInputValue(userTypedValue);
    if (!userTypedValue) {
      dispatch(clearSearchValue());
      dispatch(clearSearchData());
    }
  };

  const handleSubmitSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = searchInputValue.trim();
    if (value === search) {
      return showNoteSameWordForSearch();
    }
    requestRestApi(value, params.per_page);
  };

  const handleReset = () => {
    setSearchInputValue(defaultValue);
    dispatch(clearSearchValue());
    dispatch(clearSearchData());
    dispatch(clearSortingValue());
  };

  return (
    <form onSubmit={handleSubmitSearch} className="search">
      <label htmlFor="search">Search through all repositories on github:</label>
      <div>
        <input
          value={searchInputValue}
          id="search"
          type="text"
          autoComplete="false"
          placeholder="Enter request.."
          onChange={handleInputValue}
        />
        <button className="search-button__send">
          <div>Search users</div>
          <div>{isLoading && <ImgLoader />}</div>
        </button>
        <button onClick={handleReset} type="reset">
          Clear search
        </button>
      </div>
    </form>
  );
};

export default FormSearch;
