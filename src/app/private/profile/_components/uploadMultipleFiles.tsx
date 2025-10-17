import Rest from '@/libs/rest';
import Image from 'next/image';
import React, { useState } from 'react';
import Loading from '@/app/_components/loading';
import ModalError from '@/app/_components/modalError';

function UploadMultipleFiles({ photos, setPhotos }: { photos: string[], setPhotos: React.Dispatch<React.SetStateAction<string[]>> }) {

  const [isLoading, setIsLoading] = useState(Boolean);
  const maxDatos = 6;
  const [showModalError, setShowModalError] = useState(false);
  const [msgApi, setmsgApi] = useState('');

  const deleteFile = (index:number) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  }

  const addFile = (e:any) => {
    e.preventDefault();
    setIsLoading(true);

    const selectedFile = e.target.files[0];
    // Check file size
    const maxSize = 6 * 1024 * 1024; // 6 MB in bytes
    const minSize = 0 * 1024 * 1024; // 2 MB in bytes

    if (selectedFile.size < minSize || selectedFile.size > maxSize) {
      setIsLoading(false);
      setmsgApi(
        `El tamaño permitido es hasta 6 MB. El archivo seleccionado tiene ${(
          selectedFile.size / (1024 * 1024)
        ).toFixed(2)} MB.`
      );
      setShowModalError(true);
      return;
    }

    let file= new Rest();
    file.file('resource/save-file',e.target.files[0],'sellers')
    .then((responseData:any) => {
    setIsLoading(false);
    if(responseData.success == true){
      const maxDatos = 8;
      e.target.value = null;
      if(photos.length < maxDatos) {
        setPhotos((prevData) => [...prevData, responseData.data.rutaFin]);
      } else {
        setmsgApi('No se pueden agregar más de 6 datos.');
        setShowModalError(true);
        //alert('No se pueden agregar más de 6 datos.');
      }
    }else{
        //alert(responseData.msg);
        setmsgApi(responseData.msg);
        setShowModalError(true);
    }})
    .catch((error) => {
      console.error('Wrong:', error);
    })
  };
  
  return (
    <div className="col-lg-6 mt-4 mt-lg-0">
      {isLoading === true ?  <Loading /> : null}

      <ModalError 
        showModalError={showModalError}
        setShowModalError={setShowModalError}
        msgApi={msgApi}
      />

      {photos.length > 0 ? (
      <div className="row gx-1 gx-sm-2 gx-lg-3 grid-photos">
        {photos.map((data, index) => (
        <div className="col-4 mb-1 mb-sm-2 mb-lg-3" key={index}>
          <div className="grid">
            <i className="fa-solid fa-xmark text-white delete-img" onClick={() => deleteFile(index)}></i>

            <Image src={process.env.NEXT_PUBLIC_API + data } alt="Descripción de la imagen" width={500} height={500} />
          </div>
        </div>
        )
      )}
      </div>
      ) : null }
      
      <div className="form-group mb-3">
        <input 
          className="form-control form-control-outline" 
          placeholder="Agregar fotos"  accept=".jpg, .jpeg, .png"  type="file" id="photos_ad" onChange={(e) => addFile(e)} />
        <label htmlFor="photos_ad">Cargar más fotos</label>
      </div>
    </div>
  )
}

export default UploadMultipleFiles;
