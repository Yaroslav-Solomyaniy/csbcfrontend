import React from 'react';
import NavigationButton from '../UI/NavigationButtons/NavigationButton';
import '../style/header.css';

const Header = ():JSX.Element => (
  <header className="header">
    <div>
      <NavigationButton />
      <img className="logo" src="../images/logo.png" alt="logo" />
    </div>
    <div>
      <span className="user">name</span>
      <button className="avatarka" type="button">NV</button>
    </div>
  </header>
);

export default Header;
