'use client';
import React from 'react';

export default function UserForm({saveData}:any) {
  React.useEffect(()=>{
    // saveData();
  }, [])

  return (
    <>
      <form onSubmit={saveData}>
        This is the form XXX
        <button type="submit">SAVE</button>
      </form>
    </>
  )
}
