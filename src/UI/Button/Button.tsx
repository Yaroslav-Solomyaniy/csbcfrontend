import React from 'react';
import styles from './button.module.scss';

interface Ibutton{
  buttonText:string;
  onClick():void;
}

const Button = ({ buttonText, onClick }:Ibutton):JSX.Element => (
  <button className={styles.button} type="button" onClick={onClick}>{buttonText}</button>
);

export default Button;
