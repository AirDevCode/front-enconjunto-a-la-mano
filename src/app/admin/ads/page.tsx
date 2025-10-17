'use client';
import Admin from '@/theme/admin';
import React, { useEffect, useState } from 'react';
import FormFilter from './_components/formFilter';
import ListAds from './_components/listAds';
import Loading from '@/app/_components/loading';
import Rest from '@/libs/rest';
import ModalSuccess from '@/app/_components/modalSuccess';
import ModalError from '@/app/_components/modalError';

export default function AdminAdsList() {
  const [getTotalRegistered, setGetTotalRegistered] =  useState(0);
  const [apiGetAds, setApiGetAds] =  useState([]);
  const [nameFilter, setNameFilter] =  useState('');
  const [selectedFilter, setSelectedFilter] =  useState('');

  const [isLoading, setIsLoading] = useState(Boolean);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showButtonCloseModal, setShowButtonCloseModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');

  const [paginatorData, setPaginatorData] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: '',
    prev_page_url: null,
  });

  const [currentPage, setCurrentPage] = useState(paginatorData.current_page);

  const totalRegistered = () => {
    let list = new Rest();
    list.get('advertisement/total-lastest-uploaded')
    .then((responseData:any) => {
      setGetTotalRegistered(responseData.data.total);
    }).catch((error) => {console.error('Wrong:', error);})
  }

  const fetchData = (url: string, setStateFunction: Function) => {
    setIsLoading(true);
    let list = new Rest();
    list.get(url).then((responseData: any) => {
      setIsLoading(false);
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
        setmsgApi(responseData.msg);
        setShowModalError(true);
      }
    }).catch((error) => {
        console.error('Wrong:', error);
    });
  };

  const handleSubmitFilter = (event:any) => {
    fetchData('advertisement/get-all-by-filter/?name='+nameFilter+'&filter='+selectedFilter,setApiGetAds);
    event.preventDefault();
  }

  useEffect(() => {
    loadPage(1);
    totalRegistered();
    fetchData('advertisement/get-all-by-filter/?name='+nameFilter+'&filter='+selectedFilter,setApiGetAds);
  },[])

  const loadPage = (page:number) => {
    fetchData('advertisement/get-all-by-filter/?name='+nameFilter+'&filter='+selectedFilter+'&page='+page,setApiGetAds);
    setCurrentPage(page);
  };

  const excelDowloand = () => {
    const downloadLink = process.env.NEXT_PUBLIC_API + 'ads/dowloand-excel';
    window.location.href = downloadLink;
  }

  

  return (
    <Admin>
      <div className="px-md-4 px-lg-5">
        {isLoading === true ?  <Loading /> : null}

        <ModalSuccess 
          showModalSuccess={showModalSuccess} setShowModalSuccess={setShowModalSuccess}
          showButtonCloseModal={showButtonCloseModal}
          msgApi={msgApi}
        />

        <ModalError 
          showModalError={showModalError}
          setShowModalError={setShowModalError}
          msgApi={msgApi}
        />
        
        <div className="bg-white py-4 py-sm-5">
          <div className="container py-md-3">
            <h4 className="mb-4 mb-lg-5 baloo fw-400 fz-26 text-grey-6">Administrador / <span className="text-success">Listado de anuncios</span></h4>

            <h3 className="my-0 text-black baloo fw-400 fz-20 fz-sm-24 fz-md-28">Listado de anuncios</h3>
          </div>
        </div>
      </div>

      <FormFilter 
        getTotalRegistered={getTotalRegistered}
        handleSubmitFilter={handleSubmitFilter}
        nameFilter={nameFilter}setNameFilter={setNameFilter}
        selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}
        excelDowloand={excelDowloand}
      />
      
      <ListAds
        apiGetAds={apiGetAds}
        loadPage={loadPage}
        paginatorData={paginatorData}
        currentPage={currentPage}
      />
    </Admin>
  )
}