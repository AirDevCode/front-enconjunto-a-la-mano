'use client';
import Admin from '@/theme/admin';
import React, { useEffect, useState } from 'react';
import FormEdit from './_components/formEdit';
import Rest from '@/libs/rest';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Loading from '@/app/_components/loading';
import ModalSuccess from '@/app/_components/modalSuccess';
import ModalError from '@/app/_components/modalError';
import ModalDelete from '@/app/_components/modalDelete';

type selectedEnsembles = string[];

export default function AdminSetsEdit() {
  const router = useRouter();
  				
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  const [city, setCity] =  useState('');
  const [cityId, setCityId] =  useState(0);
  const [apiGetEnsambles, setApiGetEnsambles] =  useState([]);
  const [selectedEnsembles, setSelectedEnsembles] = useState<selectedEnsembles>([]);

  const [isLoading, setIsLoading] = useState(Boolean);

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showButtonCloseModal, setShowButtonCloseModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');

  const getListAllEnsambles = () => {
    let list = new Rest();
    list.get('ensemble/list-by-search/everything')
    .then((responseData:any) => {
      setApiGetEnsambles(responseData.data);
    }).catch((error) => {console.error('Wrong:', error);})
  }

  const getInformationCity = () => {
    let list = new Rest();
    setIsLoading(true);
    list.get('city/get-information/'+search)
    .then((responseData:any) => {
      setIsLoading(false);
      setCity(responseData.data.name);
      setSelectedEnsembles(JSON.parse(responseData.data.ids_ensamble))
    }).catch((error) => {console.error('Wrong:', error);})
  }

  useEffect(() => {
    getListAllEnsambles();
    getInformationCity();
  },[]);

  const handleEnsembleSelection = (id:any) => {
    if (selectedEnsembles.includes(id)) {
      setSelectedEnsembles(selectedEnsembles.filter(option => option !== id));
    } else {
      setSelectedEnsembles([...selectedEnsembles, id]);
    }
  }

  const handleSubmit = (event:any) => {
    event.preventDefault();
    if (!Array.isArray(selectedEnsembles) || selectedEnsembles.length === 0) {
      setShowModalError(true);
      setmsgApi("Los conjuntos son obligatorios");
      return false;
    }
    const data = {name:city,ids_ensamble:JSON.stringify(selectedEnsembles)};
    setIsLoading(true);

    let update = new Rest();
      update.put('city/update/'+search,data)
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
      
  }

  const permanentlyDelete = () => {
    let remove = new Rest();
    setIsLoading(true);
    remove.delete('city/remove/'+search)
    .then((responseData:any) => {
      setIsLoading(false);
      if(responseData.success == true) {
        setShowModalDelete(false);
        router.push('/admin/cities');
      }
    }).catch((error) => {console.error('Wrong:', error);})
  }

  const onclicldDeleteCity = () => {
    setShowModalDelete(true);
  };
  
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
          msg={'esta ciudad'}
        />

        <div className="bg-white py-4 py-sm-5">
          <div className="container py-md-3">
            <h4 className="mb-4 mb-lg-5 baloo fw-400 fz-26 text-grey-6">Administrador / Ciudades / <span className="text-success">Editar ciudad</span></h4>
            <h1 className="mb-4 text-orange-1 baloo text-uppercase fw-400 fz-18 fz-sm-28 fz-md-38">Editar ciudad</h1>

            <FormEdit
              handleSubmit={handleSubmit}
              onclicldDeleteCity={onclicldDeleteCity}
              handleEnsembleSelection={handleEnsembleSelection}
              apiGetEnsambles={apiGetEnsambles}
              selectedEnsembles={selectedEnsembles}
              city={city} setCity={setCity}
            />
          </div>
        </div>
      </div>
    </Admin>
  )
}