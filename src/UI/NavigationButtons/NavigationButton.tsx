import React from 'react';
import './navigationButton.css';
import buttonNav from '../../images/buttonNav.svg';

const NavigationButton = ():JSX.Element => (
  <button className="navigationButton" type="button">
    <img src={buttonNav} alt="menu" />
  </button>
);

export default NavigationButton;
