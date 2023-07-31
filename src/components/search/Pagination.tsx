import { FC, useMemo, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getPaginationArray } from '../../utils/helpers';
import { useSelector } from 'react-redux';
import { selectorSearchValue } from '../../store/reducers/searchValueSlice';
import ImgLoader from '../ui/images/ImgLoader';
import {
  getResultUsers,
  selectorSearchUsersSlice,
  setParamsPage
} from '../../store/reducers/searchUsersSlice';

const Pagination: FC = () => {
  const dispatch = useAppDispatch();
  const { search } = useSelector(selectorSearchValue);
  const {
    totalCountUsers,
    params,
    numberOfPages,
    isLoading: searchIsLoading,
    isError
  } = useSelector(selectorSearchUsersSlice);
  const [loaderNextButton, setLoaderNextButton] = useState(false);
  const [loaderBackButton, setLoaderBackButton] = useState(false);

  const loadAnotherPage = async (page: number) => {
    if (searchIsLoading) return;
    await dispatch(
      getResultUsers({
        searchValue: search,
        params: { ...params, page: page }
      })
    );
    if (!isError) {
      dispatch(setParamsPage(page));
    }
  };

  const handleNavigationNext = async (page: number) => {
    setLoaderNextButton(true);
    await loadAnotherPage(page);
    setLoaderNextButton(false);
  };
  const handleNavigationBack = async (page: number) => {
    setLoaderBackButton(true);
    await loadAnotherPage(page);
    setLoaderBackButton(false);
  };

  const numbersForPagination = useMemo(
    () => getPaginationArray(numberOfPages, params.page),
    [numberOfPages, params]
  );

  if (!totalCountUsers) return null;

  return (
    <div className="pagination-rest">
      <button
        className="pagination-rest__back"
        disabled={params.page === 1}
        onClick={() => handleNavigationBack(params.page - 1)}>
        <div>{loaderBackButton && <ImgLoader />}</div>
        <div>Back</div>
      </button>
      <div className="pagination-rest__numbers">
        {numbersForPagination.map((item) => (
          <button
            onClick={() => loadAnotherPage(item)}
            className={item === params.page ? 'active' : ''}
            disabled={item === params.page}
            key={item}>
            {item}
          </button>
        ))}
      </div>
      <button
        className="pagination-rest__next"
        onClick={() => handleNavigationNext(params.page + 1)}
        disabled={params.page === numberOfPages}>
        <div>Next</div>
        <div>{loaderNextButton && <ImgLoader />}</div>
      </button>
    </div>
  );
};

export default Pagination;
