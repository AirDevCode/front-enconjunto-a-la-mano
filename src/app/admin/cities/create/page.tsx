'use client';
import Admin from '@/theme/admin';
import React, { useEffect, useState } from 'react';
import FormCreate from './_components/formCreate';
import Rest from '@/libs/rest';
import Loading from '@/app/_components/loading';
import ModalSuccess from '@/app/_components/modalSuccess';
import ModalError from '@/app/_components/modalError';

type selectedEnsembles = string[];

export default function AdminSetsCreate() {
  const [city, setCity] =  useState('');
  const [apiGetEnsambles, setApiGetEnsambles] =  useState([]);
  const [selectedEnsembles, setSelectedEnsembles] = useState<selectedEnsembles>([]);
  const [isLoading, setIsLoading] = useState(Boolean);

  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showButtonCloseModal, setShowButtonCloseModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');
  
  const getListAllEnsambles = () => {
    let list = new Rest();
    setIsLoading(true);
    list.get('ensemble/list-by-search/everything')
    .then((responseData:any) => {
      setIsLoading(false);
      setApiGetEnsambles(responseData.data);
    }).catch((error) => {console.error('Wrong:', error);})
  }

  useEffect(() => {
    getListAllEnsambles();
  },[]);

  const handleSubmit = (event:any) => {
    event.preventDefault();

    if (!Array.isArray(selectedEnsembles) || selectedEnsembles.length === 0) {
      setShowModalError(true);
      setmsgApi("Los conjuntos son obligatorios");
      return false;
    }

    const data = {name:city,ids_ensamble:JSON.stringify(selectedEnsembles)};
    setIsLoading(true);
    let save = new Rest();
      save.post('city/save',data)
      .then((responseData:any) => {
        setIsLoading(false);
        setmsgApi(responseData.msg);
        if(responseData.success == true) {
          setCity('');
          setSelectedEnsembles([]);
          setShowModalSuccess(true);
          setShowButtonCloseModal(true);
        } else {
          setShowModalError(true);
        }
      }).catch((error) => {console.error('Wrong:', error);})
      
  }

  const handleEnsembleSelection = (id:any) => {
    if (selectedEnsembles.includes(id)) {
      setSelectedEnsembles(selectedEnsembles.filter(option => option !== id));
    } else {
      setSelectedEnsembles([...selectedEnsembles, id]);
    }
  }

  return (
    <Admin>
      <div className="px-md-4 px-lg-5">
        {isLoading === true ?  <Loading></Loading> : null}

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
            <h4 className="mb-4 mb-lg-5 baloo fw-400 fz-26 text-grey-6">Administrador / Ciudades / <span className="text-success">Crear ciudad</span></h4>
            <h1 className="mb-4 text-orange-1 baloo text-uppercase fw-400 fz-18 fz-sm-28 fz-md-38">Crear ciudad</h1>

            <FormCreate
              handleSubmit={handleSubmit}
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