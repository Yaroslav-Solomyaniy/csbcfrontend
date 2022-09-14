import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './context/useAuthContext';
import MessagesProvider from './context/messagesContext';

ReactDOM.render(
  <MessagesProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </MessagesProvider>,
  document.getElementById('root'),
);
reportWebVitals();
