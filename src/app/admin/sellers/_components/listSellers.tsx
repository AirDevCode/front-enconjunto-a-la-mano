import Link from "next/link";
import Image from "next/image";
import Paginator from "@/app/_components/paginator";

export default function ListSellers({
  apiGetSellers,
  loadPage,
  paginatorData,
  currentPage,
}: any) {
  return (
    <div className="px-md-4 px-lg-5">
      <div className="bg-white py-4 py-sm-5">
        <div className="container py-md-3">
          <div className="row">
            {apiGetSellers.map((data: any) => (
              <div className="col-sm-6 mb-3 mb-md-4" key={data.id}>
                <div className="profile-seller sm-version d-sm-flex align-items-center justify-content-center shadow bg-light p-3 px-md-4 rounded">
                  <div className="img">
                    <Image src={data.route_photo_profile} alt="" width={1000} height={1000} />
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
            ))}
          </div>

          {apiGetSellers.length > 0 && (
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
