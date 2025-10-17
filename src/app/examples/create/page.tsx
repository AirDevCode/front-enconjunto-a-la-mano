"use client"
import Public from "@/theme/public";
import UserForm from '../_components/userForm';
import RestMockup from "@/libs/restmockup";
import { SAVE_USER } from "@/mockups/saveuser";

export default function UsersCreate() {


  
  const saveData = (event:any) => {
    event.preventDefault();
    console.log('Saving data');
    let restMockup = new RestMockup();
    restMockup.post('/users-create', SAVE_USER)
    .then((data)=>{
      console.log('DATA SAVED!!');
      console.log(data);
    })
    .catch(()=>{
    })
  };
  
  return (
    <main>
        <Public>
          <div>Create User</div>
          <UserForm saveData={saveData}/>
        </Public>
    </main>
  )
}