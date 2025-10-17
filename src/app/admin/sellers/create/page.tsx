'use client';
import Admin from '@/theme/admin';
import React, { useEffect, useState } from 'react';
import FormCtreate from './_components/formCtreate';
import Rest from '@/libs/rest';
import ModalSuccess from '@/app/_components/modalSuccess';
import ModalError from '@/app/_components/modalError';
import Loading from '@/app/_components/loading';

type selectedCheckboxes = number[];

export default function AdminSellersEdit() {

  const [apiCityData, setApiCityData] = useState([]);
  const [apiTypePersonData, setApiTypePersonData] = useState([]);

  const [fullName, setFullName] =  useState('');
  const [businessName, setBusinessName] =  useState('');
  const [email, setEmail] =  useState('');
  const [typeDoc, setTypeDoc] =  useState('');
  const [documentNumber, setDocumentNumber] =  useState('');
  const [numberPhone, setNumberPhone] =  useState('');
  const [password, setPassword] =  useState('');
  const [passwordConfirmation, setPasswordConfirmation] =  useState('');
  const [cityId ,setCityId] =  useState('');
  const [ensembleId ,setEnsembleId] =  useState('');
  const [apiEnsambleData, setApiEnsambleData] = useState([]);
  const [liveInEnsamble, setLiveInEnsamble] = useState(Boolean);
  const [numberapartTower, setNumberApartTower] = useState('');
  const [kindSex, setKindSex] = useState('');
  const [description, setDescription] = useState('');
  const [showImageProfile, setshowImageProfil] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<selectedCheckboxes>([]);

  const [showPassword, setShowPassword] = useState(false);
  const [showComPassword, setComShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showButtonCloseModal, setShowButtonCloseModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');


  const resetForm = () => {
    setFullName('');
    setBusinessName('');
    setEmail('');
    setTypeDoc('');
    setNumberPhone('');
    setDocumentNumber('');
    setPassword('');
    setPasswordConfirmation('');
    setKindSex('');
    setDescription('');
    setLiveInEnsamble(false);
    setNumberApartTower('');
    setCityId('');
    setEnsembleId('');
    setProfileImage('');
    setSelectedCheckboxes([]); 
  };

  const fetchData = (url: string, setStateFunction: Function) => {
    setIsLoading(true);
    let list = new Rest();
    list.get(url)
      .then((responseData: any) => {
        setIsLoading(false);
        if (responseData.success && Array.isArray(responseData.data)) {
          setStateFunction(responseData.data);
        } else {
          alert(responseData.msg);
        }
      })
      .catch((error) => {
        console.error('Wrong:', error);
      });
  };


  const listEnsambles = (id:any) => {
    let listEnsambles = new Rest();
    listEnsambles.get('city/get-information/'+id)
    .then((responseData:any) => {
      setApiEnsambleData(responseData.data.ensambles);
    }).catch((error) => {console.error('Wrong:', error);})
  }

  const handleSelectChange = (event: any, setterFunction: Function, type:string) => {
    if(type =='city'){listEnsambles(event.target.value);}
    setterFunction(event.target.value);
  };

  const handleLiveInEnsamble = (event:any) => {
    setLiveInEnsamble(event.target.checked);
  };


  useEffect(() => {
    fetchData('city/list/everything',setApiCityData);
    fetchData('typeperson/list',setApiTypePersonData);
  }, []);

  const handleSubmit = (event:any) => {

    event.preventDefault();
    
    if (selectedCheckboxes.length === 0 ) {
      setmsgApi("Es obligatorio proporcionar información sobre los grupos étnicos.");
      setShowModalError(true);
      return false;
    }
    if(!profileImage){
      setmsgApi("Foto de perfil es obligatoria");
      setShowModalError(true);
      return false;
    }


    setIsLoading(true);

    const formData = {
      'fullname': fullName,
      'name': businessName,
      'email': email,
      'type_identification': typeDoc,
      'number_identification': documentNumber,
      'number_phone': numberPhone,
      'password': password,
      'password_confirmation': passwordConfirmation,
      'city_id': cityId,
      'ensemble_id': ensembleId,
      'liveinensamble':liveInEnsamble,
      'numberapart_tower':numberapartTower,
      'description':description,
      'photo_profile':profileImage,
      'typeperson_ids':JSON.stringify(selectedCheckboxes),
      'kind_sex':kindSex
    }
    let save = new Rest();
      save.post('seller/register',formData)
      .then((responseData:any) => {
        setIsLoading(false);
        setmsgApi(responseData.msg);
        if(responseData.success == true){
          const fileInput = document.getElementById('formFile') as HTMLInputElement;
          if (fileInput) {fileInput.value = '';}
          resetForm();
          setShowModalSuccess(true);
          setShowButtonCloseModal(true);
        }else{
          setShowModalError(true);
        }
      }).catch((error) => {console.error('Wrong:', error);})
      
  }

  const handleTypePerson = (id: number) => {
    if (id === 7) {
      if (selectedCheckboxes.includes(id)) {
        setSelectedCheckboxes(selectedCheckboxes.filter(option => option !== 7));
      } else {
        setSelectedCheckboxes([7]);
      }
      //setSelectedCheckboxes([7]);
    } else {
      const updatedCheckboxes = selectedCheckboxes.filter(option => option !== 7);
      if (selectedCheckboxes.includes(id)) {
        setSelectedCheckboxes(updatedCheckboxes.filter(option => option !== id));
      } else {
        setSelectedCheckboxes([...updatedCheckboxes, id]);
      }
    }
  };

  const togglePasswordVisibility = (type:number) => {
    if(type===1){setShowPassword(!showPassword);}else{setComShowPassword(!showComPassword);}
  };

  const handleFileChange  = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    let file = new Rest();
    file.file('resource/save-file',e.target.files[0],'sellers')
    .then((responseData:any) => {
      setIsLoading(false);
      if(responseData.success == true){
        setProfileImage(responseData.data.rutaFin);
      }else{
        setmsgApi(responseData.msg);
        setShowModalError(true);
        //alert(responseData.msg);
      }
    })
    .catch((error) => {
      console.error('Wrong:', error);
    })
  }

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

        <div className="bg-white py-4 py-sm-5">
          <div className="container py-md-3">
          <h4 className="mb-4 mt-0 baloo fw-400 fz-26 text-grey-6">Administrador / Listado de vendedores / <span className="text-success">Crear vendedor</span></h4>
            <h1 className="mb-4 text-orange-1 baloo text-uppercase fw-400 fz-18 fz-sm-28 fz-md-38">Crear vendedor</h1>
            <FormCtreate 
              handleSubmit={handleSubmit}
              handleSelectChange={handleSelectChange}
              handleLiveInEnsamble={handleLiveInEnsamble}
              handleTypePerson={handleTypePerson}
              handleFileChange={handleFileChange}

              apiCityData={apiCityData}
              apiEnsambleData={apiEnsambleData}
              apiTypePersonData={apiTypePersonData}
              fullName={fullName} setFullName={setFullName}
              businessName={businessName} setBusinessName={setBusinessName}
              email={email} setEmail={setEmail}
              typeDoc={typeDoc} setTypeDoc={setTypeDoc}
              documentNumber={documentNumber} setDocumentNumber={setDocumentNumber}
              numberPhone={numberPhone} setNumberPhone={setNumberPhone}
              password={password} setPassword={setPassword}
              passwordConfirmation={passwordConfirmation} setPasswordConfirmation={setPasswordConfirmation}
              cityId={cityId} setCityId={setCityId}
              ensembleId={ensembleId} setEnsembleId={setEnsembleId}
              liveInEnsamble={liveInEnsamble} setLiveInEnsamble={setLiveInEnsamble}
              numberapartTower={numberapartTower} setNumberApartTower={setNumberApartTower}
              kindSex={kindSex} setKindSex={setKindSex}
              setDescription={setDescription} description={description}
              showImageProfile={showImageProfile}
              selectedCheckboxes={selectedCheckboxes}
              profileImage={profileImage}

              togglePasswordVisibility={togglePasswordVisibility}
              showPassword ={showPassword}showComPassword={showComPassword}
            
            ></FormCtreate>
          </div>
        </div>
      </div>
    </Admin>
  )
}
