import Image from "next/image";
import Link from "next/link";

export default function ListLastestAds({ apiGetLastestAds }: any) {
  return (
    <div className="bg-white py-4 py-sm-5">
      <div className="container py-md-3">
        <h1 className="mt-0 mb-4 mb-lg-5 baloo fw-400 fz-30 fz-sm-36 fz-md-40 text-orange-1 text-center">
          Últimos <span className="text-grey-6">anuncios</span>
        </h1>

        <div className="row">
          {apiGetLastestAds.length > 0 ? (
            apiGetLastestAds.slice(0, 9).map((data: any) => (
              <div className="col-sm-6 col-lg-4 mb-3 mb-md-4 mb-lg-5" key={data.advertisement_id}>
                <div className="box-anuncio">
                  <Link href={{ pathname: '/site/product/single', query: { search: data.advertisement_id }, }}>
                    {data.first_photo ? (
                    <div className="img">
                      <Image src={data.first_photo} alt="Descripción de la imagen" width={500} height={500} />
                    </div>
                    ) : null}
                  </Link>
                  <div className="info p-2 p-sm-3 py-lg-4">
                  <Link href={{ pathname: '/site/product/single', query: { search: data.advertisement_id }, }}>
                    <h4 className="my-0 fw-700 fz-20 fz-sm-24 fz-md-28 text-dark title text-capitalize">{data.name}</h4>
                  </Link>
                   
                    <div className="d-table me-auto mt-1">
                      <span className="cat fz-12 d-flex align-items-center fz-12 fw-600 text-orange-1 py-1 px-3">
                        <span className="icon me-2">
                          {data.category_icon ? (
                            <Image src={data.category_icon} alt="Descripción de la imagen" width={500} height={500} />
                          ) : (
                            <div>
                              No se ha proporcionado una URL de imagen válida
                            </div>
                          )}
                        </span>
                        {data.category_name}
                      </span>
                    </div>
                    <Link href={{ pathname: '/site/product/single', query: { search: data.advertisement_id }, }}>
                      <p className="price fw-300 text-black mt-3 mb-0 fz-18 fz-md-26">
                        ${data.total_format}
                      </p>
                      <div className="general-text mt-2 fz-14 fw-400 text-black">
                        {data.description}
                    </div>
                    </Link>
                    <div className="d-table mx-auto mt-3 mt-md-4">
                      <Link href={{ pathname: "/private/profile/ads/edit", query: { search: data.advertisement_id }, }} className="btn btn-orange-1 baloo fw-400 pb-1 px-4 fz-16 fz-md-18 text-uppercase">
                        Editar anuncio
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data-message">No hay anuncios disponibles. Te invitamos a hacerlo para disfrutar de todas las funcionalidades de Enconjunto Alamano.</div>
          )}
        </div>

        {apiGetLastestAds.length > 0 ? (
        <Link
          href={{ pathname: "/private/profile/ads/list" }}
          className="btn btn-orange-1 mt-4 d-table mx-auto fz-sm-20 px-4 px-sm-5"
        >
          Ver todos tus anuncios
        </Link>
        ) : (
          null
        )}

      </div>
    </div>
  );
}
