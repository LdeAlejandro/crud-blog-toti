"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ChangePasswordViaToken } from "@/utils/ChangePasswordViaToken/ChangePasswordViaToken";
import styles from "./page.module.css";

const ResetPassword = () => {
  //Alejandro

  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    
    const { searchParams } = new URL(window.location.href);
    const tokenFromURL = searchParams.get('token');
    setToken(tokenFromURL);
  }, []);

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
  };

  const handleReset = async (e) => {
    e.preventDefault();

    const password = formData.newPasswordField2
    const isValid = password.length >= 8 &&
                    /[A-Z]/.test(password) &&
                    /[a-z]/.test(password) &&
                    /[0-9]/.test(password) &&
                    /[!@#$%^&*(),.?":{}|<>%]/.test(password);

    

    if (isValid &&
      formData.newPasswordField1 === formData.newPasswordField2 &&
      formData.currentPassword !== formData.newPasswordField1
    ) {
      try {
        const res = await ChangePasswordViaToken(token, formData.newPasswordField2)
        
       if(res.ok){
        console.log("ok")
       }

       console.log(res)
        if(res.status === 200){
          setPasswordMsg("Senha atualizada com sucesso");
          setTimeout(() => {
            router.push("account/login");
        }, 3000); 
         
        }else if (res.status === 401) {
          setPasswordMsg("Senha incorreta");
         }
         else if (res.status === 400) {
          setPasswordMsg("Houve um erro, solicite reset de sua senha novamente.");
         } else {
          setPasswordMsg("Houve um erro, solicite reset de sua senha novamente.");
        }
      } catch (error) {
        setPasswordMsg("Erro ao mudar a senha");
        console.error('Error in handleReset:', error);
      }
     
    } else if (formData.newPasswordField1 !== formData.newPasswordField2) {
      setPasswordMsg("As senhas não são iguais.");
    } else if (!isValid) {
      setPasswordMsg('A senha deve ter pelo menos 8 caracteres, incluir letras maiúsculas e minúsculas, um número e um caractere especial.');
    } 
  };

  // Empty dependency array to run only once

  return (
    <div className={styles.container}>
    
        <form className={styles.form} onSubmit={handleReset}>
            <input
              className={styles.input}
              type={showPassword.newPassword ? "text" : "password"}
              name="newpassword"
              id="newPasswordField1"
              placeholder="Senha nova"
              required
              onChange={handleOnChange}
            />
            <input
              className={styles.input}
              type={showPassword.newPassword ? "text" : "password"}
              name="newPassword"
              id="newPasswordField2"
              placeholder="Repita a senha nova"
              onChange={handleOnChange}
              required
            />
            <button
            className={styles.buttonShowPswd}
              type="button"
              onClick={() => togglePasswordVisibility("newPassword")}
            >
              {showPassword.newPassword ? "Ocultar" : "Mostrar"}
            </button>
          <button className={styles.button}>Trocar</button>
          <p className={styles.error}>{passwordMsg && passwordMsg}</p>
          
        </form>
    </div>
  );
};

export default ResetPassword;
