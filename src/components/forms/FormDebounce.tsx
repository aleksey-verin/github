import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  selectorUserSettingsSlice,
  setSearchDebounce
} from '../../store/reducers/userSettingsSlice';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const FormDebounce: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { searchDebounce } = useSelector(selectorUserSettingsSlice);

  const [debounceInputDisabled, setDebounceInputDisabled] = useState(true);
  const [debounceInputValue, setDebounceInputValue] = useState(searchDebounce);
  const inputDebounce = useRef<HTMLInputElement>(null);

  const handleEditDebounce = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDebounceInputDisabled(false);
  };

  const handleSaveDebounce = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDebounceInputDisabled(true);
    if (debounceInputValue === searchDebounce) return;
    dispatch(setSearchDebounce(debounceInputValue));
    toast.success(t('Successfully saved'));
  };

  useEffect(() => {
    if (!debounceInputDisabled && inputDebounce.current) {
      inputDebounce.current.focus();
    }
  }, [debounceInputDisabled]);

  return (
    <form onSubmit={handleSaveDebounce}>
      <label htmlFor="debounce">{t('settingsDebounce')}</label>
      <div>
        <input
          id="debounce"
          ref={inputDebounce}
          disabled={debounceInputDisabled}
          type="number"
          placeholder="value for debounce"
          step={100}
          min={300}
          max={10000}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDebounceInputValue(Number(e.target.value))
          }
          value={debounceInputValue}
        />
        {debounceInputDisabled ? (
          <button type="button" onClick={handleEditDebounce}>
            {t('btnEdit')}
          </button>
        ) : (
          <button type="submit">{t('btnSave')}</button>
        )}
      </div>
    </form>
  );
};

export default FormDebounce;
