'use client';
import Public from '@/theme/public';
import React, { useEffect, useState } from 'react';
import Rest from '@/libs/rest';
import UserSession from '@/libs/userSession';
import Loading from '@/app/_components/loading';
import { useRouter } from 'next/navigation';
import ModalSuccess from '@/app/_components/modalSuccess';
import ModalError from '@/app/_components/modalError';
import { LOGIN } from '@/constants/login';
import { useSearchParams} from 'next/navigation';

export default function PublicAutoLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(Boolean);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showButtonCloseModal, setShowButtonCloseModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');
  const searchParams = useSearchParams()
  const token = searchParams.get('token');

  const autologin = () => {
    setIsLoading(true);
    const formData = {token:token}

    let login = new Rest();
    login.post('auth/autologin',formData)
    .then((responseData:any) => {
      setIsLoading(false);
      if(responseData.success == true){
        let userSession = new UserSession();
        userSession.setToken(responseData.data.access_token);
        userSession.setTypeUser(responseData.data.user.typeuser_id);
        router.push('https://www.enconjuntoalamano.com/wp-admin/admin.php?page=Panel_Panel_home');
        setShowModalSuccess(true);
        setShowButtonCloseModal(false);
      } else {
        setmsgApi(responseData.msg);
        setShowModalError(true);
      }
    }).catch((error) => {console.error('Wrong:', error);})
   
  }

  useEffect(() => {
    validateIsLogged();
    autologin();
  },[]);

  const validateIsLogged = () => {
    if(LOGIN.TOKEN && LOGIN.TYPEUSER == '2') {
      //router.push('/private/profile');
    }else if(LOGIN.TOKEN && LOGIN.TYPEUSER == '1') {
     // router.push('https://www.itscolombiapruebas.com/wp-admin/admin.php?page=Panel_Panel_home');
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
          <h3 className="text-center mt-0 mb-3 mb-md-4 baloo fw-400 fz-28 fz-md-32 text-orange-1">Inicio de sesión automático completado con éxito</h3>
          <h3 className="text-center mt-0 mb-3 mb-md-4 baloo fw-400 fz-28 fz-md-32 text-orange-1">.....</h3>
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-6 col-xl-4">
            </div>
          </div>
        </div>
      </div>
    </Public>
  )
}