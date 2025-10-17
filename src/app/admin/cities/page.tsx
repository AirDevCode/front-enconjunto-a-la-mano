'use client';
import Admin from '@/theme/admin';
import React, { useState } from 'react';
import FormFilter from './_components/formFilter';
import ListCities from './_components/listCities';
import Rest from '@/libs/rest';
import Loading from '@/app/_components/loading';
import ModalError from '@/app/_components/modalError';
import ModalDelete from '@/app/_components/modalDelete';
import Paginator from '@/app/_components/paginator';

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminCitiesList() {

  const [idCity, setIdCity] =  useState('');
  const [nameFilter, setNameFilter] =  useState('');
  const [apiGetCities, setApiGetCities] =  useState([]);
  const [apiGetEnsambles, setApiGetEnsambles] =  useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [showModalClass, setShowModalClass] = React.useState(false);

  const [isLoading, setIsLoading] = useState(Boolean);
  const [paginatorData, setPaginatorData] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: '',
    prev_page_url: null,
  });

  const [paginatorDataInformation, setPaginatorDataInformation] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: '',
    prev_page_url: null,
  });
  const [currentPageInformation, setCurrentPageInformation] = useState(paginatorDataInformation.current_page);
  const [currentPage, setCurrentPage] = useState(paginatorData.current_page);

  const [showModalError, setShowModalError] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [msgApi, setmsgApi] = useState('');
  const [nameCity, setNameCity] = useState('');

  
  const fetchData = (url: string, setStateFunction: Function) => {
    setIsLoading(true);
    let list = new Rest();
    list.get(url).then((responseData: any) => {
    setIsLoading(false);
    setmsgApi(responseData.msg);
    if(responseData.success == true ) {
      setCurrentPage(responseData.data.current_page);
      setPaginatorData({
        current_page: responseData.data.current_page,
        last_page: responseData.data.last_page,
        next_page_url: responseData.data.next_page_url,
        prev_page_url: responseData.data.prev_page_url,
       });
       setStateFunction(responseData.data.data);
    } else {
      setShowModalError(true);
    }
    }).catch((error) => {
          console.error('Wrong:', error);
      });
  };

  const getInformationCity = (cityId:string, page:number) => {
    let list = new Rest();
    setIsLoading(true);
    list.get('city/get-information/'+cityId+'/?page='+page)
    .then((responseData:any) => {
      setIsLoading(false);
      setApiGetEnsambles(responseData.data.ensamblespagination.data);
      setCurrentPageInformation(responseData.data.ensamblespagination.current_page);
      setPaginatorDataInformation({
        current_page: responseData.data.ensamblespagination.current_page,
        last_page:    responseData.data.ensamblespagination.last_page,
        next_page_url:responseData.data.ensamblespagination.next_page_url,
        prev_page_url:responseData.data.ensamblespagination.prev_page_url,
       });
    }).catch((error) => {console.error('Wrong:', error);})
  }

  const permanentlyDelete = () => {
    let remove = new Rest();
    setIsLoading(true);
    remove.delete('city/remove/'+idCity)
    .then((responseData:any) => {
      if(responseData.success == true) {
        setIsLoading(false);
        setShowModalDelete(false)
        fetchData('city/list-pagination/everything',setApiGetCities);
      }
    }).catch((error) => {console.error('Wrong:', error);})
  }
  const onclicldDeleteCity = (setId:string) => {
    setShowModalDelete(true);
    setIdCity(setId);
  };

  const toggleModal = (cityId:string,nameCiTy:string) => {
    setNameCity(nameCiTy);
    setIdCity(cityId);
    if(showModalClass) {
      setShowModalClass(false);
      setTimeout(() => {
        setShowModal(false);
      }, 500);
    } else {
      getInformationCity(cityId,1);
      setShowModal(true);
      setShowModalClass(true);
    }
  }

  const handleSubmitFilter = (event:any) => {
    let filter = nameFilter ? nameFilter : 'everything';
    fetchData('city/list-pagination/'+filter,setApiGetCities);
    event.preventDefault();
  };

  React.useEffect(() => {
    loadPage(1);
    let filter = nameFilter ? nameFilter : 'everything';
    fetchData('city/list-pagination/'+filter,setApiGetCities);
  }, []);

  const loadPage = (page:number) => {
    let filter = nameFilter ? nameFilter : 'everything';
    fetchData('city/list-pagination/'+filter+'/?page='+page,setApiGetCities);
    setCurrentPage(page);
  };

  const loadPageInformation = (page:number) => {
    getInformationCity(idCity,page);
    setCurrentPageInformation(page);
  };

  const excelDowloand = () => {
    const downloadLink = process.env.NEXT_PUBLIC_API + 'city/dowloand-excel';
    window.location.href = downloadLink;
  }


  return (
    <>
      <Admin>
        <div className="px-md-4 px-lg-5">
          {isLoading === true ?  <Loading /> : null}

          <ModalError 
            showModalError={showModalError}
            setShowModalError={setShowModalError}
            msgApi={msgApi}
          />

          <ModalDelete 
            showModalDelete={showModalDelete}
            setShowModalDelete={setShowModalDelete}
            permanentlyDelete={permanentlyDelete}
            msg={'esta ciudad'}
          />
          
          <div className="bg-white py-4 py-sm-5">
            <div className="container py-md-3">
              <h4 className="mb-4 mb-lg-5 baloo fw-400 fz-26 text-grey-6">Administrador / <span className="text-success">Listado de ciudades</span></h4>
              <h3 className="my-0 text-black baloo fw-400 fz-20 fz-sm-24 fz-md-28">Listado de ciudades</h3>
            </div>
          </div>
        </div>

        <FormFilter handleSubmitFilter={handleSubmitFilter} nameFilter={nameFilter} setNameFilter={setNameFilter} excelDowloand={excelDowloand} />

        <ListCities 
          toggleModal={toggleModal}
          onclicldDeleteCity={onclicldDeleteCity}
          apiGetCities={apiGetCities}
          loadPage={loadPage}
          paginatorData={paginatorData}
          currentPage={currentPage}
        />
      </Admin>

      {showModal ? (
        <>
          <div className={classNames(!showModalClass ? 'animate__fadeOutDown' : 'animate__fadeInDown', 'modal-custom animate__animated')}>
            <div className="modal-custom-content">
              <div className="modal-custom-dialog">
                <div className="p-3 p-md-4 position-relative">
                  <button type="button" className="btn-close-modal" onClick={() => toggleModal('2','')}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <h3 className="my-0 text-black fz-22 fz-sm-28 fz-lg-32 fw-400 baloo">{nameCity}</h3>
                  <p className="mt-2 mb-3 text-dark fw-400 mb-0">Conjuntos asignados a la ciudad de {nameCity}:</p>
                  <ul className="list-group fz-14">
                    {apiGetEnsambles.map((data:any) => (
                      <li className="list-group-item text-dark"  key={data.ensemble_id}>{data.name}</li>
                    ))}
                  </ul>
                  <Paginator
                    loadPage={loadPageInformation}
                    paginatorData={paginatorDataInformation}
                    currentPage={currentPageInformation}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div  className={classNames(!showModalClass ? 'animate__fadeOut' : 'animate__fadeIn', 'modal-overlay animate__animated')}></div>
        </>
      ) : null}
    </>
  )
}