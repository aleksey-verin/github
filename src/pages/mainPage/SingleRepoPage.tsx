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

const SingleRepoPage: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

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
      {isLoading && <div>Loading..</div>}
      {isError && <div>Sorry, there is Error</div>}
      {(isSuccess || singleUserInfo) && (
        <>
          <div className="single-title">
            Details info about user with login <span>{singleUserInfo?.login}</span>
          </div>
          <div className="single-repo">
            <div className="single-repo__item">
              <div>Author photo:</div>
              <div className="single-repo__item-photo">
                <img src={singleUserInfo?.avatar_url} alt="avatar" />
              </div>
            </div>
            <div className="single-repo__item">
              <div>Nickname:</div>
              <div>{singleUserInfo?.login}</div>
            </div>
            <div className="single-repo__item">
              <div>Name:</div>
              <div>{singleUserInfo?.name ? singleUserInfo?.name : 'There is no public name'}</div>
            </div>
            <div className="single-repo__item">
              <div>Public Repos:</div>
              <div>{singleUserInfo?.public_repos}</div>
            </div>
            <div className="single-repo__item">
              <div>Public Gists:</div>
              <div>{singleUserInfo?.public_gists}</div>
            </div>
            <div className="single-repo__item">
              <div>Created:</div>
              <div>{createdAt}</div>
            </div>
            <div className="single-repo__item">
              <div>Last update:</div>
              <div>{updatedAt}</div>
            </div>
            <div className="single-repo__item">
              <div>Link:</div>
              <div>
                <a href={singleUserInfo?.html_url} target="_blank">
                  {singleUserInfo?.html_url}
                </a>
              </div>
            </div>
            <div className="single-repo__item">
              <div>Location:</div>
              <div>{singleUserInfo?.location ? singleUserInfo?.location : 'There is no info'}</div>
            </div>
          </div>
        </>
      )}
    </MainContent>
  );
};

export default SingleRepoPage;
