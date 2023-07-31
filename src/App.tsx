import Wrapper from './components/ui/Wrapper';
import AppRouter from './components/AppRouter';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useEffect } from 'react';
import { getUserRepos } from './store/reducers/userReposSlice';
import { useSelector } from 'react-redux';
import { selectorUserAuth } from './store/reducers/userAuthSlice';
import { toast } from 'react-hot-toast';
import './App.scss';
import { useTranslation } from 'react-i18next';

function App() {
  const dispatch = useAppDispatch();
  const { user } = useSelector(selectorUserAuth);
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      dispatch(getUserRepos(user.screenName));
      toast.success(`${t('welcome')}${user.displayName}!`);
    }
  }, [dispatch, user]);

  return (
    <Wrapper>
      <AppRouter />
    </Wrapper>
  );
}

export default App;
