"use client";

import { useEffect, useState } from "react";

import { ChangePasswordViaToken } from "@/utils/ChangePasswordViaToken/ChangePasswordViaToken";

const ResetPassword = () => {
  //Alejandro

  const { searchParams } = new URL(window.location.href);
  const token = searchParams.get('token'); 

  const [formData, setFormData] = useState({
    newPasswordField1: "",
    newPasswordField2: "",
  });
  const [passwordMsg, setPasswordMsg] = useState("");
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
  });


  const togglePasswordVisibility = (fieldName) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  const handleOnChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    console.log(formData);
  };

  const handleReset = async (e) => {
    e.preventDefault();

    if (
      formData.newPasswordField1 === formData.newPasswordField2 &&
      formData.currentPassword !== formData.newPasswordField1
    ) {
      try {
        const res = await ChangePasswordViaToken(token, formData.newPasswordField2)
        
       if(res.ok){
        console.log("ok")
       }
        if (res.status === 401) {
          setPasswordMsg("Senha incorreta");
         } else {
          setPasswordMsg("Senha atualizada com sucesso");
        }
      } catch (error) {
        setPasswordMsg("Erro ao mudar a senha");
        console.error('Error in handleReset:', error);
      }
     
    } else if (formData.newPasswordField1 !== formData.newPasswordField2) {
      setPasswordMsg("As senhas não são iguais.");
    } else {
      setPasswordMsg("A senha nova não pode ser sua senha antiga. ");
    }
  };

  // Empty dependency array to run only once

  return (
    <div>
    
        <form onSubmit={handleReset}>
          <div>
            <input
              type={showPassword.newPassword ? "text" : "password"}
              name="newpassword"
              id="newPasswordField1"
              placeholder="Senha nova"
              required
              onChange={handleOnChange}
            />
            <input
              type={showPassword.newPassword ? "text" : "password"}
              name="newPassword"
              id="newPasswordField2"
              placeholder="Repita a senha nova"
              onChange={handleOnChange}
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("newPassword")}
            >
              {showPassword.newPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <button>Trocar</button>
          {passwordMsg && passwordMsg}
        </form>
    </div>
  );
};

export default ResetPassword;
