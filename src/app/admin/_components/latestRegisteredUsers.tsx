import Link from "next/link";
import Paginator from "./paginator";
import Image from "next/image";

export default function LatestRegisteredUsers({
  apiGetLastestSeller,
  loadPageSeller,
  lastPageS,
  currentPageS,
}: any) {
  return (
    <>
      <hr className="mt-4 mt-md-5" />

      <h1 className="my-4 my-lg-5 baloo fw-400 fz-30 fz-sm-36 fz-md-40 text-orange-1 text-center">
        Últimos usuarios <span className="text-grey-6">registrados en plataforma</span>
      </h1>

      <div className="row">
        {apiGetLastestSeller.length > 0 ? (
          apiGetLastestSeller.map((data: any) => (
          <div className="col-sm-6 mb-3 mb-md-4 mb-lg-5" key={data.id + 1}>
            <div className="profile-seller sm-version d-sm-flex align-items-center justify-content-center">
              <div className="img">
                {data.route_photo_profile ? (
                  <Image src={data.route_photo_profile} alt="Descripción de la imagen" width={500} height={500} />
                ) : null }
              </div>

              <div className="info text-center text-sm-start mt-4 mt-sm-0 ps-sm-3">
                <h4 className="my-0 text-dark fw-700 fz-18 line-height-normal">
                  {data.fullname}
                </h4>

                <Link href={{ pathname: "/admin/sellers/edit", query: { search: data.id }, }} className="d-table mx-auto ms-sm-0 mt-2 text-orange-2 fw-700 fz-14">
                  Editar vendedor
                </Link>
              </div>
            </div>
          </div>
          ))
        ) : (
          <p className="my-0 fz-14">No hay datos disponibles.</p>
        )}
      </div>

      {apiGetLastestSeller.length > 0 ? (
        <div className="paginator mt-lg-4">
          <button className="btn btn-nav nav-prev" onClick={() => loadPageSeller(currentPageS - 1)} disabled={currentPageS === 1}>
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <button className="btn btn-nav nav-next" onClick={() => loadPageSeller(currentPageS + 1)} disabled={currentPageS === lastPageS}>
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      ) : null}
    </>
  );
}
