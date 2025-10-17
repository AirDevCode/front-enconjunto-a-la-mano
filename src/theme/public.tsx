'use client';
import Footer from './footer';
import Header from './header';
import React from 'react';
import SidebarPrivate from './sidebar-private';
import { LOGIN } from '@/constants/login';
import SidebarAdmin from './sidebar-admin';

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function ThemePublic(props:any) {
  // const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [showSidebar, setShowSidebar] = React.useState(false);

  const toggleSidebar = () => {
    if(showSidebar) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  };

  // React.useEffect(() => {
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };

  //   window.addEventListener('resize', handleResize);
    
  //   window.scrollTo(0, 0);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <div className={classNames(showSidebar ? 'show-sidebar' : '', '')}>
      <Header toggleSidebar={toggleSidebar}></Header>

      {/* {LOGIN?.TOKEN && LOGIN?.TYPEUSER === '1' ? (
        <SidebarAdmin toggleSidebar={toggleSidebar} />
        ) : null}

        {LOGIN?.TOKEN && LOGIN?.TYPEUSER === '2' ? (
        <SidebarPrivate toggleSidebar={toggleSidebar} />
        ) : null
      } */}

      <section className="main min-h-body">
        {props.children}
      </section>

      <Footer></Footer>
    </div>
  )
}