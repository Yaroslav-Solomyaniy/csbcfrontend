import React from 'react';
import styles from './index.module.scss';

interface Ibutton{
  children:React.ReactNode | React.ReactChild;
  onClick():void;
  className?:string;
}

const Button = ({ children, onClick, className }:Ibutton):JSX.Element => (
  <button className={className} type="button" onClick={onClick}>{children}</button>
);

Button.defaultProps = {
  className: { },
};

export default Button;
