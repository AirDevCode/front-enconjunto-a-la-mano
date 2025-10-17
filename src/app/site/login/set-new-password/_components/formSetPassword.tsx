
export default function FormSetPassword(
    {
      handleSubmit,
      password,setPassword,
      password_confirmation,setPasswordConfirmation,
    }:any) {
    return (<>
        <form   onSubmit={handleSubmit} className="d-block w-100">
            <div className="form-group mb-3">
                <input 
                    type="password"
                    placeholder="Nueva contraseña" 
                    className="form-control form-control-outline"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                 />
                <button type="button" className="btn">
                <i className="fa-regular fa-eye"></i>
                </button>
            </div>
            <div className="form-group mb-3">
                <input 
                    type="password"
                    placeholder="Nueva confirmar contraseña"
                    className="form-control form-control-outline"
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)} 
                     />
                <button type="button" className="btn">
                <i className="fa-regular fa-eye"></i>
                </button>
            </div>
            <button type="submit" className="btn btn-orange-1 w-100 baloo fw-400 text-uppercase">Establecer nueva contraseña</button>
        </form>
    </>)
}