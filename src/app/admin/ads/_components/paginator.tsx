'use client';
import React from 'react';

export default function Paginator() {
  return (
    <div className="paginator mt-lg-4">
      <button className="btn btn-nav nav-prev"><i className="fa-solid fa-angle-left"></i></button>
      <button className="btn btn-number">1</button>
      <button className="btn btn-number current">2</button>
      <button className="btn btn-number">3</button>
      <button className="btn btn-nav nav-next"><i className="fa-solid fa-angle-right"></i></button>
    </div>
  )
}