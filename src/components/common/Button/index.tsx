import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

interface IButton {
  children: React.ReactChild | React.ReactNode;
  nameClass?: string;
  className?: string;
  onClick: (e: React.FormEvent | undefined) => void;
  size?: string;
  disabled?: boolean;
  isImg?: boolean;
}

const Button = ({
  children,
  onClick,
  nameClass,
  className,
  size,
  disabled,
  isImg,
}: IButton): JSX.Element => (
  <button
    className={clsx(
      isImg ? styles.img
        : styles.default,
      nameClass && styles[nameClass],
      size && styles[size],
    )}
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
  isImg: false,
};

export default Button;
