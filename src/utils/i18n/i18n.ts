import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { store } from '../../store/store';
import { resources } from './localization';

i18n.use(initReactI18next).init({
  resources: resources,
  lng: store.getState().userSettingsSlice.language,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
