import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route, Link,
} from 'react-router-dom';

import './style/App.css';
import { useLogin } from './hooks/auth';
import Students from './pages/Students/Students';
import Table from './UI/Table/Table';

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
        <Route index element={<Table />} />
        <Route path="/students" element={<Students />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
