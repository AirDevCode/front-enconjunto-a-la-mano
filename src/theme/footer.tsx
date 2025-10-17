'use client';
import React from 'react';

export default function ThemeFooter() {
  return (
    <footer className="py-4 py-sm-5">
      <div className="container py-lg-3">
        <div className="row">
          <div className="col-lg-6 col-xl-5">
            <img src={`${process.env.NEXT_PUBLIC_SERVE}/assets/images/logo-blanco.png`} width={200} />
            
            <div className="general-text mt-3 mt-lg-4 fz-14 text-light fw-500 pe-lg-5">
              Miles de aliados a un solo click.
            </div>
          </div>
          <div className="col-lg-6 col-xl-7">
            <div className="row justify-content-between">
              <div className="col-lg-6 mt-4 mt-lg-0">
                <h3 className="title-footer my-0 fw-800 fz-28">Enlaces destacados</h3>
                
                <ul className="list-unstyled mt-3 mb-0 mx-0 py-0 pe-0 ps-3 list-footer text-light fw-500 fz-14">
                  <li><a href="">Añade tu anuncio</a></li>
                  <li><a href="https://www.enconjuntoalamano.com/acerca-de/">Sobre nosotros</a></li>
                  <li><a href="https://www.enconjuntoalamano.com/faq/">FAQ</a></li>
                  <li><a href="">Ayuda</a></li>
                  <li><a href="">Contacto</a></li>
                </ul>
              </div>
              <div className="col-lg-5 mt-4 mt-lg-0">
                <h3 className="title-footer my-0 fw-800 fz-28">Redes sociales</h3>
                
                <ul className="list-unstyled mt-3 mb-0 mx-0 p-0 list-social d-flex align-items-center justify-content-start flex-wrap">
                  <li><a href=""><i className="fa-brands fa-facebook-f"></i></a></li>
                  <li><a href=""><i className="fa-brands fa-instagram"></i></a></li>
                  <li><a href=""><i className="fa-brands fa-twitter"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 mt-4">
            <p className="my-0 fz-14 text-light fw-500">Copyright &copy; 2023 Enconjunto Alamano. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}