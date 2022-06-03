import React, { useEffect } from 'react';

import './style/App.css';
import { useLogin } from './hooks/auth';
import Layout from './loyout/Layout';

const App = ():JSX.Element => {
  const { postLogin } = useLogin();

  useEffect(() => {
    postLogin({ email: 'root@gmail.com', password: 'root@gmail.com' });
  }, []);

  return (
    <Layout />
  );
};

export default App;
