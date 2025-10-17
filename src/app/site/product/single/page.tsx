'use client';
import Public from '@/theme/public';
import React, { useEffect, useState } from 'react';
import Rest from '@/libs/rest';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '@/app/_components/loading';
import Photos from './_components/photos';
import Content from './_components/content';
import Ratings from './_components/ratings';
import { useParams, useSearchParams} from 'next/navigation';
import ModalSuccess from '@/app/_components/modalSuccess';
import ModalError from '@/app/_components/modalError';
import Recaptcha from '@/app/_components/recaptcha';
import ShareButtons from '@/app/_components/shareButtons';

interface AdvertisementInfo {
  name: string;
  total_format: string;
  description: string;
  viewed: number;
  photo_qr: string;
  category_name: string;
  category_icon: string;
  user_fullname: string;
  user_description: string;
  user_photo_profile: string;
  id: string;
  user_number_phone:string;
  number_phone:number;
}
export default function PublicProductSingle() {

  const [isLoading, setIsLoading] = useState(Boolean);
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  

  const [apiAdsInformation, setApiAdsInformation] = useState<AdvertisementInfo>(
    {
      name: '' ,
      total_format:'',
      description:'',
      viewed:0,
      photo_qr:'',
      category_name:'',
      category_icon:'',
      user_fullname:'',
      user_description:'',
      user_photo_profile:'',
      id:'',
      user_number_phone:'',
      number_phone:0
  });

  const [photos, setPhotos] = useState<[]>([]);
  const [coverages, setCoverages] = useState([]);
  const [apiRaintingComents, setApiRaintingComents] = useState([]);
  const [apiRaintingTotal, setApiRaintingTotal] = useState('');
  const [ratingComment, setRatingComment] = useState(0);
  const [comment, setComment] = useState('');

  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showButtonCloseModal, setShowButtonCloseModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');
  const [visits, setVisits] = useState(0);

  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [resetCaptchaValid, setResetCaptchaValid] = useState(false);

  const [urlLink, setUrlLink] = useState(process.env.NEXT_PUBLIC_SERVE + "/site/product/single?search="+search);


  const urlShare = process.env.NEXT_PUBLIC_SERVE + "/site/product/single?search="+search;
  
  const informationAdvertisement = () => {
    setIsLoading(true);
    let information = new Rest();
    information.get('advertisement/get-information/'+ search +'?whereDoYouSee=private')
    .then((responseData:any) => {
      setIsLoading(false);
      setApiAdsInformation(responseData.data);
      setPhotos(responseData.data.photos_information);
      setCoverages(responseData.data.coverage_information);
    }).catch((error) => {console.error('Wrong:', error);})
  }

  const getInformationRantings = () => {
    let information = new Rest();
    information.get('comments/all-comments-by-advertisiment/'+search)
    .then((responseData:any) => {
      if(responseData.success == true) {
        setApiRaintingComents(responseData.data.comments);
        setApiRaintingTotal(responseData.data.rainting);
      }
    }).catch((error) => {console.error('Wrong:', error);})
  }

  useEffect(() => {
    informationAdvertisement();
    getInformationRantings();
    saveVisits();
  },[]);

  const handleGetRainting = (starValue:number) => {
    setRatingComment(starValue);
  };

  const handleIlikeIt= (event:any) => {
    let favourite = new Rest();
    setIsLoading(true);
    favourite.post('favorite/register',{idAdvertisement:search})
    .then((responseData:any) => {
      informationAdvertisement();
      setIsLoading(false);
      setmsgApi(responseData.msg);
      if(responseData.success == true) {
        
        //setShowModalSuccess(true);
        //setShowButtonCloseModal(true);
      } else {
        //setShowModalError(true);
      }
    }).catch((error) => {console.error('Wrong:', error);})
    event.preventDefault();

  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    
    if (!isCaptchaValid) {
      setShowModalError(true);
      setmsgApi("Por favor, completa la validación reCAPTCHA.");
      return false;
    }

    let save = new Rest();
    setIsLoading(true);
    save.post('comments/register',{comment:comment,calification:ratingComment,idAdvertisement:search})
    .then((responseData:any) => {
      //whether is true
      setIsLoading(false);
      setmsgApi(responseData.msg);
      if(responseData.success == true) {
        setComment('');
        setRatingComment(0);
        getInformationRantings();
        setResetCaptchaValid((prevKey) => !prevKey);
        setShowModalSuccess(true);
        setShowButtonCloseModal(true);
      } else {
        setShowModalError(true);
      }     
    }).catch((error) => {console.error('Wrong:', error);})
    
  }

  const saveVisits = () => {
    //event.preventDefault();
    let save = new Rest();
    setIsLoading(true);
    save.post('visit_ads/save-adsvisits',{url:urlLink,advertisement_id:search})
    .then((responseData:any) => {
      if(responseData.success == true) {
        setVisits(responseData.data);
        console.log(responseData.data);
      }   
    }).catch((error) => {console.error('Wrong:', error);})
    
  }

  const finalFoto = (photo:any)=>{
    try{
      return photo[0];
    }catch(e){
      return '';
    }
  }

  return (
    <Public>
      <div className="breadcrumb m-0 border-0 rounded-0 py-5">
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

        <div className="container py-sm-3">
          <h1 className="text-white my-0 baloo fw-400 fz-30 fz-sm-36 fz-md-48 fz-lg-60 text-capitalize">{apiAdsInformation.name}</h1>
          <h4 className="mb-0 mt-2 mt-md-3 text-white fw-500 fz-24 fz-sm-32 fz-md-40 fz-lg-48">${apiAdsInformation.total_format}</h4>
        </div>
      </div>

      <div className="bg-white pt-4 pt-sm-5 single-product">
        <div className="container pt-md-3">
          <Photos setPhotos={setPhotos} photos={photos}></Photos>

          <div className="row mt-4 mt-md-5">
            <div className="col-md-4">
              <div className="social-share text-orange-2 d-flex align-items-center justify-content-between p-2 px-md-4">
                  <p className="my-0 fw-400 fz-16 fz-md-18 baloo me-3 me-lg-4">Compartir:</p>

                  <ShareButtons 
                    urlLink={urlShare} 
                    userPhone={apiAdsInformation.user_number_phone} 
                    typeShare="producto" 
                    businessName={apiAdsInformation.user_fullname}
                    productName={apiAdsInformation.name}
                    ></ShareButtons>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Content handleIlikeIt={handleIlikeIt} apiAdsInformation={apiAdsInformation} coverages={coverages} visits={visits}></Content>
      
      <div className="bg-white py-4 py-sm-5">
        <div className="container py-md-3">
          <div className="row justify-content-between gx-lg-4 gx-xl-5">
            <div className="col-lg-6 col-xl-7">
              <h3 className="my-0 text-black fw-400 baloo fz-24">Creador de la publicación</h3>

              <div className="profile-seller md-version d-sm-flex align-items-center justify-content-center mt-4 pt-lg-3">
                <div className="img">
                  {apiAdsInformation.user_photo_profile ? (
                    <Image src={apiAdsInformation.user_photo_profile} alt="Descripción de la imagen" width={500} height={500} />
                  ) : (
                    <div>No se ha proporcionado una URL de imagen válida</div>
                  )}
                </div>
                <div className="info text-center text-sm-start mt-4 mt-sm-0 ps-sm-4 pe-md-4 pe-xl-5">
                  <h4 className="my-0 text-dark fw-700 fz-24 line-height-normal">Hola, soy {apiAdsInformation.user_fullname}</h4>

                  <p className="mt-2 text-grey-5 fz-16 fw-300 mb-0"> {apiAdsInformation.user_description} </p>
                  <div className="d-table mx-auto ms-sm-0 mt-3 text-orange-2 fw-700 fz-16">
                    <Link href={{ pathname: '/site/seller', query: { search: apiAdsInformation.id }, }}>
                      Ver perfil
                    </Link>
                  </div>
                </div>
              </div>

              <h3 className="mb-0 mt-4 mt-md-5 pt-lg-4 pt-xl-5 text-black fw-400 baloo fz-24">Califica tu experiencia</h3>
              <div className="stars d-flex align-items-center justify-content-start mt-4 mt-sm-3 text-grey-7 fz-20 fz-sm-28">
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <i key={starValue} className={`fa-solid fa-star me-2 ${starValue <= ratingComment ? 'text-orange-1' : ''}`} onClick={() => handleGetRainting(starValue)}></i>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="mt-3 mt-md-4">
                <div className="form-group mb-3">
                  <textarea 
                    rows={5} 
                    className="form-control form-control-outline" 
                    placeholder="Deja tu comentario"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="d-table ms-auto mb-3">
                  <Recaptcha isCaptchaValid={isCaptchaValid} setIsCaptchaValid={setIsCaptchaValid} resetCaptchaValid={resetCaptchaValid}></Recaptcha>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-orange-1 baloo fw-400 text-capitalize fz-md-18 pb-1 d-table ms-auto mt-3 px-4 px-lg-5"
                >Enviar</button>
              </form>
            </div>
            <Ratings apiRaintingTotal={apiRaintingTotal} apiRaintingComents={apiRaintingComents}></Ratings>
          </div>
        </div>
      </div>
    </Public>
  )
}