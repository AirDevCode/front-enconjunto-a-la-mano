import Recaptcha from "@/app/_components/recaptcha";
import Link from "next/link";

export default function FormLogin({
  handleSubmit,
  setEmail,
  email,
  setPassword,
  password,
  isCaptchaValid,
  setIsCaptchaValid,
  resetCaptchaValid,
}: any) {
  return (
    <>
      <form action="" className="d-block w-100" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            className="form-control form-control-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            className="form-control form-control-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="row align-items-center">
          <div className="col-6">
            <Link
              href="/site/register"
              className="d-table text-center mx-auto fw-600 text-grey-4 fz-12 fz-sm-14 text-underline mb-3"
              scroll={false}
            >
              Crear cuenta
            </Link>
          </div>
          <div className="col-6">
            <Link
              className="d-table text-center mx-auto fw-600 text-grey-4 fz-12 fz-sm-14 text-underline mb-3"
              href="/site/login/reset-password"
              scroll={false}
            >
              Recuperar contraseña
            </Link>
          </div>
        </div>
        <div className="d-table mx-auto mb-6">
          <Recaptcha
            isCaptchaValid={isCaptchaValid}
            setIsCaptchaValid={setIsCaptchaValid}
            resetCaptchaValid={resetCaptchaValid}
          ></Recaptcha>
        </div>
        <br></br>
        <button
          type="submit"
          className="btn btn-orange-1 w-100 baloo fw-400 text-uppercase"
        >
          Iniciar sesión
        </button>
      </form>
    </>
  );
}
