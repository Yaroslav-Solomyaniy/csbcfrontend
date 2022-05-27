import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route, Link,
} from 'react-router-dom';

import Home from './pages/home';
import Students from './pages/students';

import './App.css';
import { useLogin } from './hooks/auth';

function App() {
  const { fetch } = useLogin();

  useEffect(() => {
    fetch({ email: 'root@gmail.com', password: 'root@gmail.com' });
  }, []);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        {' '}
        |
        {' '}
        <Link to="/students">Students</Link>
      </nav>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/students" element={<Students />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
