import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Administrators from '../pages/Administrators/Administrators';
import Students from '../pages/Students/Students';
import '../style/Navigation.css';

function Navigation() {
  return (
    <BrowserRouter>
      <div className="navMenu">
        <Link to="/">Administrators</Link>
        <Link to="/students">Students</Link>
      </div>
      <Routes>
        <Route index element={<Administrators />} />
        <Route path="/students" element={<Students />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
