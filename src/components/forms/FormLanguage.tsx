import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/useAppDispatch';

import {
  langType,
  selectorUserSettingsSlice,
  setLanguage
} from '../../store/reducers/userSettingsSlice';
import { toast } from 'react-hot-toast';
import { languageOptions } from '../../utils/constants';
import { useTranslation } from 'react-i18next';

const FormLanguage: FC = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const { language } = useSelector(selectorUserSettingsSlice);

  const [selectLanguageDisabled, setSelectLanguageDisabled] = useState(true);
  const [selectLanguageValue, setSelectLanguageValue] = useState<langType>(language);
  const selectLanguageRef = useRef<HTMLSelectElement>(null);

  const handleEditLanguage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectLanguageDisabled(false);
  };

  const handleSaveRequestType = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectLanguageDisabled(true);
    if (language === selectLanguageValue) return;
    dispatch(setLanguage(selectLanguageValue));
    i18n.changeLanguage(selectLanguageValue);
    toast.success(t('Successfully saved'));
  };

  useEffect(() => {
    if (!selectLanguageDisabled && selectLanguageRef.current) {
      selectLanguageRef.current.focus();
    }
  }, [selectLanguageDisabled]);

  return (
    <form onSubmit={handleSaveRequestType}>
      <label htmlFor="request">{t('settingsLanguage')}</label>
      <div>
        <select
          id="language"
          ref={selectLanguageRef}
          disabled={selectLanguageDisabled}
          placeholder="language"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSelectLanguageValue(e.target.value as langType)
          }
          value={selectLanguageValue}>
          {Object.values(languageOptions).map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
        {selectLanguageDisabled ? (
          <button type="button" onClick={handleEditLanguage}>
            {t('btnEdit')}
          </button>
        ) : (
          <button type="submit">{t('btnSave')}</button>
        )}
      </div>
    </form>
  );
};

export default FormLanguage;
