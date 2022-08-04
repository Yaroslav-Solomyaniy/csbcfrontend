import React, { CSSProperties } from 'react';

/* eslint-disable max-len */

interface Svg {
  children: React.ReactNode;
  className?: string;
  viewBox?: string;
  style?: CSSProperties;
}

export const Svg = ({ children, className, viewBox, ...props }: Svg): JSX.Element => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    height="1em"
    width="1em"
    viewBox={viewBox}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {children}
  </svg>
);

Svg.defaultProps = {
  className: '',
  viewBox: '0 0 16 16',
  style: {},
};

export const Group = ({ ...props }: Record<any, any>): JSX.Element => (
  <Svg viewBox="0 0 16 16" {...props}>
    <path
      d="M10.6667 7.33325C11.7734 7.33325 12.66 6.43992 12.66 5.33325C12.66 4.22659 11.7734 3.33325 10.6667 3.33325C9.56002 3.33325 8.66669 4.22659 8.66669 5.33325C8.66669 6.43992 9.56002 7.33325 10.6667 7.33325ZM5.33335 7.33325C6.44002 7.33325 7.32669 6.43992 7.32669 5.33325C7.32669 4.22659 6.44002 3.33325 5.33335 3.33325C4.22669 3.33325 3.33335 4.22659 3.33335 5.33325C3.33335 6.43992 4.22669 7.33325 5.33335 7.33325ZM5.33335 8.66659C3.78002 8.66659 0.666687 9.44659 0.666687 10.9999V12.6666H10V10.9999C10 9.44659 6.88669 8.66659 5.33335 8.66659ZM10.6667 8.66659C10.4734 8.66659 10.2534 8.67992 10.02 8.69992C10.7934 9.25992 11.3334 10.0133 11.3334 10.9999V12.6666H15.3334V10.9999C15.3334 9.44659 12.22 8.66659 10.6667 8.66659Z"
      fill="currentColor"
    />
  </Svg>
);