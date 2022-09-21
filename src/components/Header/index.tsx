import React, { useState } from 'react';
import clsx from 'clsx';
import logo from '../../images/logo.svg';
import styles from './index.module.scss';
import buttonNav from '../../images/buttonNav.svg';
import { useAuthContext } from '../../context/useAuthContext';
import useOnClickOutside from '../../hooks/UseClickOutsideElement';
import { useDeviceContext } from '../../context/TypeDevice';
import Menu from './Menu/Menu';
import DefaultMenuLink from '../Navigation/MenuNavigation/DefaultMenuLink';
import Navigation from '../Navigation';

interface IHeader {
  setOpen: () => void;
  isRenderButtonMenu?: boolean;
}

const Header = ({ setOpen, isRenderButtonMenu = true }: IHeader): JSX.Element => {
  const [navOpen, setNavOpen] = useState(true);
  const [dropMenuOpen, setDropMenuOpen] = useState(false);
  const { logout, user } = useAuthContext();
  const { isDesktop, isPhone, isTablet } = useDeviceContext();

  const btnRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  useOnClickOutside(btnRef, () => setDropMenuOpen(false));

  return (
    <header className={clsx(isDesktop && styles.header, (isTablet || isPhone) && styles.header_sticky)}>
      <div className={styles.header__item}>
        {isDesktop && (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {isRenderButtonMenu && (user?.role === 'admin' || user?.role === 'student') && (
            <button
              className={clsx(styles.navigation__button, navOpen && styles.navigation__button__revert)}
              type="button"
              onClick={() => {
                setOpen();
                setNavOpen(!navOpen);
              }}
            >
              <img src={buttonNav} alt="menu" />
            </button>
            )}
          </>
        )}
        <img className={styles.logo} src={logo} alt="logo" />
      </div>
      {user && (
        <button
          ref={btnRef}
          type="button"
          className={styles.header__item}
          onClick={() => {
            setDropMenuOpen(!dropMenuOpen);
          }}
        >
          <span className={styles.user}>
            {`${user?.lastName} ${user?.firstName?.[0].toUpperCase()}. ${user?.patronymic?.[0].toUpperCase()}.`}
          </span>
          <div className={styles.avatar}>
            {`${user?.firstName[0].toUpperCase()}${user?.patronymic[0].toUpperCase()}`}
          </div>
          <Menu stateDropMenu={dropMenuOpen}>
            {(isPhone || isTablet) && (user.role === 'admin' || user.role === 'student')
              && (<Navigation role={user.role} />)}
            <DefaultMenuLink logout={logout} role={user.role} />
          </Menu>
        </button>
      )}
    </header>
  );
};

Header.defaultProps = {
  isRenderButtonMenu: true,
};
export default Header;
