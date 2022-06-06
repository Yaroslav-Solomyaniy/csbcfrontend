import React, { useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation/Navigation';

const Layout = ():JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const setOpen = ():void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Header setOpen={setOpen} isAuth={false} />
      <Navigation isOpen={isOpen} />
    </>
  );
};

export default Layout;
