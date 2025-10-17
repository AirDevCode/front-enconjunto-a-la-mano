'use client';
import Private from '@/theme/private';
import React, { useEffect, useState } from 'react';
import FormRegister from './_components/formRegister';
import Rest from '@/libs/rest';
import Loading from '@/app/_components/loading';
import ModalSuccess from '@/app/_components/modalSuccess';
import ModalError from '@/app/_components/modalError';

type selectedCheckboxes = string[];

export default function PrivateAdsCreate() {
  const [category, setCategory] =  useState('');
  const [title,setTitle] =  useState('');
  const [price,setPrice] =  useState('');
  const [description,setDescription] =  useState('');
  const [qr,setQr] =  useState('');
  const [shippingType,setShippingType] =  useState('');
  const [typeId,settypeId] =  useState('');
  const [photos, setPhotos] = useState<any[]>([]); 

  const [apiGetCategories, setApiGetCategories] =  useState([]);
  const [apiGetCities, setApiGetCities] =  useState([]);
  const [apiGetTypeAds, setApiGetTypeAds] =  useState([]);

  const [selectedCoverages, setSelectedCoverages] = useState<selectedCheckboxes>([]);
  const [coverageVisible, setCoverageVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(Boolean);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showButtonCloseModal, setShowButtonCloseModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');

  const fetchData = (url: string, setStateFunction: Function) => {
    let list = new Rest();
    list.get(url)
    .then((responseData: any) => {
      if (responseData.success && Array.isArray(responseData.data)) {
        setStateFunction(responseData.data);
      } else {
        console.log('The API response does not contain valid data');
      }
    })
    .catch((error) => {
      console.error('Wrong:', error);
    });
  };

  const handleFileChange  = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);

    let file = new Rest();
    file.file('resource/save-file',e.target.files[0],'sellers')
    .then((responseData:any) => {
      setIsLoading(false);
      if(responseData.success == true) {
        e.target.value = null;
        setQr(responseData.data.rutaFin);
      } else {
        setmsgApi(responseData.msg);
        setShowModalError(true);
        //alert(responseData.msg);
      }
    })
    .catch((error) => {
      console.error('Wrong:', error);
    })
  }

  const handleCoverages = (id:string) => {
    if (selectedCoverages.includes(id)) {
      setSelectedCoverages(selectedCoverages.filter(option => option !== id));
    } else {
      setSelectedCoverages([...selectedCoverages, id]);
    }
  }

  const handleShippingTypeChange = (e:any) => {
    if(e.target.value =='cities_send'){setCoverageVisible(true);}
    if(e.target.value =='national_send'){setCoverageVisible(false);}
    setShippingType(e.target.value);
  };

  useEffect(() => {
    fetchData('advertisement-type/list',setApiGetTypeAds);
    fetchData('category/list',setApiGetCategories);
    fetchData('city/list/everything',setApiGetCities);
  },[]);
  
  const resetForm = () => {
    setCategory('');
    setTitle('');
    setPrice('');
    setDescription('');
    setQr('');
    setShippingType('');
    setPhotos([]);
    settypeId('');
    setCoverageVisible(false);
    setSelectedCoverages([]);
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();

    let selectedCoveragesSend:any;
    if(shippingType == 'national_send') {
      selectedCoveragesSend = "[]";
    } else {
      if(!shippingType && !selectedCoveragesSend){
        setmsgApi("Las coberturas son obligatorias");
        setShowModalError(true);
        return false;
      }
      selectedCoveragesSend = JSON.stringify(selectedCoverages);
    }

    setIsLoading(true);

    const formData = {
      'category_id': category,
      'name':title,
      'description': description,
      'total': price,
      'shipping_type': shippingType,
      'photo_qr': qr,
      'coverage_ids': selectedCoveragesSend,
      'photos': photos,
      'delete': 'PEN',
      'typead_id': typeId,
  
    }

    let save = new Rest();
    save.post('advertisement/register',formData)
    .then((responseData:any) => {
      setIsLoading(false);
      setmsgApi(responseData.msg);
      if(responseData.success == true) {
        resetForm();
        setShowModalSuccess(true);
        setShowButtonCloseModal(true);
      } else {
        setShowModalError(true);
      }
    }).catch((error) => {console.error('Wrong:', error);})
    
  }

  const deleteQr = () => {
    setQr('');
  }

  return (
    <Private>
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
            <h4 className="mb-4 mt-0 baloo fw-400 fz-26 text-grey-6">Perfil / <span className="text-success">Publicar anuncio</span></h4>
            <h1 className="mb-4 text-orange-1 baloo text-uppercase fw-400 fz-18 fz-sm-28 fz-md-38">Publicar anuncio</h1>

            <FormRegister 
              handleFileChange={handleFileChange}
              handleSubmit={handleSubmit}
              handleShippingTypeChange={handleShippingTypeChange}
              handleCoverages={handleCoverages}
              deleteQr={deleteQr}
              
              apiGetCategories={apiGetCategories}
              apiGetCities={apiGetCities}
              apiGetTypeAds={apiGetTypeAds}

              typeId={typeId} settypeId={settypeId}
              title={title} setTitle={setTitle}
              category={category} setCategory={setCategory}
              price={price} setPrice={setPrice}
              description={description} setDescription={setDescription}
              shippingType={shippingType}
              selectedCoverages={selectedCoverages}
              coverageVisible={coverageVisible}
              photos={photos}setPhotos={setPhotos}
              qr={qr}
            />
          </div>
        </div>
      </div>
    </Private>
  )
} 