import UploadMultipleFiles from "@/app/private/profile/_components/uploadMultipleFiles";
import Image from "next/image";

export default function FormEditAds({
  handleSubmit,
  handleShippingTypeChange,
  handleCoverages,
  handleFileChange,
  deleteQr,
  deleteAds,
  handleFeatured,

  apiGetCategories,
  apiGetCities,
  apiGetTypeAds,

  typeId,
  settypeId,
  title,
  setTitle,
  category,
  setCategory,
  price,
  setPrice,
  description,
  setDescription,
  shippingType,
  selectedCoverages,
  coverageVisible,
  photos,
  setPhotos,
  qr,
  itisaprovedbytheadm,
  state,
  setState,
  featured
}: any) {
  return (
    <form onSubmit={handleSubmit} className="w-100">
      <div className="row gx-lg-4 gx-xl-5">
        <div className="col-lg-6">
          <div className="form-group mb-3">
            <select
              id="ensambleInput"
              className="form-control form-control-outline form-select"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="" className="d-none">
                Aprobar anuncio
              </option>
              <option value="Y" disabled={itisaprovedbytheadm === "Y"}>
                Aprobar
              </option>
              <option value="ACT" disabled={!itisaprovedbytheadm}>
                Activar
              </option>
              <option value="PAU" disabled={!itisaprovedbytheadm}>
                Pausar
              </option>
            </select>
          </div>
          <div className="form-group mb-3">
            <select
              id="ensambleInput"
              className="form-control form-control-outline form-select"
              value={typeId}
              onChange={(e) => settypeId(e.target.value)}
              required
            >
              <option value="" className="d-none">
                Tipo de anuncio
              </option>
              {Array.isArray(apiGetTypeAds)
                ? apiGetTypeAds.map((item) => (
                  <option key={item.typead_id} value={item.typead_id}>
                    {item.name}
                  </option>
                ))
              : null}
            </select>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              placeholder="Título del anuncio"
              className="form-control form-control-outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <select
              id="ensambleInput"
              className="form-control form-control-outline form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" className="d-none">
                Categoría
              </option>
              {Array.isArray(apiGetCategories)
                ? apiGetCategories.map((item) => (
                  <option key={item.category_id} value={item.category_id}>
                    {item.category_name}
                  </option>
                ))
              : null}
            </select>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              placeholder="Precio o rango de precio $"
              className="form-control form-control-outline"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="featured"
                checked={featured}
                onChange={handleFeatured}
                />
            <label className="form-check-label my-0 text-dark fw-400" htmlFor="featured">
            Destacado
            </label>
          </div>
        </div>

          <div className="form-group mb-3">
            <input
              className="form-control form-control-outline"
              placeholder="Subir QR Daviplata"
              type="file"
              id="qr_daviplata"
              accept=".jpg, .jpeg, .png" 
              onChange={(e) => handleFileChange(e, "qr")}
            />
            <label htmlFor="qr_daviplata">Subir QR Daviplata</label>
          </div>
          
          {qr ? (
          <div className="row gx-1 gx-sm-2 gx-lg-3 grid-photos mb-3">
            <div className="col-6">
              <div className="grid">
                <i className="fa-solid fa-xmark text-white delete-img" onClick={deleteQr}></i>
                <Image src={process.env.NEXT_PUBLIC_API + qr} alt="Descripción de la imagen" width={500} height={500} />
              </div>
            </div>
          </div>
          ) : <div className="row gx-1 gx-sm-2 gx-lg-3 grid-photos mb-3">
          <div className="col-6">
            <div className="grid">
            </div>
          </div>
        </div> }

          <div className="form-group mb-3">
            <textarea
              className="form-control form-control-outline"
              placeholder="Descripción del producto"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group mb-3">
            <div className="row align-items-start justify-content-between">
              <div className="col-sm-auto">
                <div className="form-check form-check-reverse text-start my-0 line-height-normal">
                  <input
                    className="form-check-input"
                    name="type_send"
                    type="radio"
                    id="national_send"
                    value="national_send"
                    checked={shippingType === "national_send"}
                    onChange={handleShippingTypeChange}
                  />
                  <label className="form-check-label text-dark fw-400" htmlFor="national_send">
                    Envío nacional
                  </label>
                </div>
              </div>
              <div className="col-sm-auto mt-3 mt-sm-0">
                <div className="form-check form-check-reverse text-start my-0 line-height-normal">
                  <input
                    className="form-check-input"
                    name="type_send"
                    type="radio"
                    id="cities_send"
                    value="cities_send"
                    checked={shippingType === "cities_send"}
                    onChange={handleShippingTypeChange}
                  />
                  <label className="form-check-label text-dark fw-400" htmlFor="cities_send">
                    Envío a ciudades específicas
                  </label>
                </div>
              </div>
            </div>
          </div>
          {coverageVisible && (
            <div className="form-group mb-3">
              <div className="row align-items-center gx-2">
                {apiGetCities.map((data: any) => (
                <div className="col-sm-6 mb-2"key={data.city_id}>
                  <div className="form-check" >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedCoverages.includes(data.city_id)}
                      id={data.city_id}
                      onChange={() => handleCoverages(data.city_id)}
                    />
                    <label
                      className="form-check-label my-0 text-dark fw-400"
                      htmlFor={data.city_id}
                    >
                      {data.city_name}
                    </label>
                  </div>
                </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <UploadMultipleFiles photos={photos} setPhotos={setPhotos} />
      </div>

      <div className="row gx-sm-4 gx-md-5 align-items-center mt-3 mt-md-4">
        <div className="col-sm-6">
          <button
            type="submit"
            className="btn btn-orange-1 d-table mx-auto me-sm-0 baloo text-uppercase fw-400 fz-18 fz-sm-24 pb-1 px-4 px-md-5"
          >
            Guardar cambios
          </button>
        </div>
        <div className="col-sm-6 mt-3 mt-sm-0">
          <button
           onClick={deleteAds}
            type="button"
            className="btn btn-outline-orange d-table mx-auto ms-sm-0 baloo text-uppercase fw-400 fz-18 fz-sm-24 pb-1 px-4 px-md-5"
          >
            Eliminar anuncio
          </button>
        </div>
      </div>
    </form>
  );
}
