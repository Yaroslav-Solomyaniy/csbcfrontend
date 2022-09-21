import React from 'react';
import { IRoute } from '../../index';
import MenuLink from '../../MenuNavigation/MenuLink';

interface IMobileNavigationList{
  routes: IRoute[];
  role: string;
}

const MobileNavigationList = ({ routes, role }:IMobileNavigationList) => (
  <>
    {routes.filter((route) => route.role.includes(role)).map((rout) => (
      <MenuLink key={rout.to} to={rout.to} name={rout.title} />
    ))}
  </>
);

export default MobileNavigationList;
