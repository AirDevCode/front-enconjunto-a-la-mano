'use client';
import Private from '@/theme/private';
import React, { useEffect, useState } from 'react';
import Rest from '@/libs/rest';
import Image from 'next/image';
import Loading from '@/app/_components/loading';
import Paginator from '@/app/_components/paginator';
import ModalDelete from '@/app/_components/modalDelete';
import Link from 'next/link';
import ButttonWhatsAppShare from '@/app/_components/butttonWhatsAppShare';

export default function PrivateFavorites() {
  const [msgApi, setmsgApi] = useState('');
  const [idFavourite, setApiIdFavourite,] = useState(0);
  const [apiGetLastestAds, setApiLastestAds] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean);
  const [paginatorData, setPaginatorData] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: '',
    prev_page_url: null,
  });
  const [currentPage, setCurrentPage] = useState(paginatorData.current_page);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const fetchData = (url: string, setStateFunction: Function) => {
    setIsLoading(true);
    let list = new Rest();
    list.get(url).then((responseData: any) => {
    setIsLoading(false);
    if(responseData.success == true) {
      setCurrentPage(responseData.data.current_page);
      setPaginatorData({
        current_page: responseData.data.current_page,
        last_page: responseData.data.last_page,
        next_page_url: responseData.data.next_page_url,
        prev_page_url: responseData.data.prev_page_url,
       });
       setStateFunction(responseData.data.data);
    } else {
      setStateFunction([]);
      //alert(responseData.msg);
    }
    }).catch((error) => {
      console.error('Wrong:', error);
    });
  };

  const permanentlyDelete = () => {
    let remove = new Rest();
    setIsLoading(true);
    remove.delete('favorite/delete/'+idFavourite)
    .then((responseData:any) => {
      setIsLoading(false);
      if(responseData.success == true) {
        setShowModalDelete(false);
        fetchData('favorite/get-allby-user-logged',setApiLastestAds);
      }
    }).catch((error) => {console.error('Wrong:', error);})
  }

  const onclicldDelete = (favouriteId:number) => {
    setShowModalDelete(true);
    setApiIdFavourite(favouriteId);
  };

  useEffect(() => {
    loadPage(1);
    fetchData('favorite/get-allby-user-logged',setApiLastestAds);
  },[]);

  const loadPage = (page:number) => {
    fetchData('favorite/get-allby-user-logged/?page='+page,setApiLastestAds);
    setCurrentPage(page);
  };

  const handleWhatsAppShare = (phone:string,productId:number) => {
    const currentUrl = process.env.NEXT_PUBLIC_SERVE + "site/product/single?search="+productId;
    const message = encodeURIComponent(`¡Hola! Estoy interesado/a en el siguiente producto : ${currentUrl}`);
    const whatsappLink = `https://wa.me/${phone}?text=${message}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <Private>
      <div className="px-md-4 px-lg-5">
      {isLoading === true ?  <Loading></Loading> : null}
        <ModalDelete 
          showModalDelete={showModalDelete}
          setShowModalDelete={setShowModalDelete}
          permanentlyDelete={permanentlyDelete}
          msg={'este anuncio'}
        />

        <div className="bg-white py-4 py-sm-5">
          <div className="container py-md-3">
            <h4 className="mb-4 mb-lg-5 baloo fw-400 fz-26 text-grey-6">Perfil / <span className="text-success">Anuncios favoritos</span></h4>
            <h1 className="mt-0 mb-4 mb-lg-5 baloo fw-400 fz-30 fz-sm-36 fz-md-40 text-orange-1 text-center">Anuncios <span className="text-grey-6">favoritos</span></h1>
            <div className="row">
              {apiGetLastestAds.length > 0 ? (
                apiGetLastestAds.map((data: any) => (
                  <div className="col-sm-6 col-lg-4 mb-3 mb-md-4 mb-lg-5" key={data.favorite_id}>
                    <div className="box-anuncio">
                      <div className="img">
                        <button className="btn favourite" style={{ backgroundColor: 'white', color: 'green' }} onClick={() => onclicldDelete(data.favorite_id)}>
                          <i className="fa-regular fa-heart fa-solid"></i>
                        </button>
                        <Link href={{ pathname: '/site/product/single', query: { search: data.advertisement_id } }}>
                          {data.photos && data.photos.length > 0 ? (
                            <Image
                              src={process.env.NEXT_PUBLIC_API+data.photos[0].file}
                              alt="Descripción de la imagen"
                              width={500}
                              height={500}
                              style={{ width: '100%', height: 'auto' }}
                            />
                          ) : null}
                        </Link>
                      </div>
                      <div className="info p-2 p-sm-3 py-lg-4">
                      <Link href={{ pathname: '/site/product/single', query: { search: data.advertisement.advertisement_id }, }}>
                          <h4 className="my-0 fw-700 fz-20 fz-sm-24 fz-md-28 text-dark title text-capitalize">{data.advertisement.name}</h4>
                      </Link>
                      <Link href={{ pathname: '/site/product/category', query: { search: data.advertisement.category_id }, }}>
                          <div className="d-table me-auto mt-1">
                            <span className="cat fz-12 d-flex align-items-center fz-12 fw-600 text-orange-1 py-1 px-3">
                            
                            {data.advertisement.category.icon ? (
                            <span className="icon me-2">
                              <Image
                                src={process.env.NEXT_PUBLIC_API + data.advertisement.category.icon}
                                alt="Descripción de la imagen"
                                width={500}
                                height={500}
                                style={{ width: '100%', height: 'auto' }}
                              />
                            </span>
                            ) : null}
                              
                                {data.advertisement.category.name}
                              
                              
                            </span>
                          </div>
                        </Link>
                        <Link href={{ pathname: '/site/product/single', query: { search: data.advertisement_id } }}>
                        <p className="price fw-300 text-black mt-3 mb-0 fz-18 fz-md-26">${data.advertisement.total_format}</p>

                        <div className="general-text mt-2 fz-14 fw-400 text-black">
                          {data.advertisement.description} 
                        </div>
                        </Link>
                        <ButttonWhatsAppShare 
                          phone={data.advertisement.seller.number_phone} 
                          productId={data.advertisement.advertisement_id} 
                          productName={data.advertisement.name}
                          businessName={data.advertisement.seller.name}
                      ></ButttonWhatsAppShare>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                  <div className="no-data-message">
                      No hay datos disponibles.
                  </div>
              )}
            </div>

            {apiGetLastestAds.length > 0 && (
                <Paginator loadPage={loadPage} paginatorData={paginatorData}currentPage={currentPage}></Paginator>
              )}
          </div>
        </div>
      </div>
    </Private>
  )
}