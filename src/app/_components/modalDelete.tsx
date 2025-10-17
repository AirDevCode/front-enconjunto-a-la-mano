'use client';

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}
export default function ModalDelete({showModalDelete,setShowModalDelete,permanentlyDelete,msg}:any) {
  return (
    <div>
    {showModalDelete ? (
      <>
        <div className={classNames(!showModalDelete ? 'animate__fadeOutDown' : 'animate__fadeInDown', 'modal-custom animate__animated')}>
          <div className="modal-custom-content">
            <div className="modal-custom-dialog">
              <div className="p-3 p-md-4 position-relative">
                  <button type="button" className="btn-close-modal fz-26 mt-n2" onClick={() => setShowModalDelete(false)}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
             
                <div className="icon d-table mx-auto text-danger fz-58">
                  <i className="fa-regular fa-circle-xmark"></i>
                </div>
                <h3 className="my-0 text-black text-center fz-22 fz-sm-28 fz-lg-32 fw-400 baloo"></h3>
                <p className="mt-2 mb-0 text-center text-dark fw-400 mb-0">¿Está seguro de que desea eliminar {msg}?</p><br></br>
                <div className="d-flex align-items-center mt-2">
                  <div className="col-sm-5 mt-3 mt-sm-0 center" onClick={() => permanentlyDelete()}>
                    <button type="button" className="btn btn-orange-1 d-table mx-auto me-sm-0 baloo text-uppercase fw-400 fz-18 pb-1 px-4 rounded">Aceptar</button>
                  </div>
                  <div className="col-sm-5 mt-3 mt-sm-0 center" onClick={() => setShowModalDelete(false)}>
                    <button type="button" className="btn btn-orange-1 d-table mx-auto me-sm-0 baloo text-uppercase fw-400 fz-18 pb-1 px-4 rounded">Cancelar</button>
                  </div>
                </div>
                
              </div>
              
            </div>
          </div>
        </div>
        <div  className={classNames(!showModalDelete ? 'animate__fadeOut' : 'animate__fadeIn', 'modal-overlay animate__animated')}></div>
      </>
      ) : null}
   
   </div>
      
  )
}