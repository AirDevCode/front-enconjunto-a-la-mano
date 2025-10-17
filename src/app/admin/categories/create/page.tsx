'use client';
import Rest from '@/libs/rest';
import Admin from '@/theme/admin';
import React, { useState } from 'react';
import FormCategory from '../_components/formCategory';
import Loading from '@/app/_components/loading';
import ModalSuccess from '@/app/_components/modalSuccess';
import ModalError from '@/app/_components/modalError';

export default function AdminCategoriesCreate() {
  const [isLoading, setIsLoading] = useState(Boolean);
  const [isUpdate, setIsUpdate]    = useState(false);

  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');

  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showButtonCloseModal, setShowButtonCloseModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');

  const handleSubmit = (event:any) => {
    event.preventDefault();
    setIsLoading(true);

    let save = new Rest();
    save.post('category/save',{'name': name,'icon': icon})
    .then((responseData:any) => {
      setIsLoading(false);
      setmsgApi(responseData.msg);
      if(responseData.success == true) {
        setName('');
        setIcon('');
        setShowModalSuccess(true);
        setShowButtonCloseModal(true);
      } else {
        setShowModalError(true);
      }
    }).catch((error) => {console.error('Wrong:', error);})
    
  }

  const deleteCategory = () => {}
  
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

        <div className="bg-white py-4 py-sm-5">
          <div className="container py-md-3">
            <h4 className="mb-4 mb-lg-5 baloo fw-400 fz-26 text-grey-6">Administrador / <span className="text-success">Crear categoría</span></h4>
            
            <h1 className="mb-4 text-orange-1 baloo text-uppercase fw-400 fz-18 fz-sm-28 fz-md-38">Crear categoría</h1>

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