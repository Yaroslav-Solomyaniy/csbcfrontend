import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './context/All/AuthContext';
import MessagesProvider from './context/All/Messages';

ReactDOM.render(
  <MessagesProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </MessagesProvider>,
  document.getElementById('root'),
);
reportWebVitals();
