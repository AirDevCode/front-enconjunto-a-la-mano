import Image from 'next/image';

export default function InformationProfile({apiGetInformationUser}:any) {
  return (
    <div className="row align-items-center justify-content-end justify-content-lg-between">
      <div className="col-lg-8 col-xl-7 pe-sm-0 mt-3 mt-lg-0">
        <div className="profile-seller md-version d-sm-flex align-items-center justify-content-center">
          <div className="img">
            {apiGetInformationUser.photo_profile ? (
              <Image src={`${process.env.NEXT_PUBLIC_API}${apiGetInformationUser.photo_profile}`} alt="Descripción de la imagen" width={500} height={500} />
            ) : null }
          </div>
          <div className="info text-center text-sm-start mt-4 mt-sm-0 ps-sm-4 pe-sm-3">
            <h4 className="my-0 text-dark fw-700 fz-24 fz-md-32 line-height-normal">Hola {apiGetInformationUser.fullname}</h4>
          </div>
        </div>
      </div>
      <div className="col-sm-7 col-md-6 col-lg-4 pe-sm-0 mt-3 mt-lg-0">
        <div className="bg-success d-table mx-auto me-sm-0 pt-2 pb-1 pb-md-2 px-3 px-md-4 rounded">
          <h5 className="text-white baloo fz-24 fw-400 my-0">Administrador</h5>
        </div>
      </div>
    </div>
  )
}