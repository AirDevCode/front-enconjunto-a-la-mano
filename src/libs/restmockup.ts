export default class RestMockup{

  delete(url:string, mockup:any){
    return new Promise((resolve, rej)=>{
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({jsonstring:mockup})
    };
    fetch('https://produccionsitios.com:2233/mockup/react.php', requestOptions)
        .then(response => response.json())
        .then(data =>{ resolve(data); });
    })
  }  

  put(url:string, mockup:any){
    return new Promise((resolve, rej)=>{
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({jsonstring:mockup})
    };
    fetch('https://produccionsitios.com:2233/mockup/react.php', requestOptions)
        .then(response => response.json())
        .then(data =>{ resolve(data); });
    })
  }  

  get(url:string, mockup:any){
    return new Promise((resolve, rej)=>{
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({jsonstring:mockup})
    };
    fetch('https://produccionsitios.com:2233/mockup/react.php', requestOptions)
        .then(response => response.json())
        .then(data =>{ resolve(data); });
    })
  }

  post(url:string, mockup:any){
    return new Promise((resolve, rej)=>{
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({jsonstring:mockup})
    };
    fetch('https://produccionsitios.com:2233/mockup/react.php', requestOptions)
        .then(response => response.json())
        .then(data =>{ resolve(data); });
    })
  }
}