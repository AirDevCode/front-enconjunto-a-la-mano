import Image from 'next/image';

export default function Ratings(
    {
        apiRaintingTotal,
        apiRaintingComents,
    }:any){
    return (<>
      <div className="col-lg-6 col-xl-5 mt-4 mt-lg-0">
        <h3 className="my-0 text-black fw-400 baloo fz-24">Valoraciones</h3>
          <div className="d-flex align-items-center justify-content-start flex-wrap mt-4 mt-sm-3">
            <div className="stars d-flex align-items-center justify-content-start text-grey-7 fz-20 fz-sm-28">
              {Array(5).fill(null).map((_, index) => (
                <i
                  key={index}
                  className={`fa-solid fa-star me-2 ${index < Math.floor(apiRaintingTotal) ? 'text-orange-1' : ''}`}
                ></i>
              ))}
            </div>
            <p className="my-0 ms-3 text-dark fw-600 fz-18 fz-md-22">  {apiRaintingTotal}</p>
          </div>
          <div className="content-comments mt-4 bg-light scrolled">
            {apiRaintingComents.map((data:any, index:any) => {
              return (
                <div className="box-comment p-3 p-md-4 px-xl-5" key={index} >
                  <div className="img">
                  <Image
                      src={data.photo_profile}
                      alt=""
                      width={500}
                      height={500}
                      style={{ width: '100%', height: 'auto' }}
                      className="d-block"
                  />
                  </div>
                  <div className="text">
                    <div className="stars d-flex align-items-center justify-content-start text-grey-7 fz-12">
                      {Array(5).fill(null).map((_, index) => (
                        <i
                          key={index}
                          className={`fa-solid fa-star me-1 ${index < data.calification ? 'text-orange-1' : ''}`}
                        ></i>
                      ))}
                      
                    </div>
                    <div className="row align-items-center mt-2 pt-1 gx-2">
                      <div className="col-6">
                        <h5 className="my-0 fw-700 text-dark fz-14">{data.user_name}</h5>
                      </div>
                      <div className="col-6">
                        <p className="my-0 text-grey-8 fw-400 fz-14">{data.created_at}</p>
                      </div>
                    </div>
                    <div className="general-text fz-14 fw-400 text-black mt-2">
                      {data.comment}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    </>)
}