import React from 'react';

interface Ibutton {
  children: React.ReactNode | React.ReactChild;
  className?: string;

  onClick(): void;
}

const Button = ({ children, onClick, className }: Ibutton): JSX.Element => (
  <button className={className} type="button" onClick={onClick}>{children}</button>
);

Button.defaultProps = {
  className: '',
};

export default Button;
