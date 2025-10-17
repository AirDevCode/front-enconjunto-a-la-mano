'use client';
import Admin from '@/theme/admin';
import React from 'react';

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminCitiesList() {
  const [showModal, setShowModal] = React.useState(false);
  const [showModalClass, setShowModalClass] = React.useState(false);

  const toggleModal = () => {
    if(showModalClass) {
      setShowModalClass(false);

      setTimeout(() => {
        setShowModal(false);
      }, 500);

    } else {
      setShowModal(true);
      setShowModalClass(true);
    }
  }

  React.useEffect(() => {
    
  }, []);

  return (
    <>
      <Admin>
        <div className="px-md-4 px-lg-5">
          <div className="bg-white py-4 py-sm-5">
            <div className="container py-md-3">
              <h4 className="mb-4 mb-lg-5 baloo fw-400 fz-26 text-grey-6">Administrador / <span className="text-success">Listado de ciudades</span></h4>

              <h3 className="my-0 text-black baloo fw-400 fz-20 fz-sm-24 fz-md-28">Listado de ciudades</h3>
            </div>
          </div>
        </div>

        <div className="breadcrumb m-0 border-0 rounded-0 py-5 px-md-4 px-lg-5">
          <div className="container py-sm-3">
            <div className="form-filter-banner p-3 px-md-4">
              <form action="#" role="search" method="GET">
                <div className="row align-items-end justify-content-center">
                  <div className="col-sm-6">
                    <button type="button" className="btn btn-orange-1 d-table mx-auto ms-lg-0 baloo text-uppercase fw-400 fz-18 pb-1 px-4 rounded">Agregar ciudad</button>
                  </div>
                  <div className="col-sm-6 mt-3 mt-sm-0">
                    <button type="button" className="btn btn-orange-1 d-table mx-auto me-sm-0 baloo text-uppercase fw-400 fz-18 pb-1 px-4 rounded">Descargar CSV</button>
                  </div>

                  <div className="col-sm-8 col-lg-9 mt-3 mt-md-4">
                    <label htmlFor="search" className="my-0 baloo fz-16 fz-md-18 text-nowrap text-orange-2">Buscar ciudad</label>

                    <div className="form-group mt-1 mb-0">
                      <input type="search" name="s" id="search" placeholder="Palabra clave" className="form-control w-100 my-0" />
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

        <div className="px-md-4 px-lg-5">
          <div className="bg-white py-4 py-sm-5">
            <div className="container py-md-3">
              <div className="row">
                <div className="col-sm-6 mb-3 mb-md-4">
                  <div className="profile-seller sm-version d-sm-flex align-items-center justify-content-center shadow bg-light p-3 px-md-4 rounded">
                    <div className="info text-center text-sm-start w-100">
                      <h4 className="my-0 text-dark fw-700 fz-18 line-height-normal">Bogotá</h4>
                      <p className="mt-2 mb-0 text-dark fw-400 fz-14">Esta ciudad tiene 30 vendedores registrados</p>

                      <div className="d-flex align-items-center mt-2">
                        <a href="" className="d-table text-orange-2 fw-700 fz-14">Editar</a>
                        <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                        <p className="d-table text-orange-2 fw-700 fz-14 cursor-pointer my-0" onClick={() => toggleModal()}>Ver conjuntos asignados</p>
                        <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                        <a href="" className="d-table text-orange-2 fw-700 fz-14">Eliminar</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3 mb-md-4">
                  <div className="profile-seller sm-version d-sm-flex align-items-center justify-content-center shadow bg-light p-3 px-md-4 rounded">
                    <div className="info text-center text-sm-start w-100">
                      <h4 className="my-0 text-dark fw-700 fz-18 line-height-normal">Bogotá</h4>
                      <p className="mt-2 mb-0 text-dark fw-400 fz-14">Esta ciudad tiene 30 vendedores registrados</p>

                      <div className="d-flex align-items-center mt-2">
                        <a href="" className="d-table text-orange-2 fw-700 fz-14">Editar</a>
                        <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                        <p className="d-table text-orange-2 fw-700 fz-14 cursor-pointer my-0" onClick={() => toggleModal()}>Ver conjuntos asignados</p>
                        <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                        <a href="" className="d-table text-orange-2 fw-700 fz-14">Eliminar</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3 mb-md-4">
                  <div className="profile-seller sm-version d-sm-flex align-items-center justify-content-center shadow bg-light p-3 px-md-4 rounded">
                    <div className="info text-center text-sm-start w-100">
                      <h4 className="my-0 text-dark fw-700 fz-18 line-height-normal">Bogotá</h4>
                      <p className="mt-2 mb-0 text-dark fw-400 fz-14">Esta ciudad tiene 30 vendedores registrados</p>

                      <div className="d-flex align-items-center mt-2">
                        <a href="" className="d-table text-orange-2 fw-700 fz-14">Editar</a>
                        <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                        <p className="d-table text-orange-2 fw-700 fz-14 cursor-pointer my-0" onClick={() => toggleModal()}>Ver conjuntos asignados</p>
                        <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                        <a href="" className="d-table text-orange-2 fw-700 fz-14">Eliminar</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3 mb-md-4">
                  <div className="profile-seller sm-version d-sm-flex align-items-center justify-content-center shadow bg-light p-3 px-md-4 rounded">
                    <div className="info text-center text-sm-start w-100">
                      <h4 className="my-0 text-dark fw-700 fz-18 line-height-normal">Bogotá</h4>
                      <p className="mt-2 mb-0 text-dark fw-400 fz-14">Esta ciudad tiene 30 vendedores registrados</p>

                      <div className="d-flex align-items-center mt-2">
                        <a href="" className="d-table text-orange-2 fw-700 fz-14">Editar</a>
                        <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                        <p className="d-table text-orange-2 fw-700 fz-14 cursor-pointer my-0" onClick={() => toggleModal()}>Ver conjuntos asignados</p>
                        <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                        <a href="" className="d-table text-orange-2 fw-700 fz-14">Eliminar</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3 mb-md-4">
                  <div className="profile-seller sm-version d-sm-flex align-items-center justify-content-center shadow bg-light p-3 px-md-4 rounded">
                    <div className="info text-center text-sm-start w-100">
                      <h4 className="my-0 text-dark fw-700 fz-18 line-height-normal">Bogotá</h4>
                      <p className="mt-2 mb-0 text-dark fw-400 fz-14">Esta ciudad tiene 30 vendedores registrados</p>

                      <div className="d-flex align-items-center mt-2">
                        <a href="" className="d-table text-orange-2 fw-700 fz-14">Editar</a>
                        <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                        <p className="d-table text-orange-2 fw-700 fz-14 cursor-pointer my-0" onClick={() => toggleModal()}>Ver conjuntos asignados</p>
                        <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                        <a href="" className="d-table text-orange-2 fw-700 fz-14">Eliminar</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3 mb-md-4">
                  <div className="profile-seller sm-version d-sm-flex align-items-center justify-content-center shadow bg-light p-3 px-md-4 rounded">
                    <div className="info text-center text-sm-start w-100">
                      <h4 className="my-0 text-dark fw-700 fz-18 line-height-normal">Bogotá</h4>
                      <p className="mt-2 mb-0 text-dark fw-400 fz-14">Esta ciudad tiene 30 vendedores registrados</p>

                      <div className="d-flex align-items-center mt-2">
                        <a href="" className="d-table text-orange-2 fw-700 fz-14">Editar</a>
                        <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                        <p className="d-table text-orange-2 fw-700 fz-14 cursor-pointer my-0" onClick={() => toggleModal()}>Ver conjuntos asignados</p>
                        <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                        <a href="" className="d-table text-orange-2 fw-700 fz-14">Eliminar</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3 mb-md-4">
                  <div className="profile-seller sm-version d-sm-flex align-items-center justify-content-center shadow bg-light p-3 px-md-4 rounded">
                    <div className="info text-center text-sm-start w-100">
                      <h4 className="my-0 text-dark fw-700 fz-18 line-height-normal">Bogotá</h4>
                      <p className="mt-2 mb-0 text-dark fw-400 fz-14">Esta ciudad tiene 30 vendedores registrados</p>

                      <div className="d-flex align-items-center mt-2">
                        <a href="" className="d-table text-orange-2 fw-700 fz-14">Editar</a>
                        <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                        <p className="d-table text-orange-2 fw-700 fz-14 cursor-pointer my-0" onClick={() => toggleModal()}>Ver conjuntos asignados</p>
                        <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                        <a href="" className="d-table text-orange-2 fw-700 fz-14">Eliminar</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3 mb-md-4">
                  <div className="profile-seller sm-version d-sm-flex align-items-center justify-content-center shadow bg-light p-3 px-md-4 rounded">
                    <div className="info text-center text-sm-start w-100">
                      <h4 className="my-0 text-dark fw-700 fz-18 line-height-normal">Bogotá</h4>
                      <p className="mt-2 mb-0 text-dark fw-400 fz-14">Esta ciudad tiene 30 vendedores registrados</p>

                      <div className="d-flex align-items-center mt-2">
                        <a href="" className="d-table text-orange-2 fw-700 fz-14">Editar</a>
                        <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                        <p className="d-table text-orange-2 fw-700 fz-14 cursor-pointer my-0" onClick={() => toggleModal()}>Ver conjuntos asignados</p>
                        <i className="fa-solid fa-circle mx-2 text-orange-2 fz-6 mb-n1"></i>
                        <a href="" className="d-table text-orange-2 fw-700 fz-14">Eliminar</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Admin>

      {showModal ? (
        <>
          <div className={classNames(!showModalClass ? 'animate__fadeOutDown' : 'animate__fadeInDown', 'modal-custom animate__animated')}>
            <div className="modal-custom-content">
              <div className="modal-custom-dialog">
                <div className="p-3 p-md-4 position-relative">
                  <button type="button" className="btn-close-modal" onClick={() => toggleModal()}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>

                  <h3 className="my-0 text-black fz-22 fz-sm-28 fz-lg-32 fw-400 baloo">Bogotá</h3>

                  <p className="mt-2 mb-3 text-dark fw-400 mb-0">Conjuntos asignados a la ciudad de Bogotá:</p>

                  <ul className="list-group fz-14">
                    <li className="list-group-item text-dark">Conjunto Reservado Santa Ana - I Etapa</li>
                    <li className="list-group-item text-dark">Conjunto Oslo Orienta</li>
                    <li className="list-group-item text-dark">Conjunto Reservado Santa Ana - I Etapa</li>
                    <li className="list-group-item text-dark">Conjunto Oslo Orienta</li>
                    <li className="list-group-item text-dark">Conjunto Reservado Santa Ana - I Etapa</li>
                    <li className="list-group-item text-dark">Conjunto Oslo Orienta</li>
                    <li className="list-group-item text-dark">Conjunto Reservado Santa Ana - I Etapa</li>
                    <li className="list-group-item text-dark">Conjunto Oslo Orienta</li>
                    <li className="list-group-item text-dark">Conjunto Reservado Santa Ana - I Etapa</li>
                    <li className="list-group-item text-dark">Conjunto Oslo Orienta</li>
                    <li className="list-group-item text-dark">Conjunto Reservado Santa Ana - I Etapa</li>
                    <li className="list-group-item text-dark">Conjunto Oslo Orienta</li>
                    <li className="list-group-item text-dark">Conjunto Reservado Santa Ana - I Etapa</li>
                    <li className="list-group-item text-dark">Conjunto Oslo Orienta</li>
                    <li className="list-group-item text-dark">Conjunto Reservado Santa Ana - I Etapa</li>
                    <li className="list-group-item text-dark">Conjunto Oslo Orienta</li>
                    <li className="list-group-item text-dark">Conjunto Reservado Santa Ana - I Etapa</li>
                    <li className="list-group-item text-dark">Conjunto Oslo Orienta</li>
                    <li className="list-group-item text-dark">Conjunto Reservado Santa Ana - I Etapa</li>
                    <li className="list-group-item text-dark">Conjunto Oslo Orienta</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className={classNames(!showModalClass ? 'animate__fadeOut' : 'animate__fadeIn', 'modal-overlay animate__animated')}></div>
        </>
      ) : null}
    </>
  )
}