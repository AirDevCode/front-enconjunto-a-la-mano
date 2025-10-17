'use client';
import ModalError from '@/app/_components/modalError';
import { LOGIN } from '@/constants/login';
import Rest from '@/libs/rest';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function ThemeHeader({toggleSidebar}:any) {
  const [apiCategoryData, setApiCategoryData] = useState([]);
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [subMenu, setSubMenu] = React.useState(false);
  const [menu, setMenu] = React.useState(false);

  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');
  const router = useRouter();
  const location = usePathname();

  const toggleMenu = (event:any) => {
    event.preventDefault();

    if(menu) {
      setMenu(false);

    } else {
      setMenu(true);
    }
  }

  const toggleSubmenu = (event:any) => {
    event.preventDefault();

    if(subMenu) {
      setSubMenu(false);

    } else {
      setSubMenu(true);
    }
  }

  const listCategories = () => {
    let listEnsambles = new Rest();
    listEnsambles.get('category/list')
    .then((responseData:any) => {
      setApiCategoryData(responseData.data);
    }).catch((error) => {console.error('Wrong:', error);})
  }

  const auth = () => {
    setShowModalError(true);
    setmsgApi("Por favor, inicia sesión para completar esta acción.");
    return false;
  }

  useEffect(() => {
    listCategories();

    // console.log(location.split('/')[1]);
  }, []);

  const handleLinkClick = (category_id:number) => {
    router.push('/site/product/category?search=12'+category_id);

    // Recargar la página
  };

  return (
    <header className="bg-white header shadow">
      <ModalError showModalError={showModalError} setShowModalError={setShowModalError} msgApi={msgApi}></ModalError>

      <nav className="navbar-expand-lg py-2 py-lg-0 px-0">
        <div className="container d-block">
          <div className="row align-items-center justify-content-between">
            <div className="col-6 col-md-3 col-lg-2">
              <a href="https://www.enconjuntoalamano.com" className="custom-logo-link d-block">
                <img src={`${process.env.NEXT_PUBLIC_SERVE}/assets/images/logo.png`} />
              </a>
            </div>
            <div className="col-6 d-flex d-lg-none">
              {!LOGIN.TOKEN ? (
                <button className="navbar-toggler clase-prueba-de-git-public text-orange-1 fz-26 py-0 d-flex ms-auto" type="button" data-bs-toggle="collapse" onClick={() => {toggleMenu(event)}}>
                  <i className="fa-solid fa-bars"></i>
                </button>
              ) : (
              <>
                {location.split('/')[1] === 'site' && LOGIN?.TOKEN &&
                  <button className="navbar-toggler clase-prueba-de-git-private-token text-orange-1 fz-26 py-0 pr-2 d-flex ms-auto" type="button" data-bs-toggle="collapse" onClick={() => {toggleMenu(event)}}>
                    <i className="fa-solid fa-bars"></i>
                  </button>
                }
                
                {location.split('/')[1] !== 'site' && LOGIN?.TOKEN &&
                <button className="navbar-toggler clase-prueba-de-git-private-nav text-orange-1 fz-26 py-0 pr-2 d-flex ms-auto" type="button" data-bs-toggle="collapse" onClick={() => {toggleSidebar(), setShowSidebar(false)}}>
                  <i className="fa-solid fa-bars"></i>
                </button>
                }
              </>
              )}
            </div>
            <div className="col-12 col-lg-10">
              <div className={classNames(menu ? 'show' : '', 'collapse navbar-collapse my-0 d-lg-block')} id="desplegar">
                <div className="row align-items-center">
                  <div className="col-lg-8 col-xl-6">
                    <ul className="navbar-nav navbar-menu mx-auto fw-400 fz-12">
                      <li className="menu-item">
                        <a href="https://www.enconjuntoalamano.com">Inicio</a>
                      </li>
                      <li className="menu-item">
                        <a href="https://www.enconjuntoalamano.com/acerca-de">Acerca de</a>
                      </li>
                      <li className="menu-item menu-item-has-children">
                        <a href="" onClick={() => {toggleSubmenu(event)}}>Categorías</a>

                        <ul className={classNames(subMenu ? 'show' : '', 'sub-menu')}>
                          {apiCategoryData.map((category: any, index: number) => (
                            <li key={index}>
                              <a href={`${process.env.NEXT_PUBLIC_SERVE}/site/product/category?search=${category.category_id}`}>

                              {category.category_name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="menu-item">
                        <a href="https://www.enconjuntoalamano.com/blog">Blog</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-4 col-xl-6">
                    <div className="w-100">
                      {!LOGIN.TOKEN || LOGIN.TOKEN  == null || LOGIN.TOKEN == undefined ? (
                      <div className="d-flex align-items-center justify-content-between justify-content-lg-end flex-wrap">
                        <Link href="/site/register" className="btn btn-outline-orange m-2 m-lg-0">Regístrate</Link>
                        <Link href="/site/login" className="btn btn-outline-orange m-2 my-lg-0 me-lg-0 ms-xl-3">Iniciar sesión</Link>
                      </div>
                      ) : null}

                      {LOGIN.TOKEN && LOGIN.TYPEUSER == '2' && location.split('/')[1] === 'site' ? (
                      <div className="d-flex align-items-center justify-content-center justify-content-lg-end flex-wrap">
                        <Link href="/private/profile" className="btn btn-gradient-orange m-2 m-lg-0 ms-lg-auto">Ver perfil</Link>
                      </div>
                      ) : null}

                      {LOGIN.TOKEN && LOGIN.TYPEUSER == '1' && location.split('/')[1] === 'site' ? (
                      <div className="d-flex align-items-center justify-content-center justify-content-lg-end flex-wrap">
                        <Link href="/admin" className="btn btn-gradient-orange m-2 m-lg-0 ms-lg-auto">Ver perfil</Link>
                      </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}