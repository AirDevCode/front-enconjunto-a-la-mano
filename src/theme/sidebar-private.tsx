'use client';
import Loading from '@/app/_components/loading';
import LogoutButton from '@/app/_components/logoutButton';
import ModalError from '@/app/_components/modalError';
import Rest from '@/libs/rest';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import UserSession from "@/libs/userSession";

export default function ThemeSidebarPrivate({toggleSidebar}:any) {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [isLoading, setIsLoading] = useState(Boolean);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('')
  const params = usePathname();
  const [photo, setPhoto] = useState('');

  const getInformationuser = () => {
    setIsLoading(true);
    let list = new Rest();
    list.get('auth/user-profile')
    .then((responseData:any) => {
      setIsLoading(false);
      setmsgApi(responseData.msg);
      if(responseData.success == true) {
        if(responseData.data.original.typeuser_id === 1) {
          router.push('/site/login');
        } else {
          setPhoto(responseData.data.original.photo_profile);
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
  }, []);

  return (
    <div className="sidebar bg-grey-9">
      {isLoading === true ?  <Loading></Loading> : null}

      <ModalError 
        showModalError={showModalError}
        setShowModalError={setShowModalError}
        msgApi={msgApi}
      ></ModalError>

      <button type="button" className="btn d-table d-lg-none fz-26 me-2 ms-auto mt-2 text-dark" onClick={() => {toggleSidebar(), setShowSidebar(true)}}>
        <i className="fa-solid fa-xmark"></i>
      </button>

      <div className="profile-sidebar p-3 p-md-4 p-xl-5 line-height-normal">
        <div className="img">
        {photo ? (
          <Image 
            src={process.env.NEXT_PUBLIC_API + photo}
            alt="Descripción de la imagen"
            width={700}
            height={700}
          />
        ) : (
          <img src={`${process.env.NEXT_PUBLIC_SERVE}/assets/images/seller.png`} />
        )}
        </div>
        <div className="text ps-2 ps-sm-3 ps-md-4">
          <Link href="/private/profile" className="d-block text-orange-2 fw-700 fz-16 fz-sm-18 fz-md-20">Ver perfil</Link>
        </div>
      </div>

      <div className="content">
        <ul className="list-menu m-0 p-0 list-unstyled">
          <li>
            <Link href="/private/profile/ads/create" className={`btn px-0 py-2 px-3 px-md-4 px-xl-5  ${params === '/private/profile/ads/create' ? 'active' : ''}`}>
              <div className="icon fz-28">
                <i className="fa-solid fa-plus"></i>
              </div>
              Publicar anuncio
            </Link>
          </li>
          <li>
            <Link href="/private/profile/ads/list" className={`btn px-0 py-2 px-3 px-md-4 px-xl-5  ${params === '/private/profile/ads/list' ? 'active' : ''}`}>
              <div className="icon fz-28">
                <i className="fa-solid fa-bullhorn"></i>
              </div>
              Mis anuncios
            </Link>
          </li>
          <li>
            <Link href="/private/profile/favorites" className={`btn px-0 py-2 px-3 px-md-4 px-xl-5  ${params === '/private/profile/favorites' ? 'active' : ''}`}>
              <div className="icon fz-28">
                <i className="fa-regular fa-heart"></i>
              </div>
              Mis favoritos
            </Link>
          </li>
          <li>
            <Link href="/private/profile/edit" className={`btn px-0 py-2 px-3 px-md-4 px-xl-5  ${params === '/private/profile/edit' ? 'active' : ''}`}>
              <div className="icon fz-28">
                <i className="fa-solid fa-pencil"></i>
              </div>
              Editar perfil
            </Link>
          </li>

          <LogoutButton />
        </ul>
      </div>
    </div>
  )
}