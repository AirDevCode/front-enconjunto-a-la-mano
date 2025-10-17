'use client';
import Admin from '@/theme/admin';
import React, { useEffect, useState } from 'react';
import InformationProfile from './_components/informationProfile';
import LatestAds from './_components/latestAds';
import LatestRegisteredUsers from './_components/latestRegisteredUsers';
import Rest from '@/libs/rest';
import Loading from '../_components/loading';

export default function AdminHome() {
  const [apiGetInformationUser, setApiInformationUser] = useState({});
  const [apiGetLastestAds, setApiLastestAds] = useState([]);
  const [apiGetLastestSeller, setApiLastestSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [currentPageS, setCurrentPageS] = useState(1);
  const [lastPageS, setLastPageS] = useState(1);

  const fetchData = (url: string, setStateFunction: Function,api:string) => {
    setIsLoading(true);
    let list = new Rest();

    list.get(url)
    .then((responseData: any) => {
      setIsLoading(false);
      if(responseData.success == true){
        if(api== 'listaAds'){
          setStateFunction(responseData.data.data);
          setLastPage(responseData.last_page);
        }else if(api== 'seller'){
          setStateFunction(responseData.data.data);
          setLastPageS(responseData.last_page);
        }else{
          setStateFunction(responseData.data);
        }
      }else{
        //alert("No hay mas informacion")
      }
    }).catch((error) => {
      console.error('Wrong:', error);
    });
  };

  useEffect(() => {
    loadPage(1);
    loadPageSeller(1);
    fetchData('seller/information', setApiInformationUser,'userInformation');
    fetchData('advertisement/latest-that-have-been-registered', setApiLastestAds,'listaAds');
    fetchData('seller/listlatest-that-havebeen-registered', setApiLastestSeller,'seller');
  },[]);

  const loadPage = (page:number) => {
    fetchData('advertisement/latest-that-have-been-registered/?page='+page,setApiLastestAds,'listaAds');
    setCurrentPage(page);
  };

  const loadPageSeller = (page:number) => {
    fetchData('seller/listlatest-that-havebeen-registered/?page='+page,setApiLastestSeller,'listaAds');
    setCurrentPageS(page);
  };

  return (
    <Admin>
      <div className="px-md-4 px-lg-5">
        {isLoading === true ?  <Loading></Loading> : null}

        <div className="bg-white py-4 py-sm-5">
          <div className="container py-md-3">
            <InformationProfile apiGetInformationUser={apiGetInformationUser} />

            <LatestAds 
              apiGetLastestAds={apiGetLastestAds}
              loadPage={loadPage}
              lastPage={lastPage}
              currentPage={currentPage}
            />

            <LatestRegisteredUsers 
              apiGetLastestSeller={apiGetLastestSeller}
              loadPageSeller={loadPageSeller}
              lastPageS={lastPageS}
              currentPageS={currentPageS}
            />
          </div>
        </div>
      </div>
    </Admin>
  )
}