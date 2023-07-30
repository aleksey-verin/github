import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { selectorSearchValue } from '../../store/reducers/searchValueSlice';
import {
  getResultUsers,
  resetParamsPage,
  selectorSearchUsersSlice,
  setParamsPerPage
} from '../../store/reducers/searchUsersSlice';

const FormPerPage: FC = () => {
  const dispatch = useAppDispatch();
  const {
    params: { per_page }
  } = useSelector(selectorSearchUsersSlice);
  const { search } = useSelector(selectorSearchValue);

  const [perPageInputDisabled, setPerPageInputDisabled] = useState(true);

  const [perPageInputValue, setPerPageInputValue] = useState(0);
  const inputDebounce = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPerPageInputValue(per_page);
  }, [per_page]);

  const handleEditDebounce = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPerPageInputDisabled(false);
  };

  const handleSavePerPage = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPerPageInputDisabled(true);

    if (perPageInputValue === per_page) return;
    dispatch(setParamsPerPage(perPageInputValue));
    if (search) {
      dispatch(resetParamsPage());
      dispatch(
        getResultUsers({
          searchValue: search,
          params: { page: 1, per_page: perPageInputValue }
        })
      );
    }
  };

  useEffect(() => {
    if (!perPageInputDisabled && inputDebounce.current) {
      inputDebounce.current.focus();
    }
  }, [perPageInputDisabled]);

  return (
    <form onSubmit={handleSavePerPage}>
      <label htmlFor="per_page">Number of items on the search page (pcs.)</label>
      <div>
        <input
          id="per_page"
          ref={inputDebounce}
          disabled={perPageInputDisabled}
          type="number"
          placeholder="value for per page parameter"
          step={12}
          min={12}
          max={48}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPerPageInputValue(Number(e.target.value))
          }
          value={perPageInputValue}
        />
        {perPageInputDisabled ? (
          <button type="button" onClick={handleEditDebounce}>
            Edit
          </button>
        ) : (
          <button type="submit">Save</button>
        )}
      </div>
    </form>
  );
};

export default FormPerPage;
