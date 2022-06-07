import React from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './loyout/Layout';
import { useAuthContext } from './context/useAuthContext';
import Login from './pages/Login/Login';

const App = (): JSX.Element => {
  const { user } = useAuthContext();

  console.log(user);

  return (

    <BrowserRouter>
      <Routes>
        {user && (
          <Route index element={<Layout />} />
        )}
        <Route index element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
