import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Administrators from '../../../pages/Administrators/Administrators';
import Students from '../../../pages/Students/Students';

import Group from '../../../pages/Group/Group';
import Curators from '../../../pages/Сurators/Curators';
import Teachers from '../../../pages/Teachers/Teachers';
import Subjects from '../../../pages/Subjects/Subjects';
import Estimates from '../../../pages/Estimates/Estimates';
import VotingAdmin from '../../../pages/Voting_admin/VotingAdmin';
import IndPlan from '../../../pages/Individual_plan/IndPlan';
import VotingStudents from '../../../pages/Voting_students/VotingStudents';
import Teacher from '../../../pages/Teacher/Teacher';
import Curator from '../../../pages/Сurator/Curator';

import svgGroup from '../../../images/Group.svg';
import svgStudents from '../../../images/Students.svg';
import svgAdministrators from '../../../images/Administrators.svg';
import svgCurators from '../../../images/Curators.svg';
import svgTeachers from '../../../images/Teachers.svg';
import svgSubjects from '../../../images/Subjects.svg';
import svgEstimates from '../../../images/Estimates.svg';
import svgIndividualPlan from '../../../images/individual_plan.svg';
import svgVotingAdmin from '../../../images/VotingAdmin.svg';
import NavigationItem from '../NavigationItem/NavigationItem';
import styles from './navigation.module.scss';

export interface IRoute {
  title: string;
  to:string;
  ico: string;
}

const routes:IRoute[] = [
  {
    title: 'Групи',
    to: '/',
    ico: svgGroup,
  },
  {
    title: 'Студенти',
    to: '/students',
    ico: svgStudents,
  },
  {
    title: 'Куратори',
    to: '/curators',
    ico: svgCurators,
  },
  {
    title: 'Викладачі',
    to: '/teachers',
    ico: svgTeachers,
  },
  {
    title: 'Предмети',
    to: '/subjects',
    ico: svgSubjects,
  },
  {
    title: 'Оцінки',
    to: '/estimates',
    ico: svgEstimates,
  },
  {
    title: 'Голоc. адмін',
    to: '/voting_admin',
    ico: svgVotingAdmin,
  },
  {
    title: 'Адміністратори',
    to: '/administrators',
    ico: svgAdministrators,
  },
  {
    title: 'Індив. план',
    to: '/individual_plan',
    ico: svgIndividualPlan,
  },
  {
    title: 'Голос. студ.',
    to: '/voting_students',
    ico: svgVotingAdmin,
  },
];

interface INavigation {
  isOpen: boolean;
}

const Navigation = ({ isOpen }:INavigation):JSX.Element => (
  <BrowserRouter>
    <div className={styles.nav_and_content}>
      <div className={styles.nav__menu}>
        <div className={styles.nav__menu__links}>
          {routes.map((rout) => (
            <NavigationItem key={rout.to} {...rout} isOpen={isOpen} />
          ))}

          {/* викладач */}
          {/* <NavLink */}
          {/*  className={({ isActive }) => clsx(styles.link, styles.h42p, isActive && styles.Active)} */}
          {/*  to="/teacher" */}
          {/* > */}
          {/*  <span className={styles.title}>Викладач</span> */}
          {/* </NavLink> */}
          {/* /!* куратор *!/ */}
          {/* <NavLink */}
          {/*  className={({ isActive }) => clsx(styles.link, styles.h42p, isActive && styles.Active)} */}
          {/*  to="/curator" */}
          {/* > */}
          {/*  <span className={styles.title}>Куратор</span> */}
          {/* </NavLink> */}
        </div>
      </div>
      <div className={styles.content}>
        <Routes>
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
        </Routes>
      </div>

    </div>
  </BrowserRouter>
);

export default Navigation;
