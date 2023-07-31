import { FC } from 'react';
import { RepositorySearchCommonItem, UserAuth } from '../../store/types/repoType';
import RepoItem from './RepoItem';
import { useTranslation } from 'react-i18next';

interface ListUserRepoProps {
  user: UserAuth | null;
  userRepos: RepositorySearchCommonItem[];
  isLoading: boolean;
  isError: boolean;
}

const ListUserRepo: FC<ListUserRepoProps> = ({ user, userRepos, isLoading, isError }) => {
  const { t } = useTranslation();

  return (
    <section className="user-repositories">
      <div className="user-repositories__title">{user ? t('repoNotEmpty') : t('repoEmpty')}</div>
      {isLoading && <div>{t('loading')}</div>}
      {isError && <div>{t('sorryError')}</div>}
      <div className="user-repositories__list">
        {user &&
          userRepos.map(
            ({ id, name, owner: { login }, stargazerCount, languageMain, pushedAt }) => (
              <RepoItem
                key={id}
                path={id}
                repo={name}
                author={login}
                score={stargazerCount}
                language={languageMain}
                pushed_at={pushedAt}
              />
            )
          )}
      </div>
    </section>
  );
};

export default ListUserRepo;
