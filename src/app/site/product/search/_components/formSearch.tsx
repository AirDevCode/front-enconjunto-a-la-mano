export default function FormSearch({
  handleSubmit,
  handleSelectChange,
  setName,
  name,
  setCityId,
  cityId,
  setIdCategory,
  idCategory,
  setIdEnsamble,
  idEnsamble,
  setApiCityData,
  apiCityData,
  setApiEnsambleData,
  apiEnsambleData,
  setApiCategoryData,
  apiCategoryData,
  clearName,
  clearCity,
  clearEnsamble,
  clearCategory,
  resetForm
}: any) {
  return (
    <form action="#" role="search" method="GET" onSubmit={handleSubmit}>
      <div className="row gx-2 gx-xl-3">
        <div className="col-sm-6 col-md-3 mb-4 mb-lg-0">
          <p className="my-0 baloo fz-16 fz-md-18 text-nowrap text-orange-2">
            Buscar
          </p>
          <div className="form-group form-group-clear-input mt-1 mb-0">
            <input
              type="text"
              name="s"
              placeholder="Palabra clave"
              className="form-control w-100 my-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="button" className="clear-input btn" onClick={() => clearName()}>&times;</button>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 mb-4 mb-lg-0">
          <p className="my-0 baloo fz-16 fz-md-18 text-nowrap text-orange-2">
            Ciudad
          </p>

          <div className="form-group form-group-clear-input mt-1 mb-0">
            <select
              id="cityInput"
              className="form-control form-select w-100"
              value={cityId}
              onChange={(event) =>
                handleSelectChange(event, setCityId, "city")
              }
            >
              <option value="" className="d-none">
                Buscar por ciudad
              </option>
              {Array.isArray(apiCityData)
                ? apiCityData.map((city) => (
                    <option key={city.city_id} value={city.city_id}>
                      {city.city_name}
                    </option>
                  ))
                : null}
            </select>
            <button type="button" className="clear-input btn" onClick={() => clearCity()}>&times;</button>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 mb-4 mb-lg-0">
          <p className="my-0 baloo fz-16 fz-md-18 text-nowrap text-orange-2">
            Conjunto
          </p>
          <div className="form-group form-group-clear-input mt-1 mb-0">
            <select
              id="ensambleInput"
              className="form-control form-select w-100"
              value={idEnsamble}
              onChange={(event) =>
                handleSelectChange(event, setIdEnsamble, "ensemble")
              }
            >
              <option value="" className="d-none">
                Buscar por conjunto
              </option>
              {Array.isArray(apiEnsambleData)
                ? apiEnsambleData.map((item) => (
                    <option
                      key={item.ensemble_id}
                      value={item.ensemble_id}
                    >
                      {item.name}
                    </option>
                  ))
                : null}
            </select>
            <button type="button" className="clear-input btn" onClick={() => clearEnsamble()}>&times;</button>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 mb-3 mb-lg-0">
          <p className="my-0 baloo fz-16 fz-md-18 text-nowrap text-orange-2">
            Categoría
          </p>

          <div className="form-group form-group-clear-input mt-1 mb-0">
            <select
              id="cityInput"
              className="form-control form-select w-100"
              value={idCategory}
              onChange={(event) =>
                handleSelectChange(event, setIdCategory, "category")
              }
            >
              <option value="" className="d-none">
                Buscar por categoría
              </option>
              {Array.isArray(apiCategoryData)
                ? apiCategoryData.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.category_name}
                    </option>
                  ))
                : null}
            </select>
            <button type="button" className="clear-input btn" onClick={() => clearCategory()}>&times;</button>
          </div>
        </div>
      </div>

      <div className="d-sm-flex align-items-center justify-content-center mt-3 mt-md-4">
        <button type="submit" className="btn btn-orange-1 d-table mx-auto rounded-3 mx-sm-2">
          <span className="pe-2 fw-400 baloo">Buscar</span>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        
        <button type="reset" className="btn btn-outline-orange d-table mx-auto mt-3 mt-sm-0 rounded-3 mx-sm-2" onClick={() => resetForm()}>
          <span className="pe-2 fw-400 baloo">Limpiar</span>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </form>
  );
}
