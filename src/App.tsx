import './assets/styles/App.css';
import './assets/styles/normalize.css';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import AppRouter from './Routes';
import DeviceSizeProvider from './context/All/DeviceType';
import MessagesProvider from './context/All/Messages';
import AuthProvider from './context/All/AuthContext';
import { AxiosInterceptor } from './hooks/api/config';

const App = (): JSX.Element => (
  <BrowserRouter>
    <DeviceSizeProvider>
      <MessagesProvider>
        <AxiosInterceptor>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </AxiosInterceptor>
      </MessagesProvider>
    </DeviceSizeProvider>
  </BrowserRouter>
);

export default App;
