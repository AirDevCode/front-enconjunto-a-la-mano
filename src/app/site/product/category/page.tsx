'use client';
import Public from '@/theme/public';
import React, { useEffect, useState } from 'react';
import FormSearch from './_components/formSearch';
import Rest from '@/libs/rest';
import ListAds from './_components/listAds';
import Loading from '@/app/_components/loading';
import ModalError from '@/app/_components/modalError';
import { useSearchParams } from 'next/navigation';

interface CityData {
  city_id: number;
  city_name: string;
}

export default function PublicCategory() {

  const [name, setName] = useState('');
  const [cityId, setCityId] = useState('');
  const [idEnsamble, setIdEnsamble] = useState('');
  const [idCategory, setIdCategory] = useState('');
  const [apiCityData, setApiCityData] = useState<CityData[]>([]);
  const [apiEnsambleData, setApiEnsambleData] = useState([]);
  const [apiCategoryData, setApiCategoryData] = useState([]);
  const [apiAdvertisementsData, setApiAdvertisementsData] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');
  const [actualPage, setActualPage] = useState(1);

  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const [paginatorData, setPaginatorData] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: '',
    prev_page_url: null,
  });

  const [currentPage, setCurrentPage] = useState(paginatorData.current_page);

  const fetchData = (url: string, setStateFunction: Function,api:string) => {
    setIsLoading(true);
    let list = new Rest();
    list.get(url).then((responseData: any) => {
      setIsLoading(false);
      if(responseData.success == true) {
        let data = [];
        if(api == 'advertisement') {
          data = responseData.data.data; 
          setCurrentPage(responseData.data.current_page);
          setPaginatorData({
            current_page: responseData.data.current_page,
            last_page: responseData.data.last_page,
            next_page_url: responseData.data.next_page_url,
            prev_page_url: responseData.data.prev_page_url,
          });
        } else {
          data = responseData.data;
        }
        
        setStateFunction(data);
      }else{
        setShowModalError(true);
        setmsgApi(responseData.msg);
      }
    }).catch((error) => {
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

  const handleSubmit = (event:any) => {
    fetchData('advertisement/get-all-advertisementsby-category?search='+name+'&city='+cityId+'&ensemble='+idEnsamble+'&category='+search, setApiAdvertisementsData,'advertisement');
    event.preventDefault();
  }

  const handleIlikeIt= (id:any) => {
    let favourite = new Rest();
    setIsLoading(true);
    favourite.post('favorite/register',{idAdvertisement:id})
    .then((responseData:any) => {
      setIsLoading(false);
      setmsgApi(responseData.msg);
      fetchData('advertisement/get-all-advertisementsby-category?search='+name+'&city='+cityId+'&ensemble='+idEnsamble+'&category='+search+'&page='+actualPage, setApiAdvertisementsData,'advertisement');

      if(responseData.success == true) {
      } else {
        setShowModalError(true);
      }
    }).catch((error) => {console.error('Wrong:', error);})
  };

  const loadPage = (page:number) => {
    setActualPage(page);
    fetchData('advertisement/get-all-advertisementsby-category?search='+name+'&city='+cityId+'&ensemble='+idEnsamble+'&category='+search+'&page='+page, setApiAdvertisementsData,'advertisement');
    setCurrentPage(page);
  };

  const clearName = () => {
    setName('');
  }

  const clearCity = () => {
    setCityId('');
  }

  const clearEnsamble = () => {
    setIdEnsamble('');
  }

  const resetForm = () => {
    clearName();
    clearCity();
    clearEnsamble();
  } 

  useEffect(() => {
    loadPage(1);
    fetchData('city/list/everything', setApiCityData,'city');
    fetchData('category/list', setApiCategoryData,'category');
    fetchData('advertisement/get-all-advertisementsby-category?search=&city=&ensemble=&category='+search, setApiAdvertisementsData,'advertisement');
  }, []);
  
  return (
    <Public>
      <div className="breadcrumb m-0 border-0 rounded-0 py-5">

        {isLoading === true ?  <Loading></Loading> : null}

        <ModalError 
          showModalError={showModalError}
          setShowModalError={setShowModalError}
          msgApi={msgApi}
        ></ModalError>

        <div className="container py-sm-3">
          <div className="form-filter-banner p-3 px-md-4">
            <FormSearch
              handleSubmit={handleSubmit}
              handleSelectChange={handleSelectChange}
              setName={setName} name={name}
              setCityId={setCityId} cityId={cityId}
              setIdCategory={setIdCategory} idCategory={idCategory}
              setIdEnsamble={setIdEnsamble} idEnsamble={idEnsamble}
              setApiCityData={setApiCityData} apiCityData={apiCityData}
              setApiEnsambleData={setApiEnsambleData} apiEnsambleData={apiEnsambleData}
              setApiCategoryData={setApiCategoryData} apiCategoryData={apiCategoryData}
              clearName={clearName}
              clearCity={clearCity}
              clearEnsamble={clearEnsamble}
              resetForm={resetForm}
            ></FormSearch>
          </div>
        </div>
      </div>

      <div className="bg-white py-4 py-sm-5">
        <div className="container py-md-3">
          <div className="row gx-lg-5">
            <ListAds
              apiAdvertisementsData={apiAdvertisementsData}
              handleIlikeIt={handleIlikeIt}
              loadPage={loadPage}
              paginatorData={paginatorData}
              currentPage={currentPage}
            ></ListAds>
          </div>
        </div>
      </div>
    </Public>
  )
}