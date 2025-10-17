import Link from "next/link";

export default function FormFilterSet({
  handleSubmit,
  filter,
  setFilter,
  excelDowloand
}: any) {
  return (
    <form onSubmit={handleSubmit} role="search" method="GET">
      <div className="row align-items-end justify-content-center">
        <div className="col-sm-6">
          <Link href={{ pathname: '/admin/sets/create' }} className="btn btn-orange-1 d-table mx-auto ms-lg-0 baloo text-uppercase fw-400 fz-18 pb-1 px-4 rounded">Agregar conjunto</Link>
        </div>
        <div className="col-sm-6 mt-3 mt-sm-0">
          <button type="button" onClick={() => excelDowloand()}  className="btn btn-orange-1 d-table mx-auto me-sm-0 baloo text-uppercase fw-400 fz-18 pb-1 px-4 rounded">Descargar CSV</button>
        </div>

        <div className="col-sm-8 col-lg-9 mt-3 mt-md-4">
          <label htmlFor="search" className="my-0 baloo fz-16 fz-md-18 text-nowrap text-orange-2">Buscar conjunto</label>

          <div className="form-group mt-1 mb-0">
            <input
              id="search"
              type="search"
              name="s"
              placeholder="Palabra clave"
              className="form-control w-100 my-0"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-orange-1 d-table mx-auto mt-3 mt-md-4 rounded-3">
        <span className="pe-2 fw-400 baloo">Buscar</span>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}
