import Paginator from "@/app/_components/paginator";
import Image from "next/image";
import Link from "next/link";

export default function ListCategories({
  apiGetCategories,
  deleteCategory,
  loadPage,
  paginatorData,
  currentPage,
}: any) {
  return (
    <>
      <div className="row">
        {apiGetCategories.map((data: any, index: number) => (
          <div className="col-sm-6 mb-3 mb-md-4" key={index}>
            <div className="profile-seller sm-version d-sm-flex align-items-center justify-content-center shadow bg-light p-3 px-md-4 rounded">
              <div className="img bg-orange-2">
                <Image src={data.route} alt="" width={200} height={200} />
              </div>
              <div className="info text-center text-sm-start mt-4 mt-sm-0 ps-sm-3">
                <h4 className="my-0 text-dark fw-700 fz-18 line-height-normal">
                  {data.category_name}
                </h4>

                <p className="mt-2 mb-0 text-dark fw-400 fz-14">
                  Esta categoría tiene {data.advertisement_count} anuncios.
                </p>

                <div className="d-flex align-items-center mt-2">
                  <Link href={{ pathname: "/admin/categories/edit", query: { search: data.category_id }, }} className="d-table text-orange-2 fw-700 fz-14">Editar</Link>
                  <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                  <p onClick={() => deleteCategory(data.category_id)} className="d-table text-orange-2 fw-700 fz-14 my-0 cursor-pointer">Eliminar</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {apiGetCategories.length > 0 && (
        <Paginator
          loadPage={loadPage}
          paginatorData={paginatorData}
          currentPage={currentPage}
        />
      )}
    </>
  );
}
