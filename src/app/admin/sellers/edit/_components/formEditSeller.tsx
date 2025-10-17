import Image from "next/image";
import Link from "next/link";

export default function FormEditSeller({
  handleSubmit,
  handleSelectChange,
  handleLiveInEnsamble,
  handleTypePerson,
  onclicldDeleteSeller,
  handleFileChange,

  apiCityData,
  apiEnsambleData,
  apiTypePersonData,
  fullName,
  setFullName,
  businessName,
  setBusinessName,
  email,
  setEmail,
  typeDoc,
  setTypeDoc,
  documentNumber,
  setDocumentNumber,
  numberPhone,
  setNumberPhone,
  password,
  setPassword,
  passwordConfirmation,
  setPasswordConfirmation,
  cityId,
  setCityId,
  ensembleId,
  setEnsembleId,
  liveInEnsamble,
  numberapartTower,
  setNumberApartTower,
  kindSex,
  setKindSex,
  setDescription,
  description,
  profileImage,
  selectedCheckboxes,
  whenyousee,

  togglePasswordVisibility,
  showPassword,
  showComPassword,
  idProfile,
}: any) {
  return (
    <form onSubmit={handleSubmit} className="w-100">
      <div className="row gx-lg-4 gx-xl-5">
        <div className="col-lg-6">
          <div className="form-group mb-3">
            <input
              type="text"
              placeholder="Nombre y apellido"
              className="form-control form-control-outline"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              placeholder="Nombre del negocio"
              className="form-control form-control-outline"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="form-control form-control-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <select
              className="form-control form-control-outline form-select"
              value={typeDoc}
              onChange={(e) => setTypeDoc(e.target.value)}
              required
            >
              <option value="" className="d-none">
                Tipo de documento
              </option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="CE">Cédula de Extranjería</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <input
              type="number"
              placeholder="Número de documento"
              className="form-control form-control-outline"
              value={documentNumber}
              onChange={(e) => {
                const newValue = e.target.value.replace(/\D/g, "");
                if (newValue.length <= 10) {
                  setDocumentNumber(newValue);
                }
              }}
              pattern="[0-9]{10}"
              maxLength={10}
              minLength={10}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="number"
              placeholder="Número de celular"
              className="form-control form-control-outline"
              value={numberPhone}
              onChange={(e) => {
                const newValue = e.target.value.replace(/\D/g, "");
                if (newValue.length <= 10) {
                  setNumberPhone(newValue);
                }
              }}
              pattern="[0-9]{10}"
              maxLength={10}
              minLength={10}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="form-control form-control-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="btn"
              onClick={() => togglePasswordVisibility(1)}
            >
              <i
                className={
                  showPassword
                    ? "fa-regular fa-eye-slash"
                    : "fa-regular fa-eye"
                }
              ></i>
            </button>
          </div>
          <div className="form-group mb-3">
            <input
              type={showComPassword ? "text" : "password"}
              placeholder="Confirmar contraseña"
              className="form-control form-control-outline"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <button
              type="button"
              className="btn"
              onClick={() => togglePasswordVisibility(2)}
            >
              <i
                className={
                  showComPassword
                    ? "fa-regular fa-eye-slash"
                    : "fa-regular fa-eye"
                }
              ></i>
            </button>
          </div>
          <div className="form-group mb-3">
            <select
              id="cityInput"
              className="form-control form-control-outline form-select"
              value={cityId}
              onChange={(event) =>
                handleSelectChange(event, setCityId, "city")
              }
              required
            >
              <option value="" className="d-none">
                Selecciona la ciudad
              </option>
              {Array.isArray(apiCityData)
                ? apiCityData.map((city) => (
                    <option key={city.city_id} value={city.city_id}>
                      {city.city_name}
                    </option>
                  ))
                : null}
            </select>
          </div>
          {liveInEnsamble == false ? (
            <div className="form-group mb-3">
              <select
                id="ensambleInput"
                className="form-control form-control-outline form-select"
                value={ensembleId}
                onChange={(e) => setEnsembleId(e.target.value)}
                
              >
                <option value="" className="d-none">
                  Buscar por conjunto
                </option>
                {Array.isArray(apiEnsambleData)
                  ? apiEnsambleData.map((item) => (
                      <option key={item.ensemble_id} value={item.ensemble_id}>
                        {item.name}
                      </option>
                    ))
                  : null}
              </select>
            </div>
          ) : null}

          <div className="form-group mb-3">
          
            <div className="form-check form-check-reverse text-start">
              <input
                className="form-check-input"
                type="checkbox"
                name="flexRadioDefault"
                id="live_conjunto"
                value={liveInEnsamble}
                checked={liveInEnsamble}
                onChange={handleLiveInEnsamble}
              />
              <label
                className="form-check-label text-dark fw-400"
                htmlFor="live_conjunto"
              >
                Si no vives en un conjunto o urbanismo de CB selecciona esta
                opción
              </label>
            </div>
          
          </div>
          <div className="form-group mb-3">
            <textarea
              className="form-control form-control-outline"
              placeholder="Torre y apartamento"
              value={numberapartTower}
              onChange={(e) => setNumberApartTower(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <div className="col-lg-6 mt-4 mt-lg-0">
          <div className="form-group mb-3">
            <select
              className="form-control form-control-outline form-select"
              value={kindSex}
              onChange={(e) => setKindSex(e.target.value)}
              required
            >
              <option value="" className="d-none">
                Género
              </option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <p className="my-0 text-dark fw-400">
              Selecciona si te identificas con uno o con varios de estos
              grupos:
            </p>
          </div>
          <div className="form-group mb-3">
            {apiTypePersonData.map((typePerson: any) => (
              <div className="form-check" key={typePerson.typeperson_id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={selectedCheckboxes.includes(
                    typePerson.typeperson_id
                  )}
                  id={typePerson.typeperson_id}
                  onChange={() => handleTypePerson(typePerson.typeperson_id)}
                />
                <label
                  className="form-check-label my-0 text-dark fw-400"
                  htmlFor={typePerson.typeperson_id}
                >
                  {typePerson.name}
                </label>
              </div>
            ))}
          </div>
          <div className="form-group mb-3">
            <textarea
              className="form-control form-control-outline"
              placeholder="Descripción de tu perfil"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            ></textarea>
          </div>

          <div className="profile-seller md-version d-sm-flex align-items-center justify-content-center mt-4">
            <div className="img">
              {profileImage ? (
                <>
                  <Image src={process.env.NEXT_PUBLIC_API + profileImage} alt="Descripción de la imagen" width={500} height={500} />
                  <div className="overlay">
                    {/*<i className="fa-solid fa-xmark text-white delete-img"></i>*/}
                  </div>
                </>
              ) : null }
            </div>
            <div className="info text-center text-sm-start mt-4 mt-sm-0 ps-sm-4 pe-sm-3">
              <div className="form-group my-0">
                <input
                  className="form-control form-control-outline"
                  type="file"
                  id="formFile"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label htmlFor="formFile">
                  Cargar foto de perfil
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row gx-sm-4 gx-md-5 align-items-center justify-content-center mt-3 mt-md-4">
        {whenyousee === 'admin' ? (
          <>
            <div className="col-sm-6">
              <button type="submit" className="btn btn-orange-1 d-table mx-auto me-sm-0 baloo text-uppercase fw-400 fz-18 fz-sm-24 pb-1 px-4 px-md-5">
                Guardar cambios
              </button>
            </div>
            <div className="col-sm-6 mt-3 mt-sm-0">
              <button type="button" onClick={() => onclicldDeleteSeller(idProfile)} className="btn btn-outline-orange d-table mx-auto ms-sm-0 baloo text-uppercase fw-400 fz-18 fz-sm-24 pb-1 px-4 px-md-5">
                Eliminar vendedor
              </button>
            </div>
          </>
        ) : (
          <div className="col-sm-6">
            <button type="submit" className="btn btn-orange-1 d-table mx-auto baloo text-uppercase fw-400 fz-18 fz-sm-24 pb-1 px-4 px-md-5">
              Guardar cambios
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
