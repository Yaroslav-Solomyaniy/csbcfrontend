import React, { useEffect } from 'react';

import './style/App.css';
import { useLogin } from './hooks/auth';
import Layout from './loyout/Layout';

function App() {
  const { postLogin } = useLogin();

  useEffect(() => {
    postLogin({ email: 'root@gmail.com', password: 'root@gmail.com' });
  }, []);

  return (
    <Layout />
  );
}

export default App;
