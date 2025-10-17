import Paginator from "@/app/_components/paginator";
import Link from "next/link";

export default function ListSets({
  apiGetSets,
  deleteSet,
  loadPage,
  paginatorData,
  currentPage,
}: any) {
  return (
    <>
      <div className="row">
        {apiGetSets.map((data: any, index: number) => (
          <div className="col-sm-6 col-lg-4 mb-3 mb-md-4" key={data.ensemble_id}>
            <div className="profile-seller sm-version d-sm-flex align-items-center justify-content-center shadow bg-light p-3 px-md-4 rounded">
              <div className="info text-center text-sm-start w-100">
                <h4 className="my-0 text-dark fw-700 fz-18 line-height-normal">
                  {data.ensemble_name}
                </h4>
                <p className="mt-2 mb-0 text-dark fw-400 fz-14">
                  Este conjunto tiene {data.seller_count} vendedores registrados
                </p>
                <div className="d-flex align-items-center mt-2">
                  <Link href={{ pathname: "/admin/sets/edit", query: { search: data.ensemble_id }, }} className="d-table text-orange-2 fw-700 fz-14">Editar</Link>
                  <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                  <p onClick={() => deleteSet(data.ensemble_id)} className="d-table text-orange-2 fw-700 fz-14 my-0 cursor-pointer">Eliminar</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {apiGetSets.length > 0 && (
        <Paginator
          loadPage={loadPage}
          paginatorData={paginatorData}
          currentPage={currentPage}
        />
      )}
    </>
  );
}
