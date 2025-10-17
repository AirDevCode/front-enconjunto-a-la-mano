'use client';
import Private from '@/theme/private';
import React from 'react';

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function PrivateProfileAdsDetail() {
  return (
    <Private>
      <div className="px-md-4 px-lg-5">
        <div className="bg-white py-4 py-sm-5">
          <div className="container py-md-3">
            <h4 className="mb-4 mt-0 baloo fw-400 fz-26 text-grey-6">Perfil / Mis Favoritos / <span className="text-success">Detalle del anuncio</span></h4>

            <h1 className="mb-4 text-orange-1 baloo text-uppercase fw-400 fz-18 fz-sm-28 fz-md-38">Detalle del anuncio</h1>
              
            <form action="" className="w-100">
              <div className="row gx-lg-4 gx-xl-5">
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <p className="form-control form-control-outline my-0">Activado</p>
                  </div>
                  <div className="form-group mb-3">
                    <p className="form-control form-control-outline my-0">Negocio</p>
                  </div>
                  <div className="form-group mb-3">
                    <p className="form-control form-control-outline my-0">Zapatillas para correr</p>
                  </div>
                  <div className="form-group mb-3">
                    <p className="form-control form-control-outline my-0">Ropa deportiva</p>
                  </div>
                  <div className="form-group mb-3">
                    <p className="form-control form-control-outline my-0">$100.000</p>
                  </div>
                  <div className="form-group mb-3">
                    <input className="form-control form-control-outline" placeholder="Subir QR Daviplata" type="file" id="qr_daviplata" disabled />
                    <label htmlFor="qr_daviplata">Subir QR Daviplata</label>
                  </div>

                  <div className="row gx-1 gx-sm-2 gx-lg-3 grid-photos">
                    <div className="col-6 mb-1 mb-sm-2 mb-lg-3">
                      <div className="grid">
                        <i className="fa-solid fa-xmark text-white delete-img"></i>

                        <img src={`${process.env.NEXT_PUBLIC_SERVE}/assets/images/qr.jpg`} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <p className="form-control form-control-outline my-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia in maiores voluptatum accusamus vel dignissimos.</p>
                  </div>
                  <div className="form-group mb-3">
                    <div className="row align-items-start justify-content-between">
                      <div className="col-sm-auto">
                        <div className="form-check form-check-reverse text-start my-0 line-height-normal">
                          <input className="form-check-input" name="type_send" type="radio" id="national_send" disabled />
                          <label className="form-check-label text-dark fw-400" htmlFor="national_send">
                            Envío nacional
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-auto mt-3 mt-sm-0">
                        <div className="form-check form-check-reverse text-start my-0 line-height-normal">
                          <input className="form-check-input" name="type_send" type="radio" id="cities_send" disabled checked />
                          <label className="form-check-label text-dark fw-400" htmlFor="cities_send">
                            Envío a ciudades específicas
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <div className="row align-items-center gx-2">
                      <div className="col-sm-6 mb-2">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="city" id="city_1" checked disabled />
                          <label className="form-check-label text-dark fw-400" htmlFor="city_1">
                            Bogotá
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-6 mb-2">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="city" id="city_3" checked disabled />
                          <label className="form-check-label text-dark fw-400" htmlFor="city_3">
                            Medellín
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-6 mb-2">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="city" id="city_4" checked disabled />
                          <label className="form-check-label text-dark fw-400" htmlFor="city_4">
                            Cali
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-4 mt-lg-0">
                  <div className="row gx-1 gx-sm-2 gx-lg-3 grid-photos">
                    <div className="col-4 mb-1 mb-sm-2 mb-lg-3">
                      <div className="grid">
                        <i className="fa-solid fa-xmark text-white delete-img"></i>

                        <img src={`${process.env.NEXT_PUBLIC_SERVE}/assets/images/ad-2.jpg`} />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <input className="form-control form-control-outline" placeholder="Subir QR Daviplata" type="file" id="photos_ad" multiple required disabled />
                    <label htmlFor="photos_ad">Cargar más fotos</label>
                  </div>
                </div>
              </div>

              <div className="row gx-sm-4 gx-md-5 align-items-center justify-content-center mt-3 mt-md-4">
                <div className="col-sm-6">
                  <button type="button" className="btn btn-orange-1 d-table mx-auto baloo text-uppercase fw-400 fz-18 fz-sm-24 pb-1 px-4 px-md-5">Volver</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Private>
  )
}