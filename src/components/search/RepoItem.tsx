import { FC } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { getShortString } from '../../utils/helpers';
import { useTranslation } from 'react-i18next';

interface RepoItemProps {
  path: number | string;
  repo: string;
  author: string;
  score: number;
  language: string | undefined;
  pushed_at: string;
}

const RepoItem: FC<RepoItemProps> = ({ path, repo, author, score, language, pushed_at }) => {
  const { t } = useTranslation();
  const viewedDate = dayjs(pushed_at).format('DD.MM.YYYY HH:mm'); // '25/01/2019'
  const viewedRepoName = getShortString(repo, 25);
  return (
    <div className="repo-item">
      <div className="repo-item__title">
        <div>{viewedRepoName}</div>
        {/* <div>
        </div> */}
      </div>
      <div className="repo-item__content">
        <p>{`${t('repoAuthor')} ${author}`}</p>
        <p>{`${t('repoLastCommit')} ${viewedDate}`}</p>
        <p>{`${t('repoMainLang')} ${language}`}</p>
        <p>{`${t('repoStars')} ${score}`}</p>
      </div>
      <div className="repo-item__link">
        <Link to={`${ROUTES.singleRepoPage}/${path}`}>{t('repoMore')}</Link>
      </div>
    </div>
  );
};

export default RepoItem;
