import React from 'react';
import { NavLink } from 'react-router-dom';
import { IRoute } from '../index';
import styles from '../menu/MenuLink.module.scss';

interface IMobileNavigationList{
  routes: IRoute[];
  role: string;
}

const MobileMenuLink = ({ routes, role }:IMobileNavigationList) => (
  <>
    {routes.filter((route) => route.role.includes(role)).map((rout) => (
      <NavLink key={rout.to} className={styles.LinkItem} to={rout.to}>
        <span className={styles.LinkItem_text}>{rout.title}</span>
      </NavLink>
    ))}
  </>
);

export default MobileMenuLink;
