import React from 'react';

const ShareButtons = ({ urlLink, userPhone , typeShare,businessName,productName}:any) => {
  const shareOnFacebook = () => {
    const encodedUrl = encodeURIComponent(`${urlLink}`);
    if(typeShare == 'profile'){
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
    }else{
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
    }
  };

  const shareOnWhatsApp = () => {
    if(typeShare == 'profile'){

      const url = window.location.href;
      const text = `¡Hola! Quería compartir contigo mi perfil en el que puedes encontrar algunos de los productos que tengo disponibles. Aquí está el enlace : ${urlLink}`;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}%20${encodeURIComponent(urlLink)}`;
      window.open(whatsappUrl, '_blank');
    }else{

      const url = window.location.href;
      const text =  productName;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}%20${encodeURIComponent(urlLink)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <>
    <ul className="social m-0 p-0 list-unstyled d-flex align-items-center justify-content-start flex-wrap">
      <li><a href="#" onClick={shareOnFacebook}><i className="fa-brands fa-facebook-f"></i></a></li>
     {/* <li><a href="#" onClick={shareOnInstagram}><i className="fa-brands fa-instagram"></i></a></li>*/}
      <li><a href="#" onClick={shareOnWhatsApp}><i className="fa-brands fa-whatsapp"></i></a></li>
    </ul>
    </>
  );
};

export default ShareButtons;
