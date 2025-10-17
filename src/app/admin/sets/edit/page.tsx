'use client';
import Admin from '@/theme/admin';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Rest from '@/libs/rest';
import Loading from '@/app/_components/loading';
import FormSet from '../_components/formSet';
import ModalSuccess from '@/app/_components/modalSuccess';
import ModalError from '@/app/_components/modalError';
import ModalDelete from '@/app/_components/modalDelete';

export default function AdminSetsEdit() {

  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(Boolean);
  const [ensemble_id, setEnsembleId] = useState('');
  const [isEdit, setIsEdit] = useState(true);

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showButtonCloseModal, setShowButtonCloseModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');

  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('search')


 

  const informationSet = () => {
    let information = new Rest();
    setIsLoading(true);
    information.get('ensemble/information/'+search)
    .then((responseData:any) => {
      if(responseData.success == true){
        setIsLoading(false);
        setName(responseData.data.name);
        setEnsembleId(responseData.data.ensemble_id);
      }
    }).catch((error) => {console.error('Wrong:', error);})
  }
  
  useEffect(() => {
    informationSet();
  },[]);

  const handleSubmit = (event:any) => {
    let update = new Rest();
    setIsLoading(true);
    update.put('ensemble/update/'+search,{'name': name})
    .then((responseData:any) => {
      setIsLoading(false);
      setmsgApi(responseData.msg);
      if(responseData.success == true){
        setIsLoading(false);
        setShowModalSuccess(true);
        setShowButtonCloseModal(true);
      }else{
        setShowModalError(true);
      }
    }).catch((error) => {console.error('Wrong:', error);})
    event.preventDefault();
  }

  const permanentlyDelete = () => {
    let remove = new Rest();
    setIsLoading(true);
    remove.delete('ensemble/remove/'+search)
    .then((responseData:any) => {
      if(responseData.success == true){
        setIsLoading(false);
        setShowModalDelete(false);
        router.push('/admin/sets');
      }
    }).catch((error) => {console.error('Wrong:', error);})
  }
  const deleteSet = () => {
    setShowModalDelete(true);
  };

  return (
    <Admin>
      <div className="px-md-4 px-lg-5">
      {isLoading === true ?  <Loading></Loading> : null}

      <ModalSuccess 
          showModalSuccess={showModalSuccess} setShowModalSuccess={setShowModalSuccess}
          showButtonCloseModal={showButtonCloseModal}
          msgApi={msgApi}
        ></ModalSuccess>

        <ModalError 
          showModalError={showModalError}
          setShowModalError={setShowModalError}
          msgApi={msgApi}
        ></ModalError>
        
        <ModalDelete 
          showModalDelete={showModalDelete}
          setShowModalDelete={setShowModalDelete}
          permanentlyDelete={permanentlyDelete}
          msg={'este conjunto'}
        />

        <div className="bg-white py-4 py-sm-5">
          <div className="container py-md-3">
            <h4 className="mb-4 mb-lg-5 baloo fw-400 fz-26 text-grey-6">Administrador / <span className="text-success">Editar conjunto</span></h4>

            <h1 className="mb-4 text-orange-1 baloo text-uppercase fw-400 fz-18 fz-sm-28 fz-md-38">Editar conjunto</h1>
            <FormSet
              handleSubmit={handleSubmit}
              name={name} setName={setName}
              deleteSet={deleteSet}
              isEdit={isEdit}
            ></FormSet>
            
          </div>
        </div>
      </div>
    </Admin>
  )
}