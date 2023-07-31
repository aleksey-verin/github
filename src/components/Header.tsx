import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectorUserAuth, userAuth, userSign } from '../store/reducers/userAuthSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import ImgBurger from './ui/images/ImgBurger';
import { clearLocalStorageData, storage } from '../utils/storage';
import { toast } from 'react-hot-toast';
import { clearSearchValue } from '../store/reducers/searchValueSlice';
import { clearSearchData } from '../store/reducers/searchUsersSlice';
import { useTranslation } from 'react-i18next';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isAuth, user } = useSelector(selectorUserAuth);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const handleLogOut = async () => {
    await dispatch(userAuth(userSign.out));
    toast(`${t('buy')}, ${user?.displayName}`, {
      duration: 3000,
      icon: '👋'
    });
    clearLocalStorageData(storage);
    dispatch(clearSearchValue());
    dispatch(clearSearchData());
  };

  const closeMobileMenu = () => {
    setMobileMenuIsOpen(false);
  };

  return (
    <header>
      <button onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)} className="header-burger">
        <ImgBurger />
      </button>
      <div className="header-logo">
        <Link to={ROUTES.searchPage}>{t('Logo')}</Link>
      </div>
      <nav className="header-nav__desktop">
        <NavLink to={ROUTES.searchPage}>{t('Search')}</NavLink>
        <NavLink to={ROUTES.settingsPage}>{t('Settings')}</NavLink>
        <NavLink to={ROUTES.aboutPage}>{t('About')}</NavLink>
      </nav>
      <div className="header-user">
        {isAuth ? (
          <>
            <div>{user?.displayName}</div>
            <button onClick={handleLogOut}>{t('LogOut')}</button>
          </>
        ) : (
          <Link to={ROUTES.loginPage}>
            <button>{t('LogIn')}</button>
          </Link>
        )}
      </div>
      {mobileMenuIsOpen && (
        <nav className="header-nav__mobile">
          <NavLink onClick={closeMobileMenu} to={ROUTES.searchPage}>
            Search
          </NavLink>
          <NavLink onClick={closeMobileMenu} to={ROUTES.settingsPage}>
            Settings
          </NavLink>
          <NavLink onClick={closeMobileMenu} to={ROUTES.aboutPage}>
            About
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Header;
