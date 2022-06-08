import React from 'react';

import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import styles from './pages/PasswordRecovery/passwordRecovery.module.scss';
import { useAuthContext } from './context/useAuthContext';
import Login from './pages/Login/Login';
import Students from './pages/Students/Students';
import Curators from './pages/Сurators/Curators';
import Teachers from './pages/Teachers/Teachers';
import Subjects from './pages/Subjects/Subjects';
import Estimates from './pages/Estimates/Estimates';
import VotingAdmin from './pages/VotingAdmin/VotingAdmin';
import Administrators from './pages/Administrators/Administrators';
import IndPlan from './pages/IndividualPlan/IndPlan';
import VotingStudents from './pages/VotingStudents/VotingStudents';
import Group from './pages/Group/Group';
import Teacher from './pages/Teacher/Teacher';
import Curator from './pages/Сurator/Curator';
import PasRec from './pages/PasswordRecovery/PasswordRecovery';
import leftArrow from './images/login/leftArrow.svg';

const App = (): JSX.Element => {
  const { user } = useAuthContext();

  // eslint-disable-next-line no-console
  console.log(user);

  return (

    <BrowserRouter>
      <Routes>
        {user?.role === 'root' && (
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
          </>
        )}
        <Route
          index
          element={(<Login><Link to="/PasswordRecovery">відновити пароль</Link></Login>)}
        />
        <Route
          path="/PasswordRecovery"
          element={(
            <PasRec>
              <Link to="/" className={styles.passwordRecovery__link}>
                <img src={leftArrow} alt=" " />
                відновити пароль
              </Link>
            </PasRec>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
