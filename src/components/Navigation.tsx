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

import svgGroup from '../images/Group.svg';
import svgStudents from '../images/Students.svg';
import svgAdministrators from '../images/Administrators.svg';
import svgCurators from '../images/Curators.svg';
import svgTeachers from '../images/Teachers.svg';
import svgSubjects from '../images/Subjects.svg';
import svgEstimates from '../images/Estimates.svg';
import svgIndividualPlan from '../images/individual_plan.svg';
import svgVotingAdmin from '../images/VotingAdmin.svg';

const Navigation = ():JSX.Element => (
  <BrowserRouter>
    <div className="navAndContent">
      <div className="navMenu">
        <div className="navMenuLinks">
          <NavLink
            className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
            to="/"
          >
            <img className="icon" src={svgGroup} alt=" " />
            <span>Групи</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
            to="/students"
          >
            <img className="icon" src={svgStudents} alt=" " />
            <span>Студенти</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
            to="/curators"
          >
            <img className="icon" src={svgCurators} alt=" " />
            <span>Куратори</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
            to="/teachers"
          >
            <img className="icon" src={svgTeachers} alt=" " />
            <span>Викладачі</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
            to="/subjects"
          >
            <img className="icon" src={svgSubjects} alt=" " />
            <span>Предмети</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
            to="/estimates"
          >
            <img className="icon" src={svgEstimates} alt=" " />
            <span>Оцінки</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
            to="/voting_admin"
          >
            <img className="icon" src={svgVotingAdmin} alt=" " />
            <span>Голоc. адмін</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
            to="/administrators"
          >
            <img className="icon" src={svgAdministrators} alt=" " />
            <span>Адміністратори</span>
          </NavLink>
          {/* студент */}
          <NavLink
            className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
            to="/individual_plan"
          >
            <img className="icon" src={svgIndividualPlan} alt=" " />
            <span>Індив. план</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'link Active h42p' : 'link h42p')}
            to="/voting_students"
          >
            <img className="icon" src={svgVotingAdmin} alt=" " />
            <span>Голос. студ.</span>
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

export default Navigation;
