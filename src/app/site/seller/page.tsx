'use client';
import Public from '@/theme/public';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Rest from '@/libs/rest';
import LatestAdvertisements from './_components/latestAdvertisements';
import { useParams, useSearchParams } from 'next/navigation';
import ShareButtons from '@/app/_components/shareButtons';
import Loading from '@/app/_components/loading';
import ModalError from '@/app/_components/modalError';

interface ProfileInformation {
  fullname: string;
  description: string;
  photo_profile: string;
  number_phone: 0;
  advertisements: [];

}
export default function PublicSeller() {
  const [apiProfileInformation, setProfileInformation] = useState<ProfileInformation>({
    fullname: '',
    description: '',
    photo_profile: '',
    advertisements: [],
    number_phone: 0,
  });
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const [urlLinkProduct, setUrlLinkProduct] = useState(process.env.NEXT_PUBLIC_SERVE + "/site/seller?search="+search);
  const [paginatorData, setPaginatorData] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: '',
    prev_page_url: null,
  });
  const [currentPage, setCurrentPage] = useState(paginatorData.current_page);
  const [apiAdvertisementsData, setApiAdvertisementsData] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');

  const getInformationProfile = (currentPage:number) => {
    let information = new Rest();
    setIsLoading(true);
    information.get('seller/information-by-id/'+search+'/?page='+currentPage)
    .then((responseData:any) => {
      setIsLoading(false);
      if(responseData.success == true) {
        setProfileInformation(responseData.data);
        setApiAdvertisementsData(responseData.data.advertisementsPagination.data);
        setCurrentPage(responseData.data.advertisementsPagination.current_page);
          setPaginatorData({
            current_page: responseData.data.advertisementsPagination.current_page,
            last_page: responseData.data.advertisementsPagination.last_page,
            next_page_url: responseData.data.advertisementsPagination.next_page_url,
            prev_page_url: responseData.data.advertisementsPagination.prev_page_url,
          });
      }
    }).catch((error) => {console.error('Wrong:', error);})
  }

  useEffect(() => {
    getInformationProfile(currentPage);
  },[]);

  const loadPage = (page:number) => {
    getInformationProfile(page);    
    setCurrentPage(page);
  };

  const handleIlikeIt= (id:any) => {
    let favourite = new Rest();
    setIsLoading(true);
    favourite.post('favorite/register',{idAdvertisement:id})
    .then((responseData:any) => {
      setIsLoading(false);
      setmsgApi(responseData.msg);
      getInformationProfile(currentPage);
      if(responseData.success == true) {
        
      } else {
        setShowModalError(true);
      }
    }).catch((error) => {console.error('Wrong:', error);})
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(` `);
    const whatsappLink = `https://wa.me/+57${apiProfileInformation.number_phone}?text=${message}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <Public>
      <div className="bg-white my-3 my-sm-4 my-lg-5 py-5">
      {isLoading === true ?  <Loading></Loading> : null}

      <ModalError 
          showModalError={showModalError}
          setShowModalError={setShowModalError}
          msgApi={msgApi}
      ></ModalError>
        
        <div className="bg-light overflow-hidden py-4 py-sm-5">
          <div className="ps-container pe-container pe-sm-0">
            <div className="row align-items-center justify-content-end justify-content-lg-between">
              <div className="col-lg-8 col-xl-7 pe-sm-0 mt-3 mt-lg-0">
                <div className="profile-seller d-sm-flex align-items-center justify-content-center">
                  <div className="img">
                    <Image src= {process.env.NEXT_PUBLIC_API+apiProfileInformation.photo_profile} alt="" width={500} height={500} />
                  </div>
                  <div className="info text-center text-sm-start mt-4 mt-sm-0 ps-sm-4 pe-sm-3">
                    <h4 className="my-0 text-dark fw-700 fz-24 fz-md-32 fz-lg-36 line-height-normal">{apiProfileInformation.fullname}</h4>

                    <p className="mt-3 text-grey-5 fz-16 fw-300 mb-0">{apiProfileInformation.description}</p>
            
                    <a href="#" onClick={handleWhatsAppShare} className="d-table mx-auto ms-sm-0 mt-3 text-orange-2 fw-700 fz-16">Contactar</a>
                  </div>
                </div>
              </div>
              <div className="col-sm-7 col-md-6 col-lg-4 pe-sm-0 mt-3 mt-lg-0">
                <div className="social-profile p-3 px-sm-4 text-white d-flex align-items-center justify-content-start">
                  <p className="my-0 fw-400 fz-16 baloo me-3 me-lg-4">Compartir:</p>
                  <ShareButtons 
                    urlLink={urlLinkProduct} 
                    userPhone={apiProfileInformation.number_phone}
                     typeShare="profile" 
                     businessName={null}
                     productName={null}
                     ></ShareButtons>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LatestAdvertisements
          apiAdvertisementsData={apiAdvertisementsData}
          loadPage={loadPage}
          paginatorData={paginatorData}
          currentPage={currentPage}
          handleIlikeIt={handleIlikeIt}
        ></LatestAdvertisements>
      </div>
    </Public>
  )
}