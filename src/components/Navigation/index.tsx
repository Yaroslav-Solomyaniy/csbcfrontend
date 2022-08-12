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
}

/* const routes: IRoute[] = [
  {
    title: 'Групи',
    to: '/',
    ico: <Group />,
  },
  {
    title: 'Студенти',
    to: '/students',
    ico: <Students />,
  },
  {
    title: 'Куратори',
    to: '/curators',
    ico: <Curators />,
  },
  {
    title: 'Викладачі',
    to: '/teachers',
    ico: <Teachers />,
  },
  {
    title: 'Предмети',
    to: '/courses',
    ico: <Courses />,
  },
  {
    title: 'Оцінки',
    to: '/estimates',
    ico: <Estimates />,
  },
  {
    title: 'Голоc. адмін',
    to: '/voting-admin',
    ico: <Voting />,
  },
  {
    title: 'Адміністратори',
    to: '/administrators',
    ico: <Administrators />,
  },
  {
    title: 'Індив. план',
    to: '/individual-plan',
    ico: <IndividualPlan />,
  },
  {
    title: 'Голос. студ.',
    to: '/voting-students',
    ico: <Voting />,
  },
  {
    title: 'Викладач',
    to: '/teacher',
    ico: <Teachers />,
  },
  {
    title: 'Куратор',
    to: '/curator',
    ico: <Curators />,
  },
]; */
interface Iroutes {
  admin: IRoute[];
  student: IRoute[];
}

const routes: Iroutes = {
  admin: [
    {
      title: 'Групи',
      to: '/',
      ico: <Group />,
    },
    {
      title: 'Студенти',
      to: '/students',
      ico: <Students />,
    },
    {
      title: 'Куратори',
      to: '/curators',
      ico: <Curators />,
    },
    {
      title: 'Викладачі',
      to: '/teachers',
      ico: <Teachers />,
    },
    {
      title: 'Предмети',
      to: '/courses',
      ico: <Courses />,
    },
    {
      title: 'Оцінки',
      to: '/estimates',
      ico: <Estimates />,
    },
    {
      title: 'Голосування',
      to: '/voting-admin',
      ico: <Voting />,
    },
    {
      title: 'Адміністратори',
      to: '/administrators',
      ico: <Administrators />,
    }],
  student: [
    {
      title: 'Індивід. план',
      to: '/individual-plan',
      ico: <IndividualPlan />,
    },
    {
      title: 'Голосування',
      to: '/voting-students',
      ico: <Voting />,
    }],
};

interface INavigation {
  isOpen: boolean;
  roles: 'student' | 'admin';
}

const Navigation = ({ isOpen, roles }: INavigation): JSX.Element => (
  <div className={styles.nav__menu}>
    <div className={styles.nav__menu__links}>
      {routes[roles].map((rout) => (
        <NavigationItem key={rout.to} {...rout} isOpen={isOpen} />
      ))}
    </div>
  </div>
);

export default Navigation;
