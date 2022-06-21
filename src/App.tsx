import React from 'react';
import './App.css';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import styles from './pages/PasswordRecovery/index.module.scss';
import { useAuthContext } from './context/useAuthContext';
import Login from './pages/Login';
import Students from './pages/Students';
import Curators from './pages/Сurators';
import Teachers from './pages/Teachers';
import Subjects from './pages/Subjects';
import Estimates from './pages/Estimates';
import VotingAdmin from './pages/VotingAdmin';
import Administrators from './pages/Administrators';
import IndPlan from './pages/IndividualPlan';
import VotingStudents from './pages/VotingStudents';
import Group from './pages/Group';
import Teacher from './pages/Teacher';
import Curator from './pages/Сurator';
import PasRec from './pages/PasswordRecovery';
import leftArrow from './images/login/leftArrow.svg';
import ChangePassword from './pages/ChangePassword';
import { useMessagesContext } from './context/useMessagesContext';

const App = (): JSX.Element => {
  const { user } = useAuthContext();
  const { messages, closeError } = useMessagesContext();

  return (
    <BrowserRouter>
      <Routes>
        {user && (
        <>
          <Route index element={<Group />} />
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

          <Route path="/change-password" element={<ChangePassword />} />
        </>
        )}
        <Route
          index
          element={(<Login><Link to="/PasswordRecovery">відновити пароль</Link></Login>)}
        />
        <Route
          path="/passwordRecovery"
          element={(
            <PasRec>
              <Link to="/" className={styles.passwordRecovery__link}>
                <img src={leftArrow} alt=" " />
                відновити пароль
              </Link>
            </PasRec>
            )}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;
