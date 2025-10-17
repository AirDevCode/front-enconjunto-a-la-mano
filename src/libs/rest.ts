import { LOGIN } from "@/constants/login";

export default class Rest {

  get(endpoint:string) {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json','Authorization': 'Bearer'+ LOGIN.TOKEN || ''},
      };
      fetch(process.env.NEXT_PUBLIC_API + 'api/'+ endpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {resolve(data);
        })
        .catch((error) => {reject(error);});
    });
  }

  post(endpoint:string, data:any){
    return new Promise((resolve, reject)=>{
      
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization': 'Bearer' + LOGIN.TOKEN || ''},
        body: JSON.stringify( data ),
        //autori
        //body: JSON.stringify({jsonstring:data})
    };
    fetch(process.env.NEXT_PUBLIC_API + 'api/' + endpoint, requestOptions)
        .then(response => response.json())
        .then(data =>{ resolve(data); 
      })
      .catch((error) => {reject(error);});
    })
  }

  delete(endpoint:string){
    return new Promise((resolve, rej)=>{
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json','Authorization': 'Bearer'+ LOGIN.TOKEN || ''},
        //body: JSON.stringify({jsonstring:mockup})
    };
    fetch(process.env.NEXT_PUBLIC_API + 'api/'+ endpoint,requestOptions)
        .then(response => response.json())
        .then(data =>{ resolve(data); });
    })
  } 

  put(endpoint:string,data:any) {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json','Authorization': 'Bearer'+ LOGIN.TOKEN || ''},
        body: JSON.stringify( data )
      };
      fetch(process.env.NEXT_PUBLIC_API + 'api/'+  endpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {resolve(data);
        })
        .catch((error) => {reject(error);});
    });
  }

  file(endpoint:string, file:File,destination:string){
    return new Promise((resolve, reject)=>{
      const formData: FormData = new FormData();
      formData.append('file', file);
      formData.append('destination', destination);
      const requestOptions = {
        method: 'POST',
        headers: {'Authorization': LOGIN.TOKEN || ''},
        body:  formData ,
    };
    fetch(process.env.NEXT_PUBLIC_API + 'api/' + endpoint, requestOptions)
        .then(response => response.json())
        .then(data =>{ resolve(data); 
      })
      .catch((error) => {reject(error);});
    })
  }


}
