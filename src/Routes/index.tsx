import { Link, Navigate, Route, Routes } from 'react-router-dom';
import GroupProvider from '../context/Pages/admin/Groups';
import Group from '../pages/Admin/Groups';
import StudentsProvider from '../context/Pages/admin/Students';
import Students from '../pages/Admin/Students';
import CuratorsProvider from '../context/Pages/admin/Curators';
import Curators from '../pages/Admin/Сurators';
import TeachersProvider from '../context/Pages/admin/Teachers';
import Teachers from '../pages/Admin/Teachers';
import CoursesProvider from '../context/Pages/admin/Courses';
import Courses from '../pages/Admin/Courses';
import EstimatesProvider from '../context/Pages/admin/Estimates';
import Estimates from '../pages/Admin/Grades';
import VotingAdmin from '../pages/Admin/Votings';
import AdministratorsProvider from '../context/Pages/admin/Administators';
import Administrators from '../pages/Admin/Admins';
import IndPlan from '../pages/Student/IndividualPlan/index';
import VotingStudents from '../pages/Student/Voting';
import TeacherPage from '../pages/Teacher';
import Curator from '../pages/Сurator';
import ChangePassword from '../pages/All/ChangePassword';
import Login from '../pages/All/Login';
import PasRec from '../pages/All/PasswordRecovery';
import styles from '../pages/All/PasswordRecovery/index.module.scss';
import leftArrow from '../assets/images/login/leftArrow.svg';
import { AuthContext } from '../context/All/AuthContext';
import VotingAdminProvider from '../context/Pages/admin/Votings';
import StudentProvider from '../context/Pages/student/Student';
import TeacherProvider from '../context/Pages/teacher/Teacher';
import PlanProvider from '../context/Pages/student/IndvPlan';
import CuratorProvider from '../context/Pages/curator';
import useGetVotingInfo from '../hooks/hooks/useGetVotingInfo';
import useClearMessages from '../hooks/hooks/useClearMessages';

const AppRouter = () => {
  const { roleAdmin, roleTeacher, roleStudent, user, roleCurator } = AuthContext();

  useClearMessages();
  useGetVotingInfo();

  return (
    <Routes>
      {roleAdmin && (
        <>
          <Route
            index
            element={<GroupProvider><Group /></GroupProvider>}
          />
          <Route
            path="/students"
            element={<StudentsProvider><PlanProvider><Students /></PlanProvider></StudentsProvider>}
          />
          <Route
            path="/curators"
            element={<CuratorsProvider><Curators /></CuratorsProvider>}
          />
          <Route
            path="/teachers"
            element={<TeachersProvider><Teachers /></TeachersProvider>}
          />
          <Route
            path="/courses"
            element={<CoursesProvider><Courses /></CoursesProvider>}
          />
          <Route
            path="/grades"
            element={(<EstimatesProvider><Estimates /></EstimatesProvider>)}
          />
          <Route
            path="/voting-admin"
            element={<VotingAdminProvider><VotingAdmin /></VotingAdminProvider>}
          />
          <Route
            path="/administrators"
            element={<AdministratorsProvider><Administrators /></AdministratorsProvider>}
          />
        </>
      )}
      {roleStudent && (
        <>
          <Route index element={<PlanProvider><IndPlan /></PlanProvider>} />
          <Route path="/voting-students" element={<StudentProvider><VotingStudents /></StudentProvider>} />
        </>
      )}
      {roleTeacher && (
        <Route index element={<TeacherProvider><TeacherPage /></TeacherProvider>} />
      )}
      {roleCurator && (
        <Route index element={<CuratorProvider><Curator /></CuratorProvider>} />
      )}
      {user && (
        <Route path="/change-password" element={<ChangePassword />} />
      )}
      {!user && (
        <>
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
          <Route index element={(<Login />)} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}

    </Routes>
  );
};

export default AppRouter;
