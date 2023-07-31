import { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectorUserSlice } from '../../store/reducers/userReposSlice';
import MainContent from '../../components/ui/MainContent';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getLanguageForRepo } from '../../utils/api-helpers';
import { getViewedLanguages } from '../../utils/helpers';
import { useTranslation } from 'react-i18next';

const SingleRepoPage: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { id } = useParams();
  const { userRepos, isLoading, isError, isSuccess } = useSelector(selectorUserSlice);

  const currentRepo = useMemo(
    () => userRepos.find((item) => item.id === Number(id)),
    [id, userRepos]
  );

  const [viewedLanguage, setViewedLanguage] = useState('');
  const [loadingLanguagesData, setLoadingLanguagesData] = useState(false);

  const getLanguageRequest = async (languageUrl: string) => {
    setLoadingLanguagesData(true);
    const data = await getLanguageForRepo(languageUrl);
    const lang = getViewedLanguages(data);
    setLoadingLanguagesData(false);
    setViewedLanguage(lang);
  };

  useEffect(() => {
    if (!currentRepo) return;
    if (currentRepo.languageMain === 'There is no information') {
      setViewedLanguage(currentRepo.languageMain);
    } else {
      if (typeof currentRepo.languages === 'string') {
        getLanguageRequest(currentRepo.languages);
      }
    }
  }, [currentRepo, dispatch]);

  const viewedDate = dayjs(currentRepo?.pushedAt).format('DD.MM.YYYY HH:mm'); // '25/01/2019'

  return (
    <MainContent>
      {isLoading && <div>{t('loading')}</div>}
      {isError && <div>{t('sorryError')}</div>}
      {(isSuccess || currentRepo) && (
        <>
          <div className="single-title">
            {t('repoTitle')}
            <span>{currentRepo?.name}</span>
          </div>
          <div className="single-repo">
            <div className="single-repo__item">
              <div> {t('repoPhoto')}</div>
              <div className="single-repo__item-photo">
                <img src={currentRepo?.owner.avatar_url} alt="" />
              </div>
            </div>
            <div className="single-repo__item">
              <div> {t('repoName')}</div>
              <div>{currentRepo?.name}</div>
            </div>
            <div className="single-repo__item">
              <div>{t('repoStars')}</div>
              <div>{currentRepo?.stargazerCount}</div>
            </div>
            <div className="single-repo__item">
              <div> {t('repoLastCommit')}</div>
              <div>{viewedDate}</div>
            </div>
            <div className="single-repo__item">
              <div> {t('repoAuthor')}</div>
              <div>{currentRepo?.owner.login}</div>
            </div>
            <div className="single-repo__item">
              <div> {t('repoLink')}</div>
              <div>
                <a href={currentRepo?.owner.html_url} target="_blank">
                  {currentRepo?.owner.html_url}
                </a>
              </div>
            </div>
            <div className="single-repo__item">
              <div> {t('repoLang')}</div>
              <div>{loadingLanguagesData ? 'Loading languages..' : viewedLanguage}</div>
            </div>
            <div className="single-repo__item">
              <div> {t('repoDescription')}</div>
              <div>{currentRepo?.description ? currentRepo?.description : t('repoNoDesc')}</div>
            </div>
          </div>
        </>
      )}
    </MainContent>
  );
};

export default SingleRepoPage;
