import { FC } from 'react';
import MainContent from '../components/ui/MainContent';
import { useSelector } from 'react-redux';
import { selectorUserSlice } from '../store/reducers/userReposSlice';
import { selectorUserAuth } from '../store/reducers/userAuthSlice';
import FormSearch from '../components/search/FormSearch';
import ListUserRepo from '../components/search/ListUserRepo';
import ListSearchResults from '../components/search/ListSearchResults';
import Pagination from '../components/search/Pagination';
import { selectorSearchValue } from '../store/reducers/searchValueSlice';

const MainPage: FC = () => {
  const { userRepos, isLoading, isError } = useSelector(selectorUserSlice);
  const { user } = useSelector(selectorUserAuth);
  const { search } = useSelector(selectorSearchValue);

  return (
    <MainContent>
      <FormSearch />
      {!search ? (
        <ListUserRepo user={user} userRepos={userRepos} isLoading={isLoading} isError={isError} />
      ) : (
        <>
          <ListSearchResults />
          <Pagination />
        </>
      )}
    </MainContent>
  );
};

export default MainPage;
