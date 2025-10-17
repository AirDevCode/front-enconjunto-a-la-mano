'use client';
import Public from '@/theme/public';
import React, { useState } from 'react';
import FormSetPassword from './_components/formSetPassword';
import Rest from '@/libs/rest';
import Loading from '@/app/_components/loading';
import ModalSuccess from '@/app/_components/modalSuccess';
import ModalError from '@/app/_components/modalError';

export default function PublicSetNewPassword() {

  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [password_confirmation, setPasswordConfirmation] = useState('');

  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showButtonCloseModal, setShowButtonCloseModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');


  const handleSubmit = (event:any) => {
    setIsLoading(true);
    event.preventDefault();
    let set = new Rest();
    const data = {
      token:'7IBaTNiu7iINh3q4wLJxNrXFrsFdkPzuP0vuiNMJ4a11mLpiUb19ITmSt5PA',
      password:password,
      password_confirmation:password_confirmation,
    }
    
    set.post('auth/change-password',data)
    .then((responseData:any) => {
      setIsLoading(false);
      setmsgApi(responseData.msg);
      if(responseData.success == true){
        setPassword('');
        setPasswordConfirmation('');

        setShowModalSuccess(true);
        setShowButtonCloseModal(false);
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
          <h3 className="text-center mt-0 mb-3 mb-md-4 baloo fw-400 fz-28 fz-md-32 text-orange-1">Establecer nueva contraseña</h3>

          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-6 col-xl-4">
              <FormSetPassword 
                handleSubmit={handleSubmit}
                password={password} setPassword={setPassword}
                password_confirmation={password_confirmation} setPasswordConfirmation={setPasswordConfirmation}
              ></FormSetPassword>
            </div>
          </div>
        </div>
      </div>
    </Public>
  )
}