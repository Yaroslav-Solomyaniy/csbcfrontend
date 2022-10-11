import React, { useEffect } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import moment from 'moment';
import GroupProvider from '../context/PagesInAdmin/Groups';
import Group from '../pages/Admin/Groups';
import StudentsProvider from '../context/PagesInAdmin/Students';
import Students from '../pages/Admin/Students';
import CuratorsProvider from '../context/PagesInAdmin/Curators';
import Curators from '../pages/Admin/Сurators';
import TeachersProvider from '../context/PagesInAdmin/Teachers';
import Teachers from '../pages/Admin/Teachers';
import CoursesProvider from '../context/PagesInAdmin/Courses';
import Courses from '../pages/Admin/Courses';
import EstimatesProvider from '../context/PagesInAdmin/Estimates';
import Estimates from '../pages/Admin/Estimates';
import VotingAdmin from '../pages/Admin/Votings';
import AdministratorsProvider from '../context/PagesInAdmin/Administators';
import Administrators from '../pages/Admin/Admins';
import IndPlan from '../pages/Student/IndividualPlan/index';
import VotingStudents from '../pages/Student/Voting';
import TeacherPage from '../pages/Teacher';
import Curator from '../pages/Сurator';
import ChangePassword from '../pages/All/ChangePassword';
import Login from '../pages/All/Login';
import PasRec from '../pages/All/PasswordRecovery';
import styles from '../pages/All/PasswordRecovery/index.module.scss';
import leftArrow from '../images/login/leftArrow.svg';
import { AuthContext } from '../context/All/AuthContext';
import VotingAdminProvider from '../context/PagesInAdmin/Votings';
import StudentProvider from '../context/PagesInStudent/Student';
import TeacherProvider from '../context/PageInTeacher/Teacher';
import PlanProvider from '../context/IndividualPlan';
import CuratorProvider from '../context/PageInCurator';
import { MessagesContext } from '../context/All/Messages';
import { useStudentVotingInfo } from '../hooks/PagesInStudents/usePageInStudents';

const AppRoutes = () => {
  const { user } = AuthContext();
  const { clearMessages, addVoting, addWarning } = MessagesContext();
  const location = useLocation();
  const { getStudentVotingInfo, studentVotingInfo } = useStudentVotingInfo();

  useEffect(() => {
    clearMessages();
  }, [location.pathname, user]);

  useEffect(() => {
    if (user?.role === 'student') {
      getStudentVotingInfo();
    }
  }, [user?.role === 'student']);

  useEffect(() => {
    if (studentVotingInfo) {
      if (new Date() < moment(studentVotingInfo.startDate).toDate()) {
        addWarning(studentVotingInfo.isRevote
          // eslint-disable-next-line max-len
          ? `Скоро розпочнеться переголосування. До початку переголосування ${+moment(Math.abs(new Date().getTime() - moment(studentVotingInfo.startDate).toDate().getTime())).format('D') - 1} - дні(-в).`
          // eslint-disable-next-line max-len
          : `Скоро розпочнеться голосування. До початку голосування ${+moment(Math.abs(new Date().getTime() - moment(studentVotingInfo.startDate).toDate().getTime())).format('D') - 1} - дні(-в).`);
      }
      if (new Date() > moment(studentVotingInfo.startDate).toDate()
        && new Date() < moment(studentVotingInfo.endDate).toDate()) {
        addVoting(studentVotingInfo.isRevote
          ? 'Розпочалось переголосування. Ви можете змінити свій вибір.'
          : 'Розпочалось голосування. Ви можете обрати вибіркові предмети.');
      }
    }
  }, [studentVotingInfo]);

  return (
    <Routes>
      {user?.role === 'admin' && (
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
            path="/estimates"
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
      {user?.role === 'student' && (
        <>
          <Route index element={<PlanProvider><IndPlan /></PlanProvider>} />
          <Route path="/voting-students" element={<StudentProvider><VotingStudents /></StudentProvider>} />
        </>
      )}
      {user?.role === 'teacher' && (
        <Route index element={<TeacherProvider><TeacherPage /></TeacherProvider>} />
      )}
      {user?.role === 'curator' && (
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

export default AppRoutes;
