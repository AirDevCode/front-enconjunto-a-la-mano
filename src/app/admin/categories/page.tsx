'use client';
import Admin from '@/theme/admin';
import React, { useEffect, useState } from 'react';
import Rest from '@/libs/rest';
import Link from 'next/link';
import ListCategories from './_components/listCategories';
import Loading from '@/app/_components/loading';
import ModalDelete from '@/app/_components/modalDelete';

export default function AdminCategoriesList() {
const [categoryId, setCategoryId] = useState(0);
const [apiGetCategories, setApiGetCategories] =  useState([]);
const [isLoading, setIsLoading] = useState(Boolean);

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
  if(responseData.success == true ){
    setCurrentPage(responseData.data.current_page);
    setPaginatorData({
      current_page: responseData.data.current_page,
      last_page: responseData.data.last_page,
      next_page_url: responseData.data.next_page_url,
      prev_page_url: responseData.data.prev_page_url,
     });
     setStateFunction(responseData.data.data);
  }else{
      //alert(responseData.msg);
  }}).catch((error) => {
      console.error('Wrong:', error);
    });
};


const permanentlyDelete = () => {
  let remove = new Rest();
  setIsLoading(true);
  remove.delete('category/remove/'+categoryId)
  .then((responseData:any) => {
    setIsLoading(false);
    if(responseData.success == true){
      setShowModalDelete(false)
      fetchData('category/list-with-pagination',setApiGetCategories);
    }
  }).catch((error) => {console.error('Wrong:', error);})
}
const deleteCategory = (deleteCategory:number) => {
  setShowModalDelete(true);
  setCategoryId(deleteCategory);
};



useEffect(() => {
  loadPage(1);
  fetchData('category/list-with-pagination',setApiGetCategories);
},[]);

const loadPage = (page:number) => {
  fetchData('category/list-with-pagination/?page='+page,setApiGetCategories);
  setCurrentPage(page);
};

const excelDowloand = () => {
  const downloadLink = process.env.NEXT_PUBLIC_API + 'categorias/dowloand-excel';
  window.location.href = downloadLink;
}

return (
  <Admin>
    <div className="px-md-4 px-lg-5">
      {isLoading === true ?  <Loading /> : null}
      <ModalDelete 
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        permanentlyDelete={permanentlyDelete}
        msg={'esta categoría'}
      />

      <div className="bg-white py-4 py-sm-5">
        <div className="container py-md-3">
          <h4 className="mb-4 mb-lg-5 baloo fw-400 fz-26 text-grey-6">Administrador / <span className="text-success">Listado de categorías</span></h4>

          <h1 className="mt-0 mb-4 mb-lg-5 baloo fw-400 fz-30 fz-sm-36 fz-md-40 text-orange-1 text-center">Listado de <span className="text-grey-6">categorías</span></h1>

          <div className="row">
            <div className="col-sm-6 mb-4">
              <Link href={{ pathname: "/admin/categories/create" }} className="btn btn-orange-1 d-table mx-auto ms-sm-0 baloo text-uppercase fw-400 fz-18 pb-1 px-4 rounded">Agregar nueva categoría</Link>
            </div>
            <div className="col-sm-6 mb-4">
              <button type="button" onClick={() => excelDowloand()} className="btn btn-orange-1 d-table mx-auto me-sm-0 baloo text-uppercase fw-400 fz-18 pb-1 px-4 rounded">Descargar CSV</button>
            </div>
          </div>

          <ListCategories 
            apiGetCategories={apiGetCategories} 
            deleteCategory={deleteCategory}
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