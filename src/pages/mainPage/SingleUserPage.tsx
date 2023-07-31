import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainContent from '../../components/ui/MainContent';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  clearSingleUserInfo,
  getSingleUserInfo,
  selectorSingleUsersSlice
} from '../../store/reducers/singleUserSlice';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const SingleUserPage: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (!id) return;
    dispatch(getSingleUserInfo(id));
    return () => {
      dispatch(clearSingleUserInfo());
    };
  }, [dispatch, id]);

  const { singleUserInfo, isLoading, isError, isSuccess } = useSelector(selectorSingleUsersSlice);

  const createdAt = dayjs(singleUserInfo?.created_at).format('DD.MM.YYYY'); // '25/01/2019'
  const updatedAt = dayjs(singleUserInfo?.updated_at).format('DD.MM.YYYY HH:mm'); // '25/01/2019'

  return (
    <MainContent>
      {isLoading && <div>{t('loading')}</div>}
      {isError && <div>{t('sorryError')}</div>}
      {(isSuccess || singleUserInfo) && (
        <>
          <div className="single-title">
            {t('userTitle')}
            <span>{singleUserInfo?.login}</span>
          </div>
          <div className="single-repo">
            <div className="single-repo__item">
              <div>{t('userPhoto')}</div>
              <div className="single-repo__item-photo">
                <img src={singleUserInfo?.avatar_url} alt="avatar" />
              </div>
            </div>
            <div className="single-repo__item">
              <div>{t('userNickname')}</div>
              <div>{singleUserInfo?.login}</div>
            </div>
            <div className="single-repo__item">
              <div>{t('userName')}</div>
              <div>{singleUserInfo?.name ? singleUserInfo?.name : 'There is no public name'}</div>
            </div>
            <div className="single-repo__item">
              <div>{t('userPublicRepos')}</div>
              <div>{singleUserInfo?.public_repos}</div>
            </div>
            <div className="single-repo__item">
              <div>{t('userPublicGists')}</div>
              <div>{singleUserInfo?.public_gists}</div>
            </div>
            <div className="single-repo__item">
              <div>{t('userCreated')}</div>
              <div>{createdAt}</div>
            </div>
            <div className="single-repo__item">
              <div>{t('userLastUpdate')}</div>
              <div>{updatedAt}</div>
            </div>
            <div className="single-repo__item">
              <div>{t('userLink')}</div>
              <div>
                <a href={singleUserInfo?.html_url} target="_blank">
                  {singleUserInfo?.html_url}
                </a>
              </div>
            </div>
            <div className="single-repo__item">
              <div>{t('userLocation')}</div>
              <div>{singleUserInfo?.location ? singleUserInfo?.location : t('userNoInfo')}</div>
            </div>
          </div>
        </>
      )}
    </MainContent>
  );
};

export default SingleUserPage;
