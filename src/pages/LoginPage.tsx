import { FC } from 'react';
import MainContent from '../components/ui/MainContent';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { selectorUserAuth, userAuth, userSign } from '../store/reducers/userAuthSlice';
import { showNoteLogin } from '../utils/notifications';
import { useTranslation } from 'react-i18next';
import ImgGithub from '../components/ui/images/ImgGithub';

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector(selectorUserAuth);
  const { t } = useTranslation();

  const handleGithubLogin = () => {
    const getLogin = dispatch(userAuth(userSign.in));
    showNoteLogin(getLogin);
  };

  return (
    <MainContent>
      {isLoading ? (
        <div>{t('loading')}</div>
      ) : (
        <>
          <div>{t('loginText')}</div>
          <button className="login-btn" onClick={handleGithubLogin}>
            <ImgGithub />
            {t('login')}
          </button>
        </>
      )}
    </MainContent>
  );
};

export default LoginPage;
