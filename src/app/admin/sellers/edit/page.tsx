'use client';
import Admin from '@/theme/admin';
import React, { useEffect, useState } from 'react';
import FormEditSeller from './_components/formEditSeller';
import Rest from '@/libs/rest';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Loading from '@/app/_components/loading';
import ModalSuccess from '@/app/_components/modalSuccess';
import ModalError from '@/app/_components/modalError';
import ModalDelete from '@/app/_components/modalDelete';

type selectedCheckboxes = number[];

export default function AdminSellersEdit() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  const [apiCityData, setApiCityData] = useState([]);
  const [apiTypePersonData, setApiTypePersonData] = useState([]);

  const [idProfile, setIdProfile] =  useState(0);
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
  const [profileImage, setProfileImage] = useState('');
  const [whenyousee, setwhenyousee] = useState('admin');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<selectedCheckboxes>([]);

  const [isLoading, setIsLoading] = useState(Boolean);
  const [showComPassword, setComShowPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showButtonCloseModal, setShowButtonCloseModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');


  const getInformationSeller = () => {
    let list = new Rest();
    list.get('seller/information-by-id/'+search)
    .then((responseData:any) => {
      setIdProfile(responseData.data.id);
      setFullName(responseData.data.fullname);
      setBusinessName(responseData.data.name);
      setEmail(responseData.data.email);
      setDocumentNumber(responseData.data.number_identification);
      setNumberPhone(responseData.data.number_phone);
      setTypeDoc(responseData.data.type_identification);
      setCityId(responseData.data.city_id);
      fetchData('city/get-information/'+responseData.data.city_id,setApiEnsambleData,'ensamble');
      setEnsembleId(responseData.data.ensemble_id);
      const liveInEnsamble = responseData.data.liveinensamble === "YES" ? true : false;
      setLiveInEnsamble(liveInEnsamble);
      setNumberApartTower(responseData.data.numberapart_tower);
      setKindSex(responseData.data.kind_sex);
      setProfileImage(responseData.data.photo_profile);
      setDescription(responseData.data.description);
      setSelectedCheckboxes(JSON.parse(responseData.data.typeperson_ids));
    }).catch((error) => {console.error('Wrong:', error);})
  }

  const fetchData = (url: string, setStateFunction: Function,api:string) => {
    setIsLoading(true);
    let list = new Rest();
    list.get(url)
    .then((responseData: any) => {
      setIsLoading(false);
      if(api == 'ensamble'){
        setStateFunction(responseData.data.ensambles);
      }else{
        setStateFunction(responseData.data);
      }
    }).catch((error) => {
      console.error('Wrong:', error);
    });
  };

  const listEnsambles = (id:any) => {
    fetchData('city/get-information/'+id,setApiEnsambleData,'ensamble');
  }

  const handleSelectChange = (event: any, setterFunction: Function, type:string) => {
    if(type =='city'){listEnsambles(event.target.value);}
    setterFunction(event.target.value);
  };

  const handleLiveInEnsamble = (event:any) => {
    setLiveInEnsamble(event.target.checked);
    if(event.target.checked === true){
      setEnsembleId('');
   }
  };

  const permanentlyDelete = () => {
    let remove = new Rest();
    setIsLoading(true);
    remove.delete('seller/delete/'+search)
    .then((responseData:any) => {
      setIsLoading(false);
      if(responseData.success == true) {
        setShowModalDelete(false);
        const url = process.env.NEXT_PUBLIC_SERVE + '/admin/sellers.html';
        window.location.href = url;
        //router.push('/admin/sellers');
      }
    }).catch((error) => {console.error('Wrong:', error);})
  }

  const onclicldDeleteSeller = (setId:number) => {
    setShowModalDelete(true);
  
  };
  useEffect(() => {
    getInformationSeller();
    fetchData('city/list/everything',setApiCityData,'city');
    fetchData('typeperson/list',setApiTypePersonData,'typePerson');
  }, []);

  const handleFileChange  = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);

    const selectedFile = e.target.files[0];
    // Check file size
    const maxSize = 6 * 1024 * 1024; // 6 MB in bytes
    const minSize = 0 * 1024 * 1024; // 2 MB in bytes

    if (selectedFile.size < minSize || selectedFile.size > maxSize) {
      setIsLoading(false);
      setmsgApi(
        `El tamaño permitido es hasta 6 MB. El archivo seleccionado tiene ${(
          selectedFile.size / (1024 * 1024)
        ).toFixed(2)} MB.`
      );
      setShowModalError(true);
      return;
    }



    let file = new Rest();
    file.file('resource/save-file',e.target.files[0],'sellers')
    .then((responseData:any) => {
      setIsLoading(false);
      if(responseData.success == true) {
        setProfileImage(responseData.data.rutaFin);
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

  const handleSubmit = (event:any) => {
    event.preventDefault();

    if (selectedCheckboxes.length === 0 ) {
      setmsgApi("Es obligatorio proporcionar información sobre los grupos étnicos.");
      setShowModalError(true);
      return false;
    }

    if(!profileImage) {
      setmsgApi("Foto de perfil es obligatoria");
      setShowModalError(true);
      return false;
    }
    if(liveInEnsamble === false && !ensembleId){
      setShowModalError(true);
      setmsgApi("Los conjuntos son obligatorios.");
      return false;
    }
    if(liveInEnsamble === true){
      setEnsembleId('');
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
    let update = new Rest();
      update.put('seller/update/'+search,formData)
      .then((responseData:any) => {
        setIsLoading(false);
        setmsgApi(responseData.msg);
        if(responseData.success == true){
          setShowModalSuccess(true);
          setShowButtonCloseModal(true);
        }else{
          setShowModalError(true);
        }
        //alert(responseData.msg);
      }).catch((error) => {console.error('Wrong:', error);})
      
  }

  const handleTypePerson = (id:number) => {
    if (id === 7) {
      if (selectedCheckboxes.includes(id)) {
        setSelectedCheckboxes(selectedCheckboxes.filter(option => option !== 7));
      } else {
        setSelectedCheckboxes([7]);
      }
    } else {
      const updatedCheckboxes = selectedCheckboxes.filter(option => option !== 7);
      if (selectedCheckboxes.includes(id)) {
        setSelectedCheckboxes(updatedCheckboxes.filter(option => option !== id));
      } else {
        setSelectedCheckboxes([...updatedCheckboxes, id]);
      }
    }
  }

  const togglePasswordVisibility = (type:number) => {
    if(type===1){setShowPassword(!showPassword);}else{setComShowPassword(!showComPassword);}
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
          msg={'este vendedor'}
        />


        <div className="bg-white py-4 py-sm-5">
          <div className="container py-md-3">
            <h4 className="mb-4 mt-0 baloo fw-400 fz-26 text-grey-6">Administrador / Listado de vendedores / <span className="text-success">Editar vendedor</span></h4>

            <h1 className="mb-4 text-orange-1 baloo text-uppercase fw-400 fz-18 fz-sm-28 fz-md-38">Editar vendedor</h1>

            <FormEditSeller 
              handleSubmit={handleSubmit}
              handleSelectChange={handleSelectChange}
              handleLiveInEnsamble={handleLiveInEnsamble}
              handleTypePerson={handleTypePerson}
              onclicldDeleteSeller={onclicldDeleteSeller}
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
              profileImage={profileImage}
              selectedCheckboxes={selectedCheckboxes}
              whenyousee={whenyousee}

              togglePasswordVisibility={togglePasswordVisibility}
              showPassword ={showPassword}showComPassword={showComPassword}
              idProfile={idProfile}
            />
          </div>
        </div>
      </div>
    </Admin>
  )
}
