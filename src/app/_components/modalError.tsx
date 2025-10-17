'use client';
import React from 'react';

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}
export default function ModalError({showModalError,setShowModalError,msgApi}:any) {
  return (
    <div>
      {showModalError ? (
        <>
        <div className={classNames(!showModalError ? 'animate__fadeOutDown' : 'animate__fadeInDown', 'modal-custom animate__animated')}>
          <div className="modal-custom-content">
            <div className="modal-custom-dialog">
              <div className="p-3 p-md-4 position-relative">
                  <button type="button" className="btn-close-modal fz-26 mt-n2" onClick={() => setShowModalError(false)}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <div   className="icon d-table mx-auto text-warning fz-58" >
                  <i className=""></i>
      
                </div>

     {/* <h3 className="my-0 text-black text-center fz-22 fz-sm-28 fz-lg-32 fw-400 baloo">Error</h3>*/}

                <p className="mt-2 mb-0 text-center text-dark fw-400 mb-0">{msgApi}</p>
                <br></br>
                <div className="col-sm-8 mt-3 mt-sm-0 center" onClick={() => setShowModalError(false)}>
                  <button type="button" className="btn btn-orange-1 d-table mx-auto me-sm-0 baloo text-uppercase fw-400 fz-18 pb-1 px-4 rounded">Aceptar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div  className={classNames(!showModalError ? 'animate__fadeOut' : 'animate__fadeIn', 'modal-overlay animate__animated')}></div>
        </>
      ) : null}
    </div>
  )
}