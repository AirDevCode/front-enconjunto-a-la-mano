'use client';
import Admin from '@/theme/admin';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Rest from '@/libs/rest';
import FormCategory from '../_components/formCategory';
import Loading from '@/app/_components/loading';
import ModalSuccess from '@/app/_components/modalSuccess';
import ModalError from '@/app/_components/modalError';
import ModalDelete from '@/app/_components/modalDelete';

export default function AdminCategoriesEdit() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const [isLoading, setIsLoading] = useState(Boolean);
  const [isUpdate, setIsUpdate]    = useState(true);

  const [name, setName] = useState('');
  const [category_id, setCategoryId] = useState();
  const [icon, setIcon] = useState('');
  const [iconShow, setIconShow] = useState('');

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showButtonCloseModal, setShowButtonCloseModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');
  
  
  const permanentlyDelete = () => {
    let remove = new Rest();
    setIsLoading(true);
    remove.delete('category/remove/'+search)
    .then((responseData:any) => {
      setIsLoading(false);
      if(responseData.success == true) {
        setShowModalDelete(false);
        router.push('/admin/categories');
      }
    }).catch((error) => {console.error('Wrong:', error);})
  }

  const deleteCategory = () => {
    setShowModalDelete(true);
  };

  const informationCategory = () => {
    let information = new Rest();
    setIsLoading(true);
    information.get('category/get-information/'+search)
    .then((responseData:any) => {
      setIsLoading(false);
      if(responseData.success == true) {
        setName(responseData.data.name);
        setIcon(responseData.data.icon);
        setCategoryId(responseData.data.category_id);
        setIconShow(responseData.data.route);
      }
    }).catch((error) => {console.error('Wrong:', error);})
  }

  const handleSubmit = (event:any) => {
    let save = new Rest();
    setIsLoading(true);
    save.put('category/update/'+search,{'name': name,'icon': icon})
    .then((responseData:any) => {
      setIsLoading(false);
      setmsgApi(responseData.msg);
      if(responseData.success == true) {
        setShowModalSuccess(true);
        setShowButtonCloseModal(true);
      } else {
        setShowModalError(true);
      }

    }).catch((error) => {console.error('Wrong:', error);})
    event.preventDefault();
  }

  useEffect(() => {
    informationCategory();
  },[]);

  const handleFileChange  = async (e:any) => {
    e.preventDefault();

    setIsLoading(true);
    let file = new Rest();
    file.file('resource/save-file',e.target.files[0],'categories')
    .then((responseData:any) => {
      setIsLoading(false);
      if(responseData.success == true) {
        setIcon(responseData.data.rutaFin);
        e.target.value = null;
      } else {
        setmsgApi(responseData.msg);
        setShowModalError(true);
        //alert(responseData.msg);
      }
    }).catch((error) => {
      console.error('Wrong:', error);
    })
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

        <ModalDelete 
          showModalDelete={showModalDelete}
          setShowModalDelete={setShowModalDelete}
          permanentlyDelete={permanentlyDelete}
          msg={'esta categoría'}
        />

        <div className="bg-white py-4 py-sm-5">
          <div className="container py-md-3">
            <h4 className="mb-4 mb-lg-5 baloo fw-400 fz-26 text-grey-6">Administrador / <span className="text-success">Editar categoría</span></h4>
            <h1 className="mb-4 text-orange-1 baloo text-uppercase fw-400 fz-18 fz-sm-28 fz-md-38">Editar categoría</h1>

            <FormCategory
              handleSubmit={handleSubmit}
              name={name}setName={setName}
              icon={icon}
              deleteCategory={deleteCategory}
              isUpdate={isUpdate}
              handleFileChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </Admin>
  )
}