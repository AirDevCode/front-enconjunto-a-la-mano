'use client';
import Private from '@/theme/private';
import React, { useEffect, useState } from 'react';
import Rest from '@/libs/rest';
import Image from 'next/image';
import Link from 'next/link';
import Paginator from '@/app/_components/paginator';
import Loading from '@/app/_components/loading';
import ModalError from '@/app/_components/modalError';

export default function PrivateAdsList() {
  const [apiGetAds, setApiAds] = useState([]);

  const [paginatorData, setPaginatorData] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: '',
    prev_page_url: null,
  });
  const [currentPage, setCurrentPage] = useState(paginatorData.current_page);
  const [isLoading, setIsLoading] = useState(Boolean);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');

  const fetchData = (url: string, setStateFunction: Function) => {
    setIsLoading(true);
    let list = new Rest();
    list.get(url).then((responseData: any) => {
    setIsLoading(false);
    setmsgApi(responseData.msg);
    if(responseData.success == true ) {
      setCurrentPage(responseData.data.current_page);
      setPaginatorData({
        current_page: responseData.data.current_page,
        last_page: responseData.data.last_page,
        next_page_url: responseData.data.next_page_url,
        prev_page_url: responseData.data.prev_page_url,
       });
       setStateFunction(responseData.data.data);
    }else{
      setShowModalError(true);
    }
    }).catch((error) => {
          console.error('Wrong:', error);
      });
  };

  useEffect(() => {
    loadPage(1);
    fetchData('advertisement/all-that-have-been-registered-byuser-logged',setApiAds);
  },[]);

  const loadPage = (page:number) => {
    fetchData('advertisement/all-that-have-been-registered-byuser-logged/?page='+page,setApiAds);
    setCurrentPage(page);
  };

  return (
    <Private>
      <div className="px-md-4 px-lg-5">
        {isLoading === true ?  <Loading></Loading> : null}
        <ModalError 
            showModalError={showModalError}
            setShowModalError={setShowModalError}
            msgApi={msgApi}
        />

        <div className="bg-white py-4 py-sm-5">
          <div className="container py-md-3">
            <h4 className="mb-4 mb-lg-5 baloo fw-400 fz-26 text-grey-6">Perfil / <span className="text-success">Mis anuncios</span></h4> 
            <div className="row">
              {apiGetAds.length > 0 ? (
                apiGetAds.map((data: any) => (
                  <div className="col-sm-6 col-lg-4 mb-3 mb-md-4 mb-lg-5" key={data.advertisement_id}>
                    <div className="box-anuncio">
                      {data.first_photo ? (
                      <div className="img">
                        <Image src={data.first_photo} alt="Descripción de la imagen" width={500} height={500} />
                      </div>
                      ) : null}
                      <div className="info p-2 p-sm-3 py-lg-4">
                      <Link href={{ pathname: '/site/product/single', query: { search: data.advertisement_id }, }}>
                         <h4 className="my-0 fw-700 fz-20 fz-sm-24 fz-md-28 text-dark title text-capitalize">{data.name}</h4>
                      </Link>
                        <div className="d-table me-auto mt-1">
                          <span className="cat fz-12 d-flex align-items-center fz-12 fw-600 text-orange-1 py-1 px-3">
                            <span className="icon me-2">
                            {data.category_icon ? (
                              <Image src={data.category_icon} alt="Descripción de la imagen" width={500} height={500} />
                            ) : (
                              <p className="my-0 text-center fz-14">No se ha proporcionado una URL de imagen válida</p>
                            )}
                            </span>
                            {data.category_name}
                          </span>
                        </div>
                        <p className="price fw-300 text-black mt-3 mb-0 fz-18 fz-md-26">${data.total_format}</p>
                        <div className="general-text mt-2 fz-14 fw-400 text-black">{data.description}</div>
                        <div className="general-text mt-2 fz-14 fw-400 text-black" >
                          {data.itisaprovedbytheadm ? (
                            <p className="alert alert-success my-0">¡Aprobado por el administrador!</p>
                          ) : (
                            <p className="alert alert-danger my-0">En espera de aprobación por parte del administrador.</p>
                          )}
                        </div>
                        <div className="d-table mx-auto mt-3 mt-md-4">
                          <Link href={{ pathname: '/private/profile/ads/edit', query: { search: data.advertisement_id }, }} className="btn btn-orange-1 baloo fw-400 pb-1 px-4 fz-16 fz-md-18 text-uppercase">
                            Editar anuncio
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                  <div className="no-data-message">
                      No hay anuncios disponibles.
                  </div>
              )}
            </div>
            {apiGetAds.length > 0 && (
                <Paginator loadPage={loadPage}paginatorData={paginatorData}currentPage={currentPage}></Paginator>
              )}
          </div>
        </div>
      </div>
    </Private>
  )
}