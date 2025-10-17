'use client';
import Public from '@/theme/public';
import React, { useState } from 'react';
import Rest from '@/libs/rest';
import FormReset from './_components/formReset';
import Loading from '@/app/_components/loading';
import ModalSuccess from '@/app/_components/modalSuccess';
import ModalError from '@/app/_components/modalError';

export default function PublicResetPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(Boolean);

  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showButtonCloseModal, setShowButtonCloseModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');

  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [resetCaptchaValid, setResetCaptchaValid] = useState(false);


  const handleSubmit = (event:any) => {

    
    event.preventDefault();

    if (!isCaptchaValid) {
      setShowModalError(true);
      setmsgApi("Por favor, completa la validación reCAPTCHA.");
      return false;
    }
    setIsLoading(true);
    let login = new Rest();
    login.post('auth/reset-password',{'email': email})
    .then((responseData:any) => {
      setIsLoading(false);
      setmsgApi(responseData.msg);
      if(responseData.success == true){
        setEmail('');
        setShowModalSuccess(true);
        setShowButtonCloseModal(true);
        setResetCaptchaValid((prevKey) => !prevKey);
      }else{
        setShowModalError(true);
      }
    }).catch((error) => {console.error('Wrong:', error);})
   
  }
  return (
    <Public>
      <div className="bg-light my-3 my-sm-4 my-lg-5 py-5">
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

        <div className="container py-md-3 py-lg-4">
          <h3 className="text-center mt-0 mb-3 mb-md-4 baloo fw-400 fz-28 fz-md-32 text-orange-1">Recuperar contraseña</h3>
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-6 col-xl-4">
              <FormReset
                handleSubmit={handleSubmit}
                setEmail={setEmail} email={email}
                isCaptchaValid={isCaptchaValid} setIsCaptchaValid={setIsCaptchaValid}
                resetCaptchaValid={resetCaptchaValid}
              ></FormReset>
            </div>
          </div>
        </div>
      </div>
    </Public>
  )
}