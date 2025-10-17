'use client';
import Footer from './footer';
import Header from './header';
import SidebarAdmin from './sidebar-admin';
import React from 'react';

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function ThemeAdmin(props:any) {
  const [showSidebar, setShowSidebar] = React.useState(false);

  const toggleSidebar = () => {
    if(showSidebar) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  };

  return (
    <div className={classNames(showSidebar ? 'show-sidebar' : '', 'wrapper-content')}>
      <Header toggleSidebar={toggleSidebar}></Header>

      <SidebarAdmin toggleSidebar={toggleSidebar}></SidebarAdmin>

      <section className="main wrapper-private min-h-body">
        {props.children}
      </section>

      <Footer></Footer>
    </div>
  )
}