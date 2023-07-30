import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectorSearchValue } from '../../store/reducers/searchValueSlice';
import {
  getResultUsers,
  selectorSearchUsersSlice,
  setParamsSorting
} from '../../store/reducers/searchUsersSlice';
import SearchItem from './SearchItem';
import { searchUserSortingOptions } from '../../utils/constants';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  selectorSearchSortingValue,
  setSortingValue
} from '../../store/reducers/searchSortingValueSlice';

const ListSearchResults: FC = () => {
  const dispatch = useAppDispatch();
  const { resultUserList, totalCountUsers, isError, params } =
    useSelector(selectorSearchUsersSlice);
  const { search } = useSelector(selectorSearchValue);
  const { searchSortingValue } = useSelector(selectorSearchSortingValue);

  const handleSortingValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortingValue = e.target.value as keyof typeof searchUserSortingOptions;
    dispatch(setSortingValue(sortingValue));
    dispatch(setParamsSorting(sortingValue));
  };

  // useEffect(() => {
  //   dispatch(getResultUsers({ searchValue: search, params }));
  // }, [dispatch, params]);

  if (isError)
    return (
      <section className="user-repositories">
        <div>Sorry, error..</div>
      </section>
    );

  return (
    <section className="results">
      <div className="results-title">
        <div className="results-title__text">
          {totalCountUsers !== null && (
            <>
              <span>{totalCountUsers}</span>
              {` users were found for the query `}
              <span>{totalCountUsers !== null && search}</span>
            </>
          )}
        </div>
        <div className="results-title__sorting">
          <div>Sort by:</div>
          <select
            name="sorting"
            id="sorting"
            onChange={handleSortingValue}
            value={searchSortingValue}>
            {Object.values(searchUserSortingOptions).map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
            {/* <option value="bestMatch">Best match</option>
            <option value="reposDesc">Most repositories</option>
            <option value="reposAsc">Fewest repositories</option>
            <option value="followersDesc">Most followers</option>
            <option value="followersAsc">Fewest followers</option>
            <option value="joinedDesc">Most recently joined</option>
            <option value="joinedAsc">Least recently joined</option> */}
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
