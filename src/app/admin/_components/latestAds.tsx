import Link from "next/link";
import Paginator from "./paginator";
import Image from "next/image";

export default function LatestAds({
  apiGetLastestAds,
  loadPage,
  lastPage,
  currentPage,
}: any) {
  return (
    <>
      <h1 className="my-4 my-lg-5 baloo fw-400 fz-30 fz-sm-36 fz-md-40 text-orange-1 text-center">
        Últimos anuncios <span className="text-grey-6">subidos en plataforma</span>
      </h1>

      <div className="row">
        {apiGetLastestAds.length > 0 ? (
          apiGetLastestAds.map((data: any) => (
            <div className="col-sm-6 col-lg-4 mb-3 mb-md-4 mb-lg-5" key={data.advertisement_id}>
              <div className="box-anuncio">
                <Link href={{ pathname: '/site/product/single', query: { search: data.advertisement_id }, }}>
                  <div className="img">
                    {data.first_photo ? (
                      <Image src={data.first_photo} alt="Descripción de la imagen" width={500} height={500} />
                    ) : null }
                  </div>
                  </Link>
                <div className="info p-2 p-sm-3 py-lg-4">
                  <Link href={{ pathname: '/site/product/single', query: { search: data.advertisement_id }, }}>
                    <h4 className="my-0 fw-700 fz-20 fz-sm-24 fz-md-28 text-dark title text-capitalize">
                      {data.name}
                    </h4>
                  </Link>

                  <div className="d-table me-auto mt-1">
                    <span className="cat fz-12 d-flex align-items-center fz-12 fw-600 text-orange-1 py-1 px-3">
                      <span className="icon me-2">
                        {data.category_icon ? (
                          <Image src={data.category_icon} alt="Descripción de la imagen" width={500} height={500} />
                        ) : null }
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
                    <Link href={{ pathname: "/admin/ads/edit", query: { search: data.advertisement_id }, }} className="btn btn-orange-1 baloo fw-400 pb-1 px-4 fz-16 fz-md-18 text-uppercase">
                      Editar anuncio
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data-message">No hay datos disponibles.</div>
        )}
      </div>

      {apiGetLastestAds.length > 0 ? (
        <div className="paginator mt-lg-4">
          <button
            className="btn btn-nav nav-prev"
            onClick={() => loadPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <button
            className="btn btn-nav nav-next"
            onClick={() => loadPage(currentPage + 1)}
            disabled={currentPage === lastPage}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      ) : null}
    </>
  );
}
