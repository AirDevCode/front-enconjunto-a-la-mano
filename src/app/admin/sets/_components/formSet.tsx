function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function FormSet({
  handleSubmit,
  name,
  setName,
  deleteSet,
  isEdit,
}: any) {
  return (
    <form onSubmit={handleSubmit} className="w-100">
      <div className="row justify-content-center gx-lg-4 gx-xl-5">
        <div className="col-lg-6">
          <div className="form-group mb-3">
            <input
              type="text"
              placeholder="Nombre del conjunto"
              className="form-control form-control-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <div className="row gx-sm-4 gx-md-5 align-items-center justify-content-center mt-3 mt-md-4">
        <div className="col-sm-6">
          <button type="submit" className={classNames(isEdit ? 'me-sm-0' : '', 'btn btn-orange-1 d-table mx-auto baloo text-uppercase fw-400 fz-18 fz-sm-24 pb-1 px-4 px-md-5')}>
            {isEdit ? 'Guardar cambios' : 'Crear conjunto'}
          </button>
        </div>
        {isEdit ? (
        <div className="col-sm-6 mt-3 mt-sm-0">
          <button type="button" onClick={() => deleteSet()} className="btn btn-outline-orange d-table mx-auto ms-sm-0 baloo text-uppercase fw-400 fz-18 fz-sm-24 pb-1 px-4 px-md-5">
            Eliminar conjunto
          </button>
        </div>
        ) : null}
      </div>
    </form>
  );
}