'use client';
import Private from '@/theme/private';
import React, { useEffect, useState } from 'react';
import InformationProfile from './_components/informationProfile';
import ListLastestAds from './_components/listLastestAds';
import Rest from '@/libs/rest';
import Loading from '@/app/_components/loading';
import ModalError from '@/app/_components/modalError';

export default function PrivateMyProfile() {
  const [apiGetInformationUser, setApiInformationUser] = useState({});
  const [apiGetLastestAds, setApiLastestAds] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean);

  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');
  const [urlLink, setUrlLink] = useState('');


  const fetchData = (url: string, setStateFunction: Function,api:string) => {
    let list = new Rest();
    setIsLoading(true);
    list.get(url)
      .then((responseData: any) => {
        if(responseData.success == true) {
          setIsLoading(false);
          if(api == 'ads') {
            setStateFunction(responseData.data.data);
          } else {
            setStateFunction(responseData.data);
            setUrlLink(process.env.NEXT_PUBLIC_SERVE + "/site/seller?search="+responseData.data.id);
          }
        } else {
          //setmsgApi("No hay informacion");
          //setShowModalError(true);
        }
      }).catch((error) => {
        console.error('Wrong:', error);
      });
  };

  useEffect(() => {
    fetchData('seller/information', setApiInformationUser,'seller');
    fetchData('advertisement/all-that-have-been-registered-byuser-logged', setApiLastestAds,'ads');
  },[]);

  return (
    <Private>
      {isLoading === true ?  <Loading></Loading> : null}

      <ModalError 
        showModalError={showModalError}
        setShowModalError={setShowModalError}
        msgApi={msgApi}
      ></ModalError>

      <div className="bg-white pt-4 pt-sm-5">
        <InformationProfile apiGetInformationUser={apiGetInformationUser} urlLink={urlLink}></InformationProfile>
      </div>

      <div className="px-md-4 px-lg-5">
        <ListLastestAds apiGetLastestAds={apiGetLastestAds}></ListLastestAds>
      </div>
    </Private>
  )
}