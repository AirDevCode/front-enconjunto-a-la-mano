

export default function FormCreate({
  handleSubmit,
  onclicldDeleteCity,
  handleEnsembleSelection,
  apiGetEnsambles,
  selectedEnsembles,
  city,
  setCity,
}: any) {
  return (
    <form onSubmit={handleSubmit} className="w-100">
      <div className="row justify-content-center gx-lg-4 gx-xl-5">
        <div className="col-lg-6">
          <div className="form-group mb-3">
            <input type="text" placeholder="Nombre de la ciudad" className="form-control form-control-outline" value={city} onChange={(e) => setCity(e.target.value)} required />
          </div>
          <div className="form-group mb-3">
            <p className="mt-0 mb-2 baloo fz-16 fz-md-18 text-nowrap text-orange-2">
              Asignar conjunto
            </p>

            <div className="form-group mb-3 scroll-sets">
              <div className="row mt-1">
              {apiGetEnsambles.map((data: any) => (
                <div className="col-sm-6 mb-3" key={data.ensemble_id}>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={selectedEnsembles.includes(data.ensemble_id)} id={data.ensemble_id} onChange={() => handleEnsembleSelection(data.ensemble_id)} />
                    <label className="form-check-label my-0 text-dark fw-400" htmlFor={data.ensemble_id} >
                      {data.ensemble_name}
                    </label>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row gx-sm-4 gx-md-5 align-items-center justify-content-center mt-3 mt-md-4">
        <div className="col-sm-6">
          <button type="submit" className="btn btn-orange-1 d-table mx-auto baloo text-uppercase fw-400 fz-18 fz-sm-24 pb-1 px-4 px-md-5">
            Guardar cambios
          </button>
        </div>
      </div>
    </form>
  );
}
