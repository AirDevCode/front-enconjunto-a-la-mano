'use client';
import Admin from '@/theme/admin';
import React, { useEffect, useState } from 'react';
import ListSellers from './_components/listSellers';
import FilterSeller from './_components/filterSeller';
import Rest from '@/libs/rest';
import Loading from '@/app/_components/loading';
import ModalError from '@/app/_components/modalError';

export default function AdminSellersList() {
  const [getTotalRegistered, setGetTotalRegistered] =  useState(0);
  const [apiGetSellers, setApiGetSellers] =  useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [nameFilter, setNameFilter] =  useState('');

  const [isLoading, setIsLoading] = useState(Boolean);
  const [paginatorData, setPaginatorData] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: '',
    prev_page_url: null,
  });

  const [currentPage, setCurrentPage] = useState(paginatorData.current_page);
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
      } else {
        setShowModalError(true);
      }
    }).catch((error) => {
      console.error('Wrong:', error);
    });
  };

  const totalRegistered = () => {
    let list = new Rest();
    list.get('seller/total-registered')
    .then((responseData:any) => {
      setGetTotalRegistered(responseData.data);
    }).catch((error) => {console.error('Wrong:', error);})
  }

  const handleSubmitFilter = (event:any) => {
    fetchData('seller/list-all-or-search/?name='+nameFilter+'&filter='+selectedFilter,setApiGetSellers);
    event.preventDefault();
  }

  useEffect(() => {
    loadPage(1);
    totalRegistered();
    fetchData('seller/list-all-or-search/?name='+nameFilter+'&filter='+selectedFilter,setApiGetSellers);
  }, []);

  const loadPage = (page:number) => {
    fetchData('seller/list-all-or-search/?name='+nameFilter+'&filter='+selectedFilter+'&page='+page,setApiGetSellers);
    setCurrentPage(page);
  };

  const excelDowloand = () => {
    const downloadLink = process.env.NEXT_PUBLIC_API + 'seller/dowloand-excel';
    window.location.href = downloadLink;
  }

  return (
    <Admin>
      <div className="px-md-4 px-lg-5">
        {isLoading === true ?  <Loading /> : null}

        <ModalError 
            showModalError={showModalError}
            setShowModalError={setShowModalError}
            msgApi={msgApi}
          />

        <div className="bg-white py-4 py-sm-5">
          <div className="container py-md-3">
            <h4 className="mb-4 mb-lg-5 baloo fw-400 fz-26 text-grey-6">Administrador / <span className="text-success">Listado de vendedores</span></h4>

            <h3 className="my-0 text-black baloo fw-400 fz-20 fz-sm-24 fz-md-28">Listado de vendedores</h3>
          </div>
        </div>
      </div>

      <FilterSeller 
        handleSubmitFilter={handleSubmitFilter} 
        nameFilter={nameFilter} setNameFilter={setNameFilter} 
        selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}
        getTotalRegistered={getTotalRegistered}
        excelDowloand={excelDowloand}
      />

      <ListSellers 
        apiGetSellers={apiGetSellers}
        loadPage={loadPage}
        paginatorData={paginatorData}
        currentPage={currentPage}
      />
    </Admin>
  )
}