import { FC } from 'react';
import MainContent from '../components/ui/MainContent';
import FormDebounce from '../components/forms/FormDebounce';
import FormPerPage from '../components/forms/FormPerPage';
import FormLanguage from '../components/forms/FormLanguage';

const SettingsPage: FC = () => {
  return (
    <MainContent>
      <div className="settings">
        <FormDebounce />
        <FormPerPage />
        <FormLanguage />
      </div>
    </MainContent>
  );
};

export default SettingsPage;
