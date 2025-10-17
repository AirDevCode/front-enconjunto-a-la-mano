'use client';
import Loading from '@/app/_components/loading';
import Rest from '@/libs/rest';
import Admin from '@/theme/admin';
import React, { useState } from 'react';
import FormSet from '../_components/formSet';
import ModalSuccess from '@/app/_components/modalSuccess';
import ModalError from '@/app/_components/modalError';

export default function AdminSetsCreate() {
  const [isLoading, setIsLoading] = useState(Boolean);
  const [name, setName] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showButtonCloseModal, setShowButtonCloseModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');

  const handleSubmit = (event:any) => {
    let save = new Rest();
    setIsLoading(true);

    save.post('ensemble/save',{'name': name})
    .then((responseData:any) => {
      setIsLoading(false);
      setmsgApi(responseData.msg);
      if(responseData.success == true) {
         setName('');
         setShowModalSuccess(true);
         setShowButtonCloseModal(true);
      } else {
        setShowModalError(true);
      }
    }).catch((error) => {console.error('Wrong:', error);})
    event.preventDefault();
  }

  const deleteSet = (setId:number) => {};

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
            <h4 className="mb-4 mb-lg-5 baloo fw-400 fz-26 text-grey-6">Administrador / <span className="text-success">Crear conjunto</span></h4>
            <h1 className="mb-4 text-orange-1 baloo text-uppercase fw-400 fz-18 fz-sm-28 fz-md-38">Crear conjunto</h1>

             <FormSet
              handleSubmit={handleSubmit}
              name={name} setName={setName}
              deleteSet={deleteSet}
              isEdit={isEdit}
            />
          </div>
        </div>
      </div>
    </Admin>
  )
}