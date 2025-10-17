import ButttonWhatsAppShare from "@/app/_components/butttonWhatsAppShare";
import Image from "next/image";

export default function Content({
  handleIlikeIt,
  apiAdsInformation,
  coverages,
  visits
}: any) {
  return (
    <div className="bg-light py-4 py-md-5 info-product">
      <div className="container py-md-3 py-lg-4">
        <div className="row gx-lg-5 align-items-stretch justify-content-between">
          <div className="col-lg-6 col-xl-7">
            <div className="d-table">
              <span className="cat fz-12 d-flex align-items-center fz-12 fw-600 text-grey-2 py-1 px-3">
                <span className="icon me-2">
                  {apiAdsInformation.category_icon ? (
                    <Image
                      src={apiAdsInformation.category_icon}
                      alt="Descripción de la imagen"
                      width={500}
                      height={500}
                      style={{ width: "100%", height: "auto" }}
                    />
                  ) : (
                    <div>No se ha proporcionado una URL de imagen válida</div>
                  )}
                </span>
                {apiAdsInformation.category_name}
              </span>
            </div>

            <h3 className="mt-4 mb-0 text-black fw-400 baloo fz-24">
              Descripción:
            </h3>

            <div className="general-text text-grey-5 fw-400 fz-16 mt-2">
              {apiAdsInformation.description}
            </div>

            <p className="mt-4 mb-0 text-grey-5 fw-400 fz-16">
              <span className="baloo text-black fz-20">Tipo de anuncio:</span>{" "}
              {apiAdsInformation.typead_name}
            </p>

            <div className="d-flex align-items-center justify-content-start mt-4">
              <i className="fa-regular fa-eye text-black fz-20 me-3"></i>
              <p className="my-0 text-grey-5 fw-400 fz-16">
                <span className="baloo text-black fz-20">Visto:</span>{" "}
                {visits}
              </p>
            </div>

            <div className="d-flex align-items-center justify-content-start mt-4">
              <i className="fa-solid fa-location-dot text-black fz-20 me-3"></i>
              <p className="my-0 text-grey-5 fw-400 fz-16">
                {apiAdsInformation.shipping_type == "national_send" ? (
                  <div className="baloo text-black fz-20">
                    <span>Cobertura: </span>
                    <p>Envio nacional</p>
                  </div>
                ) : (
                  
                  <div>
                  <span className="baloo text-black fz-20">
                    <span>Cobertura : Envío a ciudades específicas</span>
                  </span><br></br>
                  <span className="baloo text-black fz-20">
                    {coverages.map((data: any, index: any) => (
                      <span key={index}>
                        {data.name}
                        {index < coverages.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </span>
                  </div>
                  
                )}
              </p>
            </div>
          </div>
          <div className={`col-lg-6 col-xl-4 mt-4 mt-lg-0 d-flex flex-column ${apiAdsInformation.photo_qr ? 'justify-content-between' : ''}`}>
            <div className="d-table mx-auto">
              <ButttonWhatsAppShare phone={apiAdsInformation.user_number_phone} productId ={apiAdsInformation.advertisement_id} productName={apiAdsInformation.name} businessName={apiAdsInformation.user_fullname}></ButttonWhatsAppShare>
            </div>

            {apiAdsInformation.photo_qr ? (
              <Image src={process.env.NEXT_PUBLIC_API + apiAdsInformation.photo_qr} alt="Descripción de la imagen" width={500} height={500} className="d-block mx-auto shadow mt-3 w-75" />
            ) : (
              null
            )}
            <div className="d-table mx-auto mt-3">
              <button
                onClick={handleIlikeIt}
                type="button"
                className="btn btn-outline-success d-flex align-items-center  fz-18 fz-md-22 px-md-4"
                style={{ backgroundColor: apiAdsInformation.favorite === true ? 'green' : 'white' }}
              >
                <span className="icon me-2">
                  <i 
                    className="fa-regular fa-heart fz-22"
                    style={{ color: apiAdsInformation.favorite === true ? 'white' : 'green' }}
                   ></i>
                </span>
                <div style={{ color: apiAdsInformation.favorite === true ? 'white' : 'green' }}>
                Me gusta
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
