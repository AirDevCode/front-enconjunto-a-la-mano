import Link from "next/link";
import { useRouter } from "next/navigation";
import Recaptcha from '@/app/_components/recaptcha';
import Autocomplete from "@/app/_components/autocomplete";

export default function FormUserRegister({
  handleSubmit,
  handleLiveInEnsamble,
  handleTypePerson,
  handleEnsambleChange,
  handleFileChange,
  handleAcceptTheTerms,
  setfullName,
  fullName,
  setBusinessName,
  businessName,
  setEmail,
  email,
  setTypeIdentification,
  type_identification,
  setNumberIdentification,
  number_identification,
  setNumberPhone,
  number_phone,
  setPassword,
  password,
  setPasswordConfirmation,
  password_confirmation,
  setKindSex,
  kind_sex,
  setDescription,
  description,
  setNumberApartTower,
  numberapart_tower,
  liveInEnsamble,
  iAcceptTheTerms,

  apiTypePersonData,
  selectedCheckboxes,
  apiEnsambleData,

  togglePasswordVisibility,
  showPassword,
  showComPassword,

  apiCityData,handleCityChange,
  labelTextPhoto,
  selectedOption,setSelectedOption,
  selectedOptionEnsemble,setSelectedOptionEnsemble,
  isCaptchaValid, setIsCaptchaValid,
  resetCaptchaValid
}: any) {
  return (
    <form className="d-block w-100" onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <input type="text" placeholder="Nombre y apellido" className="form-control form-control-outline" value={fullName} onChange={(e) => setfullName(e.target.value)} required />
      </div>
      <div className="form-group mb-3">
        <input type="text" placeholder="Nombre del negocio" className="form-control form-control-outline" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
      </div>
      <div className="form-group mb-3">
        <input type="email" placeholder="Correo electrónico" className="form-control form-control-outline" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group mb-3">
        <select className="form-control form-control-outline form-select" value={type_identification} onChange={(e) => setTypeIdentification(e.target.value)} required>
          <option value="" className="d-none">
            Tipo de documento
          </option>
          <option value="TI">Tarjeta de Identidad</option>
          <option value="CC">Cédula de Ciudadanía</option>
          <option value="CE">Cédula de Extranjería</option>
        </select>
      </div>
      <div className="form-group mb-3">
        <input type="number" placeholder="Número de documento" className="form-control form-control-outline" value={number_identification} onChange={(e) => {
          const newValue = e.target.value.replace(/\D/g, "");
          if (newValue.length <= 10) {
            setNumberIdentification(newValue);
          }
        }} pattern="[0-9]{10}" maxLength={10} minLength={10} required />
      </div>
      <div className="form-group mb-3">
        <input type="number" placeholder="Número de celular" className="form-control form-control-outline" value={number_phone} onChange={(e) => {
          const newValue = e.target.value.replace(/\D/g, "");
          if (newValue.length <= 10) {
            setNumberPhone(newValue);
          }
        }} pattern="[0-9]{10}" maxLength={10} minLength={10} required />
      </div>
      <div className="form-group mb-3">
        <input type={showPassword ? 'text' : 'password'} placeholder="Contraseña" className="form-control form-control-outline" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="button" className="btn" onClick={() => togglePasswordVisibility(1)}>
          <i className={ showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye' }></i>
        </button>
      </div>
      <div className="form-group mb-3">
        <input type={showComPassword ? 'text' : 'password'} placeholder="Confirmar contraseña" className="form-control form-control-outline" value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
        <button type="button" className="btn" onClick={() => togglePasswordVisibility(2)}>
          <i className={ showComPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye' }></i>
        </button>
      </div>
      
      <div className="form-group mb-3">
        <Autocomplete 
          data={apiCityData} 
          onChange={handleCityChange} 
          msgLabel="Seleciona tu ciudad" 
          selectedOption={selectedOption} 
          setSelectedOption={setSelectedOption}></Autocomplete>
      </div>
      <div className="form-group mb-3"></div>
      

      {liveInEnsamble == false ? (
        <div className="form-group mb-3">
          <Autocomplete 
            data={apiEnsambleData} 
            onChange={handleEnsambleChange} 
            msgLabel="Selecciona tu conjunto o urbanismo" 
            selectedOption={selectedOptionEnsemble} 
            setSelectedOption={setSelectedOptionEnsemble}></Autocomplete>
        </div>
        ) : null}
      <div className="form-group mb-3">
        <div className="form-check form-check-reverse text-start">
          <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="live_conjunto" value="SI" checked={liveInEnsamble} onChange={handleLiveInEnsamble}  />
          <label className="form-check-label text-dark fw-400" htmlFor="live_conjunto">
            Si no vives en un conjunto o urbanismo de Constructora Bolívar, selecciona esta opción
          </label>
        </div>
      </div>
      <div className="form-group mb-3">
        <textarea className="form-control form-control-outline" placeholder="Torre - Apartamento o Dirección" value={numberapart_tower} onChange={(e) => setNumberApartTower(e.target.value)} required></textarea>
      </div>
      <div className="form-group mb-3">
        <select className="form-control form-control-outline form-select" value={kind_sex} onChange={(e) => setKindSex(e.target.value)} required>
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
          Selecciona si te identificas con uno o con varios de estos grupos:
        </p>
      </div>

      <div className="form-group mb-3">
        {apiTypePersonData.map((typePerson: any) => (
          <div className="form-check" key={typePerson.typeperson_id}>
            <input className="form-check-input" type="checkbox" checked={selectedCheckboxes.includes(typePerson.typeperson_id)} id={typePerson.typeperson_id} onChange={() => handleTypePerson(typePerson.typeperson_id)} />
            <label className="form-check-label my-0 text-dark fw-400" htmlFor={typePerson.typeperson_id}>
              {typePerson.name}
            </label>
          </div>
        ))}
      </div>
      <div className="form-group mb-3">
        <textarea className="form-control form-control-outline" placeholder="Descripción de tu perfil" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
      </div>
      <div className="form-group mb-3">
        <input 
          className="form-control form-control-outline" 
          type="file" id="formFile" 
          accept=".jpg, .jpeg, .png" 
          onChange={handleFileChange} required />
        <label htmlFor="formFile">{labelTextPhoto}</label>
      </div>

      <div className="form-group mb-3">
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="terms_conditions"
            checked={iAcceptTheTerms}
            onChange={handleAcceptTheTerms}
            />
          <label className="form-check-label my-0 text-dark fw-400" htmlFor="terms_conditions">
            Acepto <a href="https://www.itscolombiapruebas.com/terminos-y-condiciones/" target="_blank" className="fw-600 text-decoration-underline">Términos y Condiciones </a>
          </label>
        </div>
      </div>

      <div className="d-table mx-auto mb-3">
        <Recaptcha isCaptchaValid={isCaptchaValid} setIsCaptchaValid={setIsCaptchaValid} resetCaptchaValid={resetCaptchaValid}></Recaptcha>
      </div>

      <button type="submit" className="btn btn-lg btn-orange-1 w-100 baloo fw-400 text-uppercase pb-1">
        Enviar registro
      </button>
      <p className="text-dark text-center fw-400 fz-14 fz-md-16 text-grey-5 mb-0 mt-3 mt-md-4">
        ¿Ya tienes cuenta? <Link href="/site/login" scroll={false} className="text-underline">Inicia sesión</Link>
      </p>
    </form>
  );
}
