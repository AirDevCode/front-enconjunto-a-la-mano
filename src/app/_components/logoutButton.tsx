//import { useRouter } from 'next/router';

import Rest from "@/libs/rest";
import UserSession from "@/libs/userSession";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import { useState } from "react";

function LogoutButton() {
  const [isLoading, setIsLoading] = useState(Boolean);
  const router = useRouter();

  const handleLogout = () => {
    setIsLoading(true);
    let logout = new Rest();
    logout.post('auth/logout',{})
    .then((responseData:any) => {
      let userSession = new UserSession();
      userSession.logout();
      router.push('/site/login');
      setIsLoading(false);
    }).catch((error) => {console.error('Wrong:', error);})
  };

  return (
    <li className="mt-4 mt-lg-5">
      {isLoading === true ?  <Loading></Loading> : null}

      <button type="button" className="btn text-dark px-0 py-2 px-3 px-md-4 px-xl-5" onClick={handleLogout}>
        <div className="icon fz-28">
          <i className="fa-solid fa-arrow-right-from-bracket fa-rotate-180"></i>
        </div>
        Cerrar sesión
      </button>
    </li>
  );
}

export default LogoutButton;
