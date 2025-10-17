'use client';;
import Public from '@/theme/public';
import React, { useEffect, useState } from 'react';
import FormUserRegister from './_components/formUserRegister';
import Loading from '@/app/_components/loading';
import Rest from '@/libs/rest';
import ModalSuccess from '@/app/_components/modalSuccess';
import ModalError from '@/app/_components/modalError';
import Autocomplete from '@/app/_components/autocomplete';
import Recaptcha from '@/app/_components/recaptcha';

interface CityData {
  city_id: number;
  city_name: string;
}

type selectedCheckboxes = number[];


export default function PublicRegister() {

  const [fullName, setfullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [type_identification, setTypeIdentification] = useState('');
  const [number_phone, setNumberPhone] = useState('');
  const [number_identification, setNumberIdentification] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [kind_sex, setKindSex] = useState('');
  const [description, setDescription] = useState('');
  const [liveInEnsamble, setLiveInEnsamble] = useState(false);
  const [numberapart_tower, setNumberApartTower] = useState('');
  const [city, setCity] = useState('');
  const [idEnsamble, setIdEnsamble] = useState('');
  const [fileProfile, setProfile] = useState('');
  const [file, setFile] = useState('');
 
  const [apiCityData, setApiCityData] = useState<CityData[]>([]);
  const [apiTypePersonData, setApiTypePersonData] = useState([]);
  const [apiEnsambleData, setApiEnsambleData] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<selectedCheckboxes>([]);

  const [isLoading, setIsLoading] = useState(Boolean);
  const [showPassword, setShowPassword] = useState(false);
  const [showComPassword, setComShowPassword] = useState(false);

  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showButtonCloseModal, setShowButtonCloseModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');
  const [labelTextPhoto, setLabelTextPhoto] = useState('Cargar foto de perfil');

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionEnsemble, setSelectedOptionEnsemble] = useState(null);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [resetCaptchaValid, setResetCaptchaValid] = useState(false);
  const [iAcceptTheTerms, setIAcceptTheTerms] = useState(false);
  

  const resetForm = () => {
    setfullName('');
    setBusinessName('');
    setEmail('');
    setTypeIdentification('');
    setNumberPhone('');
    setNumberIdentification('');
    setPassword('');
    setPasswordConfirmation('');
    setKindSex('');
    setDescription('');
    setLiveInEnsamble(false);
    setIAcceptTheTerms(false);
    setNumberApartTower('');
    setCity('');
    setIdEnsamble('');
    setProfile('');
    setFile('');
    setSelectedCheckboxes([]); 
    setLabelTextPhoto('Cargar foto de perfil');
    setResetCaptchaValid((prevKey) => !prevKey);
  };

  const fetchData = (url: string, setStateFunction: Function,api:string) => {
    setIsLoading(true);
    let list = new Rest();
    list.get(url)
      .then((responseData: any) => {
        setIsLoading(false);
        if(api == 'city'){
          const cityData = responseData.data.map((item: any) => ({
            value: item.city_id,  
            label: item.city_name,  
          }));
          setStateFunction(cityData);
          
        }else if(api == 'ensamble' ){
          const ensambleData = responseData.data.ensambles.map((item: any) => ({
            value: item.ensemble_id,  
            label: item.name,  
          }));
          setStateFunction(ensambleData);
        }else{setStateFunction(responseData.data);}
      }).catch((error) => {
        console.error('Wrong:', error);
      });
  };

  const listEnsambles = (id:any) => {
    fetchData('city/get-information/'+id,setApiEnsambleData,'ensamble');
  }


  useEffect(() => {
    fetchData('city/list/everything',setApiCityData,'city');
    fetchData('typeperson/list',setApiTypePersonData,'typePerson');
  },[]); 

  const handleLiveInEnsamble = (event:any) => {
    setLiveInEnsamble(event.target.checked);
    if(event.target.checked === true){
       setIdEnsamble('');
    }
  };

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
  
  
  const handleSubmit = (event:any) => {
    
    event.preventDefault();

    if (selectedCheckboxes.length === 0 ) {
      setShowModalError(true);
      setmsgApi("Es obligatorio proporcionar información sobre los grupos étnicos.");
      return false;
    }
    if(!file){
      setShowModalError(true);
      setmsgApi("Foto de perfil es obligatoria.");
      return false;
    }

    if(!city){
      setShowModalError(true);
      setmsgApi("Ciudad de perfil es obligatoria.");
      return false;
    }

    if(liveInEnsamble === false && !idEnsamble){
      setShowModalError(true);
      setmsgApi("Los conjuntos son obligatorios.");
      return false;
    }

    if (!iAcceptTheTerms) {
      setShowModalError(true);
      setmsgApi("Debes aceptar los Términos y Condiciones.");
      return;
    }

    if (!isCaptchaValid) {
      setShowModalError(true);
      setmsgApi("Por favor, completa la validación reCAPTCHA.");
      return false;
    }

    const formData = {
      'fullname': fullName,
      'surname':null,
      'name': businessName,
      'email': email,
      'type_identification': type_identification,
      'number_identification': number_identification,
      'number_phone': number_phone,
      'password': password,
      'password_confirmation': password_confirmation,
      'city_id': city,
      'ensemble_id': idEnsamble,
      'liveinensamble':liveInEnsamble,
      'numberapart_tower':numberapart_tower,
      'description':description,
      'photo_profile':file,
      'typeperson_ids':JSON.stringify(selectedCheckboxes),
      'kind_sex':kind_sex
    }
    setIsLoading(true);
    let saveSeller = new Rest();
    saveSeller.post('auth/register',formData)
    .then((responseData:any) => {
      setIsLoading(false);
      setmsgApi(responseData.msg);
      if(responseData.success == true){
        const fileInput = document.getElementById('formFile') as HTMLInputElement;
        if (fileInput) {fileInput.value = '';}
        resetForm();
        
        setShowModalSuccess(true);
        setShowButtonCloseModal(true);
        setSelectedOption(null);
        setSelectedOptionEnsemble(null);
      }else{
        setShowModalError(true);
      }
    }).catch((error) => {console.error('Wrong:', error);})

  }

  const handleEnsambleChange = (event:any) => {
    setIdEnsamble(event.value);
  };


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
      if(responseData.success == true){
        setLabelTextPhoto(e.target.files[0].name);
        setFile(responseData.data.rutaFin);
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

  const handleCityChange = (selectedOption:any) => {
    setCity(selectedOption.value);
    listEnsambles(selectedOption.value);
  };

  const handleAcceptTheTerms = async (e:any) => {
    setIAcceptTheTerms(!iAcceptTheTerms);
  }

  return (
    <Public>
      <div className="bg-white my-3 my-sm-4 my-lg-5 py-5">
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

        {isLoading === true ?  <Loading></Loading> : null}
        
        <div className="container py-md-3 py-lg-4">
          <h3 className="text-center mt-0 mb-3 mb-md-4 baloo fw-400 fz-28 fz-md-32 text-orange-1 text-uppercase">Regístrate</h3>
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5">
              <FormUserRegister 
                handleSubmit={handleSubmit}
                handleLiveInEnsamble={handleLiveInEnsamble}
                handleTypePerson={handleTypePerson}
                handleEnsambleChange={handleEnsambleChange}
                handleFileChange={handleFileChange}
                handleAcceptTheTerms={handleAcceptTheTerms}

                setfullName={setfullName} fullName={fullName} 
                setBusinessName={setBusinessName} businessName={businessName}
                setEmail={setEmail} email={email}
                setTypeIdentification={setTypeIdentification} type_identification={type_identification}
                setNumberIdentification={setNumberIdentification} number_identification={number_identification}
                setNumberPhone={setNumberPhone} number_phone={number_phone}
                setPassword={setPassword} password={password}
                setPasswordConfirmation={setPasswordConfirmation} password_confirmation={password_confirmation}
                setKindSex={setKindSex} kind_sex={kind_sex}
                setDescription={setDescription} description={description}
                setNumberApartTower={setNumberApartTower} numberapart_tower={numberapart_tower}
                liveInEnsamble={liveInEnsamble}
                //setProfile={setProfile} fileProfile={fileProfile}
                iAcceptTheTerms={iAcceptTheTerms}

                apiTypePersonData={apiTypePersonData}
                selectedCheckboxes={selectedCheckboxes}
                apiEnsambleData={apiEnsambleData}

                togglePasswordVisibility={togglePasswordVisibility}
                showPassword ={showPassword}showComPassword={showComPassword}

                apiCityData={apiCityData} handleCityChange={handleCityChange}
                labelTextPhoto={labelTextPhoto}
                selectedOption={selectedOption}setSelectedOption={setSelectedOption}
                selectedOptionEnsemble={selectedOptionEnsemble}setSelectedOptionEnsemble={setSelectedOptionEnsemble}
                isCaptchaValid={isCaptchaValid} setIsCaptchaValid={setIsCaptchaValid}
                resetCaptchaValid={resetCaptchaValid}
              />
            </div>
          </div>
        </div>
      </div>
    </Public>
  )
}