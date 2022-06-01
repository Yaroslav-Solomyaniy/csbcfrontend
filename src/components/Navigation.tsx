import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Administrators from '../pages/Administrators/Administrators';
import Students from '../pages/Students/Students';
import '../style/Navigation.css';
import '../style/App.css';
import Group from '../pages/Group/Group';
import Curators from '../pages/Сurators/Curators';
import Teachers from '../pages/Teachers/Teachers';
import Subjects from '../pages/Subjects/Subjects';
import Estimates from '../pages/Estimates/Estimates';
import VotingAdmin from '../pages/Voting_admin/VotingAdmin';
import IndividualPlan from '../pages/Individual_plan/IndividualPlan';
import VotingStudents from '../pages/Voting_students/VotingStudents';
import Teacher from '../pages/Teacher/Teacher';
import Curator from '../pages/Сurator/Curator';
// import svgAdministrators from '../images/Administrators.svg';
// import svgGroup from '../images/Group.svg';
// import svgStudents from '../images/Students.svg';

function Navigation() {
  /* куратор */
  return (
    <BrowserRouter>
      <div className="navAndContent">
        <div className="navMenu">
          <div className="navMenuLinks">
            <NavLink
              className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
              to="/"
            >
              {/* <img src="../" /> */}
              <span>Групи</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
              to="/students"
            >
              <span>Студенти</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
              to="/curators"
            >
              <span>Куратори</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
              to="/teachers"
            >
              <span>Викладачі</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
              to="/subjects"
            >
              <span>Предмети</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
              to="/estimates"
            >
              <span>Оцінки</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
              to="/voting_admin"
            >
              <span>Голосування адмінка</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
              to="/administrators"
            >
              <span>Адміністратори</span>
            </NavLink>
            {/* студент */}
            <NavLink
              className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
              to="/individual_plan"
            >
              <span>Індивідуальний план</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
              to="/voting_students"
            >
              <span>Голосування студенти</span>
            </NavLink>
            {/* викладач */}
            <NavLink
              className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
              to="/teacher"
            >
              <span>Викладач</span>
            </NavLink>
            {/* куратор */}
            <NavLink
              className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
              to="/curator"
            >
              <span>Куратор</span>
            </NavLink>
          </div>
        </div>
        <Routes>
          <Route index element={<Group />} />
          <Route path="/students" element={<Students />} />
          <Route path="/curators" element={<Curators />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/estimates" element={<Estimates />} />
          <Route path="/voting_admin" element={<VotingAdmin />} />
          <Route path="/administrators" element={<Administrators />} />

          <Route path="/individual_plan" element={<IndividualPlan />} />
          <Route path="/voting_students" element={<VotingStudents />} />

          <Route path="/teacher" element={<Teacher />} />

          <Route path="/curator" element={<Curator />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Navigation;
