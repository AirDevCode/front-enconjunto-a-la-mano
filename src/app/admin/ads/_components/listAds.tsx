import Paginator from "@/app/_components/paginator";
import Image from "next/image";
import Link from "next/link";
export default function ListAds({
  apiGetAds,
  loadPage,
  paginatorData,
  currentPage,
}: any) {
  return (
    <div className="px-md-4 px-lg-5">
      <div className="bg-white py-4 py-sm-5">
        <div className="container py-md-3">
          <div className="row">
            {apiGetAds.length > 0 ? (
              apiGetAds.map((data: any) => (
                <div className="col-sm-6 col-lg-4 mb-3 mb-md-4 mb-lg-5" key={data.advertisement_id}>
                  <div className="box-anuncio">
                    <Link href={{ pathname: '/site/product/single', query: { search: data.advertisement_id }, }}>
                      {data.first_photo ? (
                        <div className="img">
                          <Image src={data.first_photo} alt="Descripción de la imagen" width={500} height={500} />
                        </div>
                      ) : null }
                    </Link>
                    <div className="info p-2 p-sm-3 py-lg-4">
                      <Link href={{ pathname: '/site/product/single', query: { search: data.advertisement_id }, }}>
                        <h4 className="my-0 fw-700 fz-20 fz-sm-24 fz-md-28 text-dark title text-capitalize">
                          {data.name}
                        </h4>
                        <p className="price fw-300 text-black mt-3 mb-0 fz-18 fz-md-26">
                          ${data.total_format}
                        </p>
                      </Link>


                      <div className="d-table me-auto mt-1">
                          <span className="cat fz-12 d-flex align-items-center fz-12 fw-600 text-orange-1 py-1 px-3">
                            <span className="icon me-2">
                            {data.category_icon ? (
                              <Image src={data.category_icon} alt="Descripción de la imagen" width={500} height={500} />
                            ) : (
                              <p className="my-0 text-center fz-14">No se ha proporcionado una URL de imagen válida</p>
                            )}
                            </span>
                            {data.category_name}
                          </span>
                        </div>

                      <Link href={{ pathname: '/site/product/single', query: { search: data.advertisement_id }, }}>
                        <div className="general-text mt-2 fz-14 fw-400 text-black">
                          {data.short_description}
                        </div>
                      </Link>

                      <div className="d-table mx-auto mt-3 mt-md-4">
                        <Link href={{ pathname: '/admin/ads/edit', query: { search: data.advertisement_id }, }} className="btn btn-orange-1 baloo fw-400 pb-1 px-4 fz-16 fz-md-18 text-uppercase">
                          Editar anuncion
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="my-0 fz-14">No hay datos disponibles.</div>
            )}
          </div>

          {apiGetAds.length > 0 && (
            <Paginator
              loadPage={loadPage}
              paginatorData={paginatorData}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
