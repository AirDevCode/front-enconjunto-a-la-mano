import React from "react";

const ButttonWhatsAppShare = ({phone, productId, productName, businessName,}: any) => {
  const handleWhatsAppShare = () => {
    const currentUrl = process.env.NEXT_PUBLIC_SERVE + "site/product/single?search=" + productId;
    const message = encodeURIComponent(`Hola ` + businessName + `. Estoy interesado/a en ` + productName + ` : ${currentUrl}`);
    const whatsappLink = `https://wa.me/+57${phone}?text=${message}`;
    window.open(whatsappLink, "_blank");
  };
  return (
    <div className="d-table mx-auto mt-3 mt-md-4">
      <button className="btn btn-buy baloo fz-16 fz-md-18" onClick={() => handleWhatsAppShare()}>
        <span className="icon">
          <i className="fa-solid fa-cart-shopping"></i>
        </span>
        Quiero comprar
      </button>
    </div>
  );
};

export default ButttonWhatsAppShare;