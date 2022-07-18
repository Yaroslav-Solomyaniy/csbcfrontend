import React from 'react';

import svgGroup from '../../images/Group.svg';
import svgStudents from '../../images/Students.svg';
import svgAdministrators from '../../images/Administrators.svg';
import svgCurators from '../../images/Curators.svg';
import svgTeachers from '../../images/Teachers.svg';
import svgCourses from '../../images/Courses.svg';
import svgEstimates from '../../images/Estimates.svg';
import svgIndividualPlan from '../../images/individual_plan.svg';
import svgVotingAdmin from '../../images/VotingAdmin.svg';
import NavigationItem from './NavigationItem';
import styles from './index.module.scss';

export interface IRoute {
  title: string;
  to: string;
  ico: string;
}

const routes: IRoute[] = [
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
    to: '/courses',
    ico: svgCourses,
  },
  {
    title: 'Оцінки',
    to: '/estimates',
    ico: svgEstimates,
  },
  {
    title: 'Голоc. адмін',
    to: '/voting-admin',
    ico: svgVotingAdmin,
  },
  {
    title: 'Адміністратори',
    to: '/administrators',
    ico: svgAdministrators,
  },
  {
    title: 'Індив. план',
    to: '/individual-plan',
    ico: svgIndividualPlan,
  },
  {
    title: 'Голос. студ.',
    to: '/voting-students',
    ico: svgVotingAdmin,
  },
  {
    title: 'Викладач',
    to: '/teacher',
    ico: svgTeachers,
  },
  {
    title: 'Куратор',
    to: '/curator',
    ico: svgCurators,
  },
];

interface INavigation {
  isOpen: boolean;
}

const Navigation = ({ isOpen }: INavigation): JSX.Element => (
  <div className={styles.nav__menu}>
    <div className={styles.nav__menu__links}>
      {routes.map((rout) => (
        <NavigationItem key={rout.to} {...rout} isOpen={isOpen} />
      ))}
    </div>
  </div>
);

export default Navigation;
