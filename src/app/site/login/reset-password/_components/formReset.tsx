import Recaptcha from "@/app/_components/recaptcha";
import Link from "next/link";

export default function FormReset(
    {
      handleSubmit,
      setEmail,email,
      isCaptchaValid, setIsCaptchaValid,
      resetCaptchaValid
    }:any) {
    return (<>
        <form   onSubmit={handleSubmit} className="d-block w-100">
            <div className="form-group mb-3">
                <input 
                    type="email" 
                    placeholder="Ingresa tu correo electrónico" 
                    className="form-control form-control-outline"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </div>

            <div className="row align-items-center">
                <div className="col-6">
                    <Link 
                        className="d-table text-center mx-auto fw-600 text-grey-4 fz-12 fz-sm-14 text-underline mb-3"
                        href="/site/register" 
                        scroll={false}
                        >
                        Crear cuenta
                    </Link>
                </div>
                <div className="col-6">
                    <Link 
                        className="d-table text-center mx-auto fw-600 text-grey-4 fz-12 fz-sm-14 text-underline mb-3"
                        href="/site/login" 
                        scroll={false}
                        >
                        Iniciar sesión
                    </Link>
                </div>
            </div>
            <div className="d-table mx-auto mb-3">
                <Recaptcha isCaptchaValid={isCaptchaValid} setIsCaptchaValid={setIsCaptchaValid} resetCaptchaValid={resetCaptchaValid}></Recaptcha>
            </div>
            <button type="submit" className="btn btn-orange-1 w-100 baloo fw-400 text-uppercase">Recuperar contraseña</button>
        </form>
    </>)
}