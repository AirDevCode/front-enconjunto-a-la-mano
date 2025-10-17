'use client';
import Admin from '@/theme/admin';
import React, { useEffect, useState } from 'react';
import Rest from '@/libs/rest';
import FormFilterSet from './_components/formFilterSet';
import ListSets from './_components/listSets';
import Loading from '@/app/_components/loading';
import ModalError from '@/app/_components/modalError';
import ModalDelete from '@/app/_components/modalDelete';

export default function AdminSetsList() {
  const [apiGetSets, setApiGetSets] =  useState([]);
  const [isLoading, setIsLoading] = useState(Boolean);
  const [filter, setFilter] = useState('');
  const [idSet, setIdSet] =  useState(0);

  const [paginatorData, setPaginatorData] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: '',
    prev_page_url: null,
  });
  
  const [currentPage, setCurrentPage] = useState(paginatorData.current_page);

  const [showModalDelete, setShowModalDelete] = useState(false);
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

  const permanentlyDelete = () => {
    let remove = new Rest();
    setIsLoading(true);
    remove.delete('ensemble/remove/'+idSet)
    .then((responseData:any) => {
      setIsLoading(false);
      if(responseData.success == true) {
        setShowModalDelete(false)
        fetchData('ensemble/list-by-search-pagination/everything',setApiGetSets);
      }
    }).catch((error) => {console.error('Wrong:', error);})
  }

  const deleteSet = (setId:number) => {
    setShowModalDelete(true);
    setIdSet(setId);
  };

  useEffect(() => {
    loadPage(1);
    let nameFilter = filter ? filter : 'everything';
    fetchData('ensemble/list-by-search-pagination/'+nameFilter,setApiGetSets);
  },[]);

  const handleSubmit = (event:any) => {
    filter ? fetchData('ensemble/list-by-search-pagination/'+filter,setApiGetSets): 
      fetchData('ensemble/list-by-search-pagination/everything',setApiGetSets);
  
    event.preventDefault();
  }

  const loadPage = (page:number) => {
    let nameFilter = filter ? filter : 'everything';
    fetchData('ensemble/list-by-search-pagination/'+nameFilter+'/?page='+page,setApiGetSets);
    setCurrentPage(page);
  };

  const excelDowloand = () => {
    const downloadLink = process.env.NEXT_PUBLIC_API + 'ensemble/dowloand-excel';
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
          <ModalDelete 
            showModalDelete={showModalDelete}
            setShowModalDelete={setShowModalDelete}
            permanentlyDelete={permanentlyDelete}
            msg={'este conjunto'}
          />

        <div className="bg-white py-4 py-sm-5">
          <div className="container py-md-3">
            <h4 className="mb-4 mb-lg-5 baloo fw-400 fz-26 text-grey-6">Administrador / <span className="text-success">Listado de conjuntos</span></h4>

            <h3 className="my-0 text-black baloo fw-400 fz-20 fz-sm-24 fz-md-28">Listado de conjuntos</h3>
          </div>
        </div>
      </div>

      <div className="breadcrumb m-0 border-0 rounded-0 py-5 px-md-4 px-lg-5">
        <div className="container py-sm-3">
          <div className="form-filter-banner p-3 px-md-4">
            <FormFilterSet
              handleSubmit={handleSubmit}
              filter={filter}setFilter={setFilter}
              excelDowloand={excelDowloand}
            />
          </div>
        </div>
      </div>

      <div className="px-md-4 px-lg-5">
        <div className="bg-white py-4 py-sm-5">
          <div className="container py-md-3">
            <ListSets 
              apiGetSets={apiGetSets} 
              deleteSet={deleteSet}
              loadPage={loadPage}
              paginatorData={paginatorData}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </Admin>
  )
}