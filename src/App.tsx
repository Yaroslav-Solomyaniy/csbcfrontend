import React from 'react';

import './App.css';
// import Layout from './loyout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './context/useAuthContext';
import Group from './pages/Group/Group';
import Students from './pages/Students/Students';
import Curators from './pages/Сurators/Curators';
import Teachers from './pages/Teachers/Teachers';
import Subjects from './pages/Subjects/Subjects';
import Estimates from './pages/Estimates/Estimates';
import VotingAdmin from './pages/Voting_admin/VotingAdmin';
import Administrators from './pages/Administrators/Administrators';
import IndPlan from './pages/Individual_plan/IndPlan';
import VotingStudents from './pages/Voting_students/VotingStudents';
import Teacher from './pages/Teacher/Teacher';
import Curator from './pages/Сurator/Curator';
import Login from './pages/Login/Login';

const App = (): JSX.Element => {
  const { user } = useAuthContext();

  console.log(user);

  return (
  // <Layout />

    <BrowserRouter>
      <Routes>
        {user && (
          <>
            <Route path="/students" element={<Students />} />
            <Route path="/curators" element={<Curators />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/estimates" element={<Estimates />} />
            <Route path="/voting_admin" element={<VotingAdmin />} />
            <Route path="/administrators" element={<Administrators />} />

            <Route path="/individual_plan" element={<IndPlan />} />
            <Route path="/voting_students" element={<VotingStudents />} />

            <Route path="/teacher" element={<Teacher />} />

            <Route path="/curator" element={<Curator />} />

            <Route index element={<Group />} />
          </>
        )}
        <Route index element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
