import Link from "next/link";
import Paginator from "../../_components/paginator";

export default function FilterSeller({
  handleSubmitFilter,
  nameFilter,
  setNameFilter,
  selectedFilter,
  setSelectedFilter,
  getTotalRegistered,
  excelDowloand
}: any) {
  return (
    <div className="breadcrumb m-0 border-0 rounded-0 py-5 px-md-4 px-lg-5">
      <div className="container py-sm-3">
        <div className="form-filter-banner p-3 px-md-4">
          <form onSubmit={handleSubmitFilter}>
            <div className="row align-items-end">
              <div className="col-lg-4">
                <div className="card bg-success text-white text-center">
                  <div className="card-body">
                    <h3 className="fw-700 my-0 fz-24">
                      {getTotalRegistered}
                    </h3>
                    <p className="mt-2 mb-0 fw-500 fz-16">
                      Vendedores inscritos
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 mt-2 mt-md-4 mt-lg-0">
                <button type="button" onClick={() => excelDowloand()}  className="btn btn-orange-1 d-table mx-auto me-lg-0 baloo text-uppercase fw-400 fz-18 pb-1 px-4 rounded">Descargar CSV</button>
              </div>
            </div>

            <div className="row mt-3 mt-md-4 gx-2 gx-xl-3">
              <div className="col-sm-6 col-md-8 mb-3 mb-lg-0">
                <p className="my-0 baloo fz-16 fz-md-18 text-nowrap text-orange-2">
                  Buscar vendedor
                </p>

                <div className="form-group mt-1 mb-0">
                  <input
                    type="search"
                    placeholder="Buscar vendedor"
                    className="form-control w-100 my-0"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-4 mb-3 mb-lg-0">
                <p className="my-0 baloo fz-16 fz-md-18 text-nowrap text-orange-2">
                  Filtrar por
                </p>

                <div className="form-group mt-1 mb-0">
                  <select
                    className="form-control form-select w-100"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    <option value="" className="d-none">
                      Filtrar por...
                    </option>
                    <option value="">Todos los vendedores</option>
                    <option value="has">Vendedores con anuncios</option>
                    <option value="doesntHave">
                      Vendedores sin anuncios
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-orange-1 d-table mx-auto mt-3 mt-md-4 rounded-3">
              <span className="pe-2 fw-400 baloo">Buscar</span>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
