import React from 'react';
import {
  Administrators,
  Courses,
  Curators,
  Estimates,
  Group,
  IndividualPlan,
  Students,
  Teachers,
  Voting,
} from '../common/Icon';
import NavigationItem from './NavigationItem';
import styles from './index.module.scss';

export interface IRoute {
  title: string;
  to: string;
  ico: string | JSX.Element;
  role: string[];
}

const routes: IRoute[] = [
  {
    title: 'Групи',
    to: '/',
    ico: <Group />,
    role: ['admin'],
  },
  {
    title: 'Студенти',
    to: '/students',
    ico: <Students />,
    role: ['admin'],
  },
  {
    title: 'Куратори',
    to: '/curators',
    ico: <Curators />,
    role: ['admin'],
  },
  {
    title: 'Викладачі',
    to: '/teachers',
    ico: <Teachers />,
    role: ['admin'],
  },
  {
    title: 'Предмети',
    to: '/courses',
    ico: <Courses />,
    role: ['admin'],
  },
  {
    title: 'Оцінки',
    to: '/estimates',
    ico: <Estimates />,
    role: ['admin'],
  },
  {
    title: 'Голосування',
    to: '/voting-admin',
    ico: <Voting />,
    role: ['admin'],
  },
  {
    title: 'Адміністратори',
    to: '/administrators',
    ico: <Administrators />,
    role: ['admin'],
  },
  {
    title: 'Індивід. план',
    to: '/',
    ico: <IndividualPlan />,
    role: ['student'],
  },
  {
    title: 'Голосування',
    to: '/voting-students',
    ico: <Voting />,
    role: ['student'],
  },
];

interface INavigation {
  isOpen: boolean;
 role: 'student' | 'admin';
}

const Navigation = ({ isOpen, role }: INavigation): JSX.Element => (
  <div className={styles.nav__menu}>
    <div className={styles.nav__menu__links}>
      {routes.filter((route) => route.role.includes(role)).map((rout) => (
        <NavigationItem key={rout.to} {...rout} isOpen={isOpen} />
      ))}
    </div>
  </div>
);

export default Navigation;
