import React, { useEffect } from 'react';

export const useOnClickOutside = (
  ref:React.MutableRefObject<HTMLButtonElement | HTMLDivElement>,
  handleClick:React.Dispatch<boolean>,
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClick(event);
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handleClick]);
};

export default useOnClickOutside;
