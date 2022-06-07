import React from 'react';
import { BrowserRouter } from 'react-router-dom';

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
        <div>
          children
        </div>
      </div>

    </div>
  </BrowserRouter>
);

export default Navigation;
