"use client";
import {useState } from "react";
import { RequestPasswordReset } from "@/utils/ChangePasswordViaToken/ChangePasswordViaToken";



const ResetPassword = () => {

  const [resetRequest, SetResetRequest] = useState("");

  //Alejandro
  const handleReset = async(e) => {
    e.preventDefault();

    const email = e.target[0].value;
    console.log(email)

    const res = await RequestPasswordReset(email);

    if(res.ok){
      SetResetRequest("Reset de senha solcicitado");
    }
  };



  return (
    <div>
      Trocar Senha
     
      
        <form onSubmit={handleReset}>

          <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              required
            />
      
          <button>Trocar</button>
          {resetRequest && resetRequest}
        </form>

    </div>
  );
};

export default ResetPassword;
