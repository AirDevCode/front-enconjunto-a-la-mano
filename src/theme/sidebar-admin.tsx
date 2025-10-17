'use client';
import LogoutButton from '@/app/_components/logoutButton';
import Rest from '@/libs/rest';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import UserSession from "@/libs/userSession";

export default function SidebarAdmin({toggleSidebar}:any) {
  const router = useRouter();
  
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [isLoading, setIsLoading] = useState(Boolean);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('')
  const params = usePathname();
  
  const getInformationuser = () => {
    setIsLoading(true);
    let list = new Rest();
    list.get('auth/user-profile')
    .then((responseData:any) => {
      setIsLoading(false);
      setmsgApi(responseData.msg);
      if(responseData.success == true) {
        if(responseData.data.original.typeuser_id === 2) {
          router.push('/site/login');
        }
      } else {
        let userSession = new UserSession();
        userSession.logout();
        setShowModalError(true);
        router.push('/site/login');
      }
    }).catch((error) => {console.error('Wrong:', error);}) 
  }

  useEffect(() => {
    getInformationuser();
  },[])

  return (
    <div className="sidebar bg-grey-9">
      <button type="button" className="btn d-table d-lg-none fz-26 me-2 ms-auto mt-2 text-dark" onClick={() => {toggleSidebar(), setShowSidebar(true)}}>
        <i className="fa-solid fa-xmark"></i>
      </button>

      <div className="content mt-3 mt-md-4 pt-xl-3">
        <ul className="list-menu m-0 p-0 list-unstyled">
          <li>
            
            <Link href="/admin" className={`btn px-0 py-2 px-3 px-md-4 px-xl-5  ${params === '/admin' ? 'active' : ''}`}>
              <div className="icon fz-28">
              <i className="fa-solid fa-house"></i>
              </div>
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/admin/ads"  className={`btn px-0 py-2 px-3 px-md-4 px-xl-5  ${params === '/admin/ads' ? 'active' : ''}`}>
              <div className="icon fz-28">
                <i className="fa-solid fa-bullhorn"></i>
              </div>
              Listado de anuncios
            </Link>
          </li>
          <li>
            <Link href="/admin/sellers" className={`btn px-0 py-2 px-3 px-md-4 px-xl-5  ${params === '/admin/sellers' ? 'active' : ''}`} >
              <div className="icon fz-28">
                <i className="fa-solid fa-users"></i>
              </div>
              Listado de vendedores
            </Link>
          </li>
          <li>
            <Link href="/admin/categories" className={`btn px-0 py-2 px-3 px-md-4 px-xl-5  ${params === '/admin/categories' ? 'active' : ''}`}>
              <div className="icon fz-28">
                <i className="fa-solid fa-tag"></i>
              </div>
              Categorías
            </Link>
          </li>
          <li>
            <Link href="/admin/sets" className={`btn px-0 py-2 px-3 px-md-4 px-xl-5  ${params === '/admin/sets' ? 'active' : ''}`}>
              <div className="icon fz-28">
                <i className="fa-solid fa-house-flood-water-circle-arrow-right"></i>
              </div>
              Conjuntos
            </Link>
          </li>
          <li>
            <Link href="/admin/cities" className={`btn px-0 py-2 px-3 px-md-4 px-xl-5  ${params === '/admin/cities' ? 'active' : ''}`}>
              <div className="icon fz-28">
                <i className="fa-solid fa-tree-city"></i>
              </div>
              Ciudades
            </Link>
          </li>
          <li className="mt-4 mt-lg-5">
            <LogoutButton />
          </li>
        </ul>
      </div>
    </div>
  )
}