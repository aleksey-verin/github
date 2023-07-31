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
import { UsersSearchParams } from '../../store/types/usersType';
import { selectorUserAuth } from '../../store/reducers/userAuthSlice';
import { useTranslation } from 'react-i18next';

const defaultValue = '';

const FormSearch: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { searchDebounce } = useSelector(selectorUserSettingsSlice);
  const { user } = useSelector(selectorUserAuth);
  const { search } = useSelector(selectorSearchValue);
  const { params, isLoading, isError } = useSelector(selectorSearchUsersSlice);

  const [searchInputValue, setSearchInputValue] = useState<string>(search);
  const debouncedValue = useDebounce<string>(searchInputValue, searchDebounce);

  const requestRestApi = async (
    value: string,
    token: string | undefined,
    params: UsersSearchParams
  ) => {
    dispatch(resetParamsPage());
    const searchData = dispatch(
      getResultUsers({
        searchValue: value,
        oAuthToken: token,
        params: { ...params, page: 1 }
      })
    );
    showNoteSearchRequest(searchData, value);
    dispatch(setSearchValue(value));
  };

  useEffect(() => {
    if (!debouncedValue) return;
    const value = debouncedValue.trim();
    if (value === search) return;

    requestRestApi(value, user?.oauthAccessToken, params);
  }, [debouncedValue]);

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
    if (value === search && !isError) {
      return showNoteSameWordForSearch();
    }
    requestRestApi(value, user?.oauthAccessToken, params);
  };

  const handleReset = () => {
    setSearchInputValue(defaultValue);
    dispatch(clearSearchValue());
    dispatch(clearSearchData());
    dispatch(clearSortingValue());
  };

  return (
    <form onSubmit={handleSubmitSearch} className="search">
      <label htmlFor="search">{t('searchTitle')}</label>
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
          <div>{t('btnSearch')}</div>
          <div>{isLoading && <ImgLoader />}</div>
        </button>
        <button onClick={handleReset} type="reset">
          {t('btnClear')}
        </button>
      </div>
    </form>
  );
};

export default FormSearch;
