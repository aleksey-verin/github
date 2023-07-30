import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

interface SearchItemProps {
  login: string;
  avatar: string;
}

const SearchItem: FC<SearchItemProps> = ({ login, avatar }) => {
  return (
    <Link to={`${ROUTES.searchPage}/${login}`}>
      <div className="results-item">
        <div className="results-item__avatar">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="results-item__title">{login}</div>
      </div>
    </Link>
  );
};

export default SearchItem;
