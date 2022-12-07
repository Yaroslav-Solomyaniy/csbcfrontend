import React, { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.svg';
import styles from './index.module.scss';
import buttonNav from '../../../assets/images/buttonNav.svg';
import { AuthContext } from '../../../context/All/AuthContext';
import useOnClickOutside from '../../../hooks/hooks/useClickOutsideElement';
import { DeviceContext } from '../../../context/All/DeviceType';
import Menu from './Menu/Menu';
import DefaultMenuLink from '../../navigation/menu/defaultLink';
import Navigation from '../../navigation';
import Button from '../Button';

interface IHeader {
  isOpen: boolean;
  setOpen: () => void;
  isRenderButtonMenu?: boolean;
}

const Header = ({ setOpen, isOpen = false, isRenderButtonMenu = true }: IHeader): JSX.Element => {
  const [dropMenuOpen, setDropMenuOpen] = useState(false);
  const { logout, user } = AuthContext();
  const { isDesktop, isPhone, isTablet } = DeviceContext();

  const btnRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  useOnClickOutside(btnRef, () => setDropMenuOpen(false));

  return (
    <header className={clsx(isDesktop && styles.header, (isTablet || isPhone) && styles.header_sticky)}>
      <div className={styles.header__item}>
        {isDesktop && (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {isRenderButtonMenu && (user?.role === 'admin' || user?.role === 'student') && (
              <Button
                className={clsx(styles.navigation__button, isOpen && styles.navigation__button__revert)}
                isImg
                onClick={() => {
                  setOpen();
                }}
              >
                <img src={buttonNav} alt="menu" />
              </Button>
            )}
          </>
        )}
        <Link to="/">
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>
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
