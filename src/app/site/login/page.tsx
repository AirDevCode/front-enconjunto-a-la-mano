'use client';
import Public from '@/theme/public';
import React, { useEffect, useState } from 'react';
import FormLogin from './_components/formLogin';
import Rest from '@/libs/rest';
import UserSession from '@/libs/userSession';
import Loading from '@/app/_components/loading';
import { useRouter } from 'next/navigation';
import ModalSuccess from '@/app/_components/modalSuccess';
import ModalError from '@/app/_components/modalError';
import { LOGIN } from '@/constants/login';

export default function PublicLogin() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(Boolean);

  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showButtonCloseModal, setShowButtonCloseModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');
  
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [resetCaptchaValid, setResetCaptchaValid] = useState(false);

  const handleSubmit = (event:any) => {
    event.preventDefault();

    if(!isCaptchaValid) {
      setShowModalError(true);
      setmsgApi("Por favor, completa la validación reCAPTCHA.");
      return false;
    }
    const formData = {'email': email,'password':password}

    let login = new Rest();
    setIsLoading(true);

    login.post('auth/login',formData)
    .then((responseData:any) => {
      setIsLoading(false);
      setmsgApi(responseData.msg);
      if(responseData.success == true) {
        let userSession = new UserSession();
        userSession.setToken(responseData.data.access_token);
        userSession.setTypeUser(responseData.data.user.typeuser_id);
        setResetCaptchaValid((prevKey) => !prevKey);
        if(responseData.data.user.typeuser_id == 1) {
          router.push('/admin');
        } else {
          router.push('/private/profile');
        }
        setShowModalSuccess(true);
        setShowButtonCloseModal(false);
      }else{
        setShowModalError(true);
      }
    }).catch((error) => {console.error('Wrong:', error);})
  }

  useEffect(() => {
    validateIsLogged();
  },[]);

  const validateIsLogged = () => {
    if(LOGIN.TOKEN && LOGIN.TYPEUSER == '2'){
      router.push('/private/profile');
    }else if(LOGIN.TOKEN && LOGIN.TYPEUSER == '1'){
      router.push('/admin');
    }
  }

  return (
    <Public>
      <div className="bg-light my-3 my-sm-4 my-lg-5 py-5">
        {isLoading === true ? <Loading></Loading> : null}
        
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
       
        <div className="container py-md-3 py-lg-4">
          <h3 className="text-center mt-0 mb-3 mb-md-4 baloo fw-400 fz-28 fz-md-32 text-orange-1">Inicio de sesión</h3>
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-6 col-xl-4">
              <FormLogin
                handleSubmit={handleSubmit}
                setEmail={setEmail} email={email} 
                setPassword={setPassword} password={password} 
                isCaptchaValid={isCaptchaValid} setIsCaptchaValid={setIsCaptchaValid}
                resetCaptchaValid={resetCaptchaValid}
              ></FormLogin>
            </div>
          </div>
        </div>
       
      </div>
    </Public>
  )
}