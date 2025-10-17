'use client';
import React from 'react';
import { ColorRing } from  'react-loader-spinner';

export default function Loading() {
  return (
    <div className="loading-overlay">
      <ColorRing
        visible={true}
        height="140"
         width="140"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="d-table mx-auto"
        colors={['#E67926', '#CF5928', '#ffdc54', '#E67926', '#ffdc54']}
      />
    </div>
  )
}