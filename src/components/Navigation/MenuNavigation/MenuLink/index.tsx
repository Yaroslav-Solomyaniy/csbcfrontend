import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../MenuLink.module.scss';

interface IMenuLink{
to: string;
name: string;
}

const MenuLink = ({ to, name }:IMenuLink):JSX.Element => (
  <NavLink className={styles.LinkItem} to={to}>
    <span className={styles.LinkItem_text}>{name}</span>
  </NavLink>
);

export default MenuLink;
