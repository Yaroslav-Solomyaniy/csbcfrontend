import React from 'react';
import './Button.css';

interface Ibutton{
  buttonText:string;
  onClick():void;
}

const Button = ({ buttonText, onClick }:Ibutton):JSX.Element => (
  <button className="button" type="button" onClick={onClick}>{buttonText}</button>
);

export default Button;
