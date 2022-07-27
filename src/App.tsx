import './App.css';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import styles from './pages/PasswordRecovery/index.module.scss';
import { useAuthContext } from './context/useAuthContext';
import Login from './pages/Login';
import Students from './pages/Students';
import Curators from './pages/Сurators';
import Teacher from './pages/Teacher';
import Estimates from './pages/Estimates';
import VotingAdmin from './pages/VotingAdmin';
import Administrators from './pages/Administrators';
import IndPlan from './pages/IndividualPlan';
import VotingStudents from './pages/VotingStudents';
import Group from './pages/Group';
import Teachers from './pages/Teachers';
import Curator from './pages/Сurator';
import PasRec from './pages/PasswordRecovery';
import leftArrow from './images/login/leftArrow.svg';
import ChangePassword from './pages/ChangePassword';
import StudentsProvider from './context/students';
import GroupProvider from './context/group';
import Courses from './pages/Courses';
import CourseProvider from './context/course';
import TeachersProvider from './context/teachers';

const App = (): JSX.Element => {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        {user && (
          <>
            <Route index element={<GroupProvider><Group /></GroupProvider>} />
            <Route path="/students" element={<StudentsProvider><Students /></StudentsProvider>} />
            <Route path="/curators" element={<Curators />} />
            <Route path="/teachers" element={<TeachersProvider><Teachers /></TeachersProvider>} />
            <Route path="/courses" element={<CourseProvider><Courses /></CourseProvider>} />
            <Route path="/estimates" element={<Estimates />} />
            <Route path="/voting-admin" element={<VotingAdmin />} />
            <Route path="/administrators" element={<Administrators />} />

            <Route path="/individual-plan" element={<IndPlan />} />
            <Route path="/voting-students" element={<VotingStudents />} />

            <Route path="/teacher" element={<Teacher />} />

            <Route path="/curator" element={<Curator />} />

            <Route path="/change-password" element={<ChangePassword />} />
          </>
        )}
        <Route
          index
          element={(
            <Login><Link to="/Password-recovery" className="LinkPasswordRecovery">Відновити пароль</Link></Login>)}
        />
        <Route
          path="/password-recovery"
          element={(
            <PasRec>
              <Link to="/" className={styles.passwordRecovery__link}>
                <img src={leftArrow} alt="left arrow" />
                Повернутись до входу
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
