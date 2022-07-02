import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

interface IButton {
  children: React.ReactChild | React.ReactNode;
  nameClass?: string;
  className?: string;
  onClick: () => void;
  size?: string;
  disabled?: boolean;
}

const Button = ({ children, onClick, nameClass, className, size, disabled }: IButton): JSX.Element => (
  <button
    className={clsx(styles.default, nameClass && styles[nameClass], className, size && styles[size])}
    type="button"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.defaultProps = {
  nameClass: '',
  className: '',
  type: 'button',
  size: '',
  disabled: false,
};

export default Button;
