import { LOGIN } from "@/constants/login"

export default class UserSession{

    setToken(token:string){
        LOGIN.TOKEN = token;
        localStorage.setItem('TOKEN',token)
    }

    setTypeUser(id:string){
        LOGIN.TYPEUSER = id;
        localStorage.setItem('TYPEUSER',id)
    }

    logout(){
        LOGIN.TOKEN = '';
        LOGIN.TYPEUSER = '';
        localStorage.setItem('TOKEN','');
        localStorage.setItem('TYPEUSER','')
    }

}