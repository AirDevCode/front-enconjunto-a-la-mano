import Image from 'next/image';

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function FormCategory({
  handleSubmit,
  name,
  setName,
  icon,
  deleteCategory,
  isUpdate,
  handleFileChange,
}: any) {

  return (
    <form onSubmit={handleSubmit} className="w-100">
      <div className="row align-items-center gx-lg-4 gx-xl-5">
        <div className="col-lg-6">
          <div className="form-group mb-3">
            <input
              type="text"
              placeholder="Nombre de la categoría"
              className="form-control form-control-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
                className="form-control form-control-outline"
                type="file"
                id="formFile"
                accept="image/*"
                onChange={handleFileChange}
                
              />
              <label htmlFor="formFile">Cargar icono</label>
          </div>

          <div className="form-group mb-3">
            <div className="row gx-sm-4 gx-md-5 align-items-center justify-content-center mt-3 mt-md-4">
              <div className="col-sm-6">
                <button type="submit" className={classNames(isUpdate ? 'me-sm-0' : '', 'btn btn-orange-1 d-table mx-auto baloo text-uppercase fw-400 fz-18 fz-sm-20 pb-1 px-4 px-md-3')}>
                  {isUpdate ? 'Guardar cambios' : 'Crear categoría'}
                </button>
              </div>
              {isUpdate ? (
                <div className="col-sm-6 mt-3 mt-sm-0">
                  <button type="button" onClick={() => deleteCategory()} className="btn btn-outline-orange d-table mx-auto ms-sm-0 baloo text-uppercase fw-400 fz-18 fz-sm-20 pb-1 px-4 px-md-3">
                    Eliminar categoría
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="col-lg-6 mt-4 mt-lg-0">
          {icon ? (
            <div className="row gx-1 gx-sm-2 gx-lg-3 grid-photos">
              <div className="col-5 mb-1 mb-sm-2 mb-lg-3">
              <i className="fa-solid fa-xmark text-white delete-img"></i>
                <div className="grid">
                  <Image
                    src={process.env.NEXT_PUBLIC_API + icon}
                    alt=""
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="row gx-1 gx-sm-2 gx-lg-3 grid-photos">
              <div className="col-5 mb-1 mb-sm-2 mb-lg-3">
                <div className="grid">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SERVE}/assets/images/icono.jpg`}
                    alt=""
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        
      </div>

      
    </form>
  );
}
