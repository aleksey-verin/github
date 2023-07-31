import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectorSearchValue } from '../../store/reducers/searchValueSlice';
import {
  getResultUsers,
  selectorSearchUsersSlice,
  setParamsPage,
  setParamsSorting
} from '../../store/reducers/searchUsersSlice';
import SearchItem from './SearchItem';
import { searchUserSortingOptions } from '../../utils/constants';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  selectorSearchSortingValue,
  setSortingValue
} from '../../store/reducers/searchSortingValueSlice';
import { getSearchParamsFormSelect } from '../../utils/helpers';
import { selectorUserAuth } from '../../store/reducers/userAuthSlice';
import { useTranslation } from 'react-i18next';

const ListSearchResults: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { user } = useSelector(selectorUserAuth);
  const { resultUserList, totalCountUsers, isError, params } =
    useSelector(selectorSearchUsersSlice);
  const { search } = useSelector(selectorSearchValue);
  const { searchSortingValue } = useSelector(selectorSearchSortingValue);

  const handleSortingValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortingValue = e.target.value as keyof typeof searchUserSortingOptions;
    const sortingParams = getSearchParamsFormSelect(sortingValue);
    dispatch(setSortingValue(sortingValue));
    dispatch(setParamsSorting(sortingValue));
    dispatch(setParamsPage(1));
    dispatch(
      getResultUsers({
        searchValue: search,
        oAuthToken: user?.oauthAccessToken,
        params: { per_page: params.per_page, page: 1, ...sortingParams }
      })
    );
  };

  if (isError)
    return (
      <section className="user-repositories">
        <div>{t('searchRequestError')}</div>
      </section>
    );

  return (
    <section className="results">
      <div className="results-title">
        <div className="results-title__text">
          {totalCountUsers !== null && (
            <>
              <span>{totalCountUsers}</span>
              {t('searchSummary')}
              <span>{`"${totalCountUsers !== null && search}"`}</span>
            </>
          )}
        </div>
        <div className="results-title__sorting">
          <div>{t('searchSortBy')}</div>
          <select
            name="sorting"
            id="sorting"
            onChange={handleSortingValue}
            value={searchSortingValue}>
            {Object.values(searchUserSortingOptions).map((item) => (
              <option key={item.value} value={item.value}>
                {t(item.name)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="results-list">
        {!!resultUserList?.length &&
          resultUserList?.map(({ id, login, avatar_url }) => (
            <SearchItem key={id} login={login} avatar={avatar_url} />
          ))}
      </div>
    </section>
  );
};

export default ListSearchResults;
