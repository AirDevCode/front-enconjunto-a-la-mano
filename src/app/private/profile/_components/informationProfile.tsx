'use client';
import ShareButtons from '@/app/_components/shareButtons';
import Image from 'next/image';

export default function InformationProfile({apiGetInformationUser,urlLink}:any) {
  return (
    <div className="ps-container pe-container pe-sm-0">
      <h3 className="mt-0 mb-4 text-black baloo fw-400 fz-20 fz-sm-24 fz-md-28">Perfil del vendedor</h3>
      
      <div className="row align-items-center justify-content-end justify-content-lg-between">
        <div className="col-lg-8 col-xl-7 pe-sm-0 mt-3 mt-lg-0">
          <div className="profile-seller md-version d-sm-flex align-items-center justify-content-center">
            {apiGetInformationUser.photo_profile ? (
              <div className="img">
                <Image
                  src={process.env.NEXT_PUBLIC_API + apiGetInformationUser.photo_profile}
                  alt="Descripción de la imagen"
                  width={500}
                  height={500}
                />
              </div>
            ) : null }
            <div className="info text-center text-sm-start mt-4 mt-sm-0 ps-sm-4 pe-sm-3">
              <h4 className="my-0 text-dark fw-700 fz-24 fz-md-32 line-height-normal">{apiGetInformationUser.fullname}</h4>

              <p className="mt-3 text-grey-5 fz-16 fw-300 mb-0">{apiGetInformationUser.description}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-7 col-md-6 col-lg-4 pe-sm-0 mt-3 mt-lg-0">
          <div className="social-profile p-3 px-sm-4 text-white d-flex align-items-center justify-content-start">
            <p className="my-0 fw-400 fz-16 baloo me-3 me-lg-4">Compartir:</p>
              <ShareButtons 
                urlLink={urlLink} 
                userPhone={apiGetInformationUser.number_phone} 
                typeShare="profile"
                businessName={null}
                productName={null}
                ></ShareButtons>
          </div>
        </div>
      </div>
    </div>
  )
}