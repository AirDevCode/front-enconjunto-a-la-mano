import ButttonWhatsAppShare from '@/app/_components/butttonWhatsAppShare';
import Paginator from '@/app/_components/paginator';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ListAds({setApiAdvertisementsData, apiAdvertisementsData, handleIlikeIt, loadPage, paginatorData, currentPage, handleWhatsAppShare}:any) {
  const router = useRouter();

  return (
    <>
      {apiAdvertisementsData.length > 0 ? (
        apiAdvertisementsData.map((advertisement: any, index: number) => (
          <div className="col-sm-6 col-lg-4 mb-3 mb-md-4 mb-lg-5" key={advertisement.advertisement_id}>
            <div className="box-anuncio">
              <div className="img">
                <button className="btn favourite added" onClick={() => handleIlikeIt(advertisement.advertisement_id)} >
                  <i className={` fa-heart ${advertisement.favorite === true ? 'fa-solid' : 'fa-regular'}`}></i>
                </button>
                <Link href={{ pathname: '/site/product/single', query: { search: advertisement.advertisement_id } }}>
                  <Image
                    src={advertisement.first_photo}
                    alt=""
                    width={500}
                    height={500}
                  />
                </Link>
              </div>
              <div className="info p-2 p-sm-3 py-lg-4">
                <Link href={{ pathname: '/site/product/single', query: { search: advertisement.advertisement_id }, }}>
                  <h4 className="my-0 fw-700 fz-20 fz-sm-24 fz-md-28 text-dark title text-capitalize">{advertisement.name}</h4>
                </Link>
                <Link href={{ pathname: '/site/product/category', query: { search: advertisement.category_id }, }}>
                <div className="d-table me-auto mt-1">
                  <span className="cat fz-12 d-flex align-items-center fz-12 fw-600 text-orange-1 py-1 px-3">
                    <span className="icon me-2">
                      <Image
                        src={advertisement.category_icon}
                        alt=""
                        width={1000}
                        height={1000}
                        style={{ width: '200%', height: 'auto' }}
                      />
                    </span>
                    {advertisement.category_name}
                  </span>
                </div>
                </Link>
                <Link href={{ pathname: '/site/product/single', query: { search: advertisement.advertisement_id } }}>
                  <p className="price fw-300 text-black mt-3 mb-0 fz-18 fz-md-26">$ {advertisement.total_format}</p>

                  <div className="general-text mt-2 fz-14 fw-400 text-black">
                    {advertisement.short_description}. 
                  </div>
                </Link>
                <ButttonWhatsAppShare 
                      phone={advertisement.user_number_phone} 
                      productId={advertisement.advertisement_id} 
                      productName={advertisement.name}
                      businessName={advertisement.user_name_business}
                ></ButttonWhatsAppShare>
              </div>
            </div>
          </div>
        ))
      ) : null}
        
      {apiAdvertisementsData.length > 0 && (
        <Paginator loadPage={loadPage}paginatorData={paginatorData}currentPage={currentPage}></Paginator>
      )}
    </>
  )
}