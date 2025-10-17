import Paginator from "@/app/_components/paginator";
import Link from "next/link";

export default function ListCities({
  toggleModal,
  onclicldDeleteCity,
  apiGetCities,
  loadPage,
  paginatorData,
  currentPage,
}: any) {
  return (
    <div className="px-md-4 px-lg-5">
      <div className="bg-white py-4 py-sm-5">
        <div className="container py-md-3">
          <div className="row">
            {apiGetCities.map((data: any) => (
              <div className="col-sm-6 mb-3 mb-md-4" key={data.city_id}>
                <div className="profile-seller sm-version d-sm-flex align-items-center justify-content-center shadow bg-light p-3 px-md-4 rounded">
                  <div className="info text-center text-sm-start w-100">
                    <h4 className="my-0 text-dark fw-700 fz-18 line-height-normal">
                      {data.city_name}
                    </h4>
                    <p className="mt-2 mb-0 text-dark fw-400 fz-14">
                      Esta ciudad tiene {data.user_count} vendedores
                      registrados
                    </p>
                    <div className="d-flex align-items-center mt-2">
                      <Link href={{ pathname: '/admin/cities/edit', query: { search: data.city_id }, }} className="d-table text-orange-2 fw-700 fz-14">Editar</Link>
                      <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                      <p className="d-table text-orange-2 fw-700 fz-14 cursor-pointer my-0" onClick={() => toggleModal(data.city_id,data.city_name )}>Ver conjuntos asignados</p>
                      <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                      <p onClick={() => onclicldDeleteCity(data.city_id)} className="d-table text-orange-2 fw-700 fz-14 cursor-pointer my-0">Eliminar</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {apiGetCities.length > 0 && (
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
