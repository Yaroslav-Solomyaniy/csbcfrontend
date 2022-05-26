import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

function Layout() {
  // let list:Array<{ Namelink:string, path:string }> = [
  //     { Namelink: "home", path: "/home"},
  //     { Namelink: "tools", path: "/tools"},
  //     { Namelink: "rom", path: "/rom"}
  // ];

  return (
    <div>
      <Header />
      <div className="content">
        <Navigation />
      </div>
    </div>
  );
}

export default Layout;
