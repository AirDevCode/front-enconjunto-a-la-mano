'use client';
import Admin from '@/theme/admin';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams} from 'next/navigation';
import Rest from '@/libs/rest';
import Loading from '@/app/_components/loading';
import FormEditAds from './_components/formEditAds';
import ModalSuccess from '@/app/_components/modalSuccess';
import ModalError from '@/app/_components/modalError';
import ModalDelete from '@/app/_components/modalDelete';

type selectedCheckboxes = number[];

export default function PrivateAdsEdit() {

  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const router = useRouter()

  const [category, setCategory] =  useState('');
  const [title,setTitle] =  useState('');
  const [price,setPrice] =  useState('');
  const [description,setDescription] =  useState('');
  const [qr,setQr] =  useState('');
  const [shippingType,setShippingType] =  useState('');
  const [typeId,settypeId] =  useState('');
  const [photos, setPhotos] = useState<any[]>([]);
  const [itisaprovedbytheadm,setItisaprovedbytheadm] =  useState(''); 
  const [state,setState] =  useState(''); 
  const [featured,setFeatured] =  useState(false); 

  const [apiGetCategories, setApiGetCategories] =  useState([]);
  const [apiGetCities, setApiGetCities] =  useState([]);
  const [apiGetTypeAds, setApiGetTypeAds] =  useState([]);

  const [selectedCoverages, setSelectedCoverages] = useState<selectedCheckboxes>([]);
  const [coverageVisible, setCoverageVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean);

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showButtonCloseModal, setShowButtonCloseModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');

  const informationAdvertisement = (id: string | string[] | null) => {
    setIsLoading(true);
    let information = new Rest();
    information.get('advertisement/get-information/'+id+'?whereDoYouSee=private')
    .then((responseData:any) => {
      setIsLoading(false);
      if(responseData.data.featured == 'Y'){
        setFeatured(true);
      }else{
        setFeatured(false);
      }
      setTitle(responseData.data.name);
      setPrice(responseData.data.total);
      setDescription(responseData.data.description);
      setCategory(responseData.data.category_id);
      settypeId(responseData.data.typead_id);
      setShippingType(responseData.data.shipping_type);
      setPhotos(responseData.data.photos_information);
      setPhotos(responseData.data.photos_information);
      setItisaprovedbytheadm(responseData.data.itisaprovedbytheadm);
      setState(responseData.data.delete);
      setQr(responseData.data.photo_qr);
      if(responseData.data.shipping_type == 'cities_send'){
        setSelectedCoverages(JSON.parse(responseData.data.coverage_ids));
        setCoverageVisible(true);
      }
    }).catch((error) => {console.error('Wrong:', error);})
  }

  const fetchData = (url: string, setStateFunction: Function) => {
    let list = new Rest();
    list.get(url)
    .then((responseData: any) => {
      if (responseData.success && Array.isArray(responseData.data)) {
        setStateFunction(responseData.data);
      } else {
        setmsgApi("The API response does not contain valid data.");
        setShowModalError(true);
      }
    })
    .catch((error) => {
      console.error('Wrong:', error);
    });
  };

  useEffect(() => {
    fetchData('advertisement-type/list',setApiGetTypeAds);
    fetchData('category/list',setApiGetCategories);
    fetchData('city/list/everything',setApiGetCities);
    informationAdvertisement(search);
  },[]);

  const handleFileChange  = async (e:any, typeField:string) => {
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

  const handleShippingTypeChange = (e:any) => {
    if(e.target.value =='cities_send'){setCoverageVisible(true);}
    if(e.target.value =='national_send'){setCoverageVisible(false);}
    setShippingType(e.target.value);
  };

  const handleCoverages = (id:number) => {
    if (selectedCoverages.includes(id)) {
      setSelectedCoverages(selectedCoverages.filter(option => option !== id));
    } else {
      setSelectedCoverages([...selectedCoverages, id]);
    }
  }

  const handleSubmit = (event:any) => {
    console.log(featured);
    event.preventDefault();

    let selectedCoveragesSend:any;
    let getitisaprovedbytheadm:string;
    let getState:string;

    if(shippingType == 'national_send'){
      selectedCoveragesSend = "[]";
    }else{
      if(!shippingType && !selectedCoveragesSend){
        setmsgApi("Las coberturas son obligatorias");
        setShowModalError(true);
        return false;
      }
      selectedCoveragesSend = JSON.stringify(selectedCoverages);
    }

    if(state === 'Y'){
      getitisaprovedbytheadm = 'Y';
      getState = 'PEN';
    }else{
      getitisaprovedbytheadm = itisaprovedbytheadm;
      getState = state;
    }

    let  isFeatured = 'N';
    if(featured){
      isFeatured = 'Y';
    }

    setIsLoading(true);
     

    const formData = {
      'state':getState,
      'itisaprovedbytheadm':getitisaprovedbytheadm,
      'typead_id': typeId,
      'name':title,
      'category_id': category,
      'total': price,
      'photo_qr': qr,
      'description': description,
      'shipping_type': shippingType,
      'coverage_ids': selectedCoveragesSend,
      'photos': photos,
      'featured': isFeatured,
    }

    let update = new Rest();
    update.put('advertisement/update/'+search,formData)
    .then((responseData:any) => {
      setIsLoading(false);
      setmsgApi(responseData.msg);
      if(responseData.success == true){
        informationAdvertisement(search);
        setShowModalSuccess(true);
        setShowButtonCloseModal(true);
      }else{
        setShowModalError(true);
      }
      //alert(responseData.msg);
    }).catch((error) => {console.error('Wrong:', error);})
    
  }

   const deleteQr = () => {
    setQr('');
  }

  const permanentlyDelete = () => {
    let remove = new Rest();
    setIsLoading(true);
    remove.put('advertisement/change-state/'+search,{state:'DEL'})
    .then((responseData:any) => {
      setIsLoading(false);
      if(responseData.success == true){
        setShowModalDelete(false);
        router.push('/admin/ads');
      }
    }).catch((error) => {console.error('Wrong:', error);})
  }
  const deleteAds = () => {
    setShowModalDelete(true);
  };

  const handleFeatured = () => {
    setFeatured(!featured)
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

        <ModalDelete 
          showModalDelete={showModalDelete}
          setShowModalDelete={setShowModalDelete}
          permanentlyDelete={permanentlyDelete}
          msg={'este anuncio'}
        />


        <div className="bg-white py-4 py-sm-5">
          <div className="container py-md-3">
            <h4 className="mb-4 mt-0 baloo fw-400 fz-26 text-grey-6">Administrador / Listado de anuncios / <span className="text-success">Editar anuncio</span></h4>

            <h1 className="mb-4 text-orange-1 baloo text-uppercase fw-400 fz-18 fz-sm-28 fz-md-38">Editar anuncio</h1>
              
            <FormEditAds
              handleSubmit={handleSubmit}
              handleShippingTypeChange={handleShippingTypeChange}
              handleCoverages={handleCoverages}
              handleFileChange={handleFileChange}
              deleteQr={deleteQr}
              deleteAds={deleteAds}
              handleFeatured={handleFeatured}

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
              itisaprovedbytheadm={itisaprovedbytheadm}
              state={state}setState={setState}
              featured={featured}
            />
          </div>
        </div>
      </div>
    </Admin>
  )
}