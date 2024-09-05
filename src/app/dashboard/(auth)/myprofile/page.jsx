"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { ChangePassword } from "@/utils/ChangePassword/ChangePassword";
import Button from "@/components/Button/Button";

const UserProfile = () => {
  //Alejandro
  const { data: session, status } = useSession();
  const [changePasswordUI, setChangePasswordUI] = useState(false);
  const [changePasswordBtnTxt, setChangePasswordBtnTxt] =
    useState("Trocar senha");
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPasswordField1: "",
    newPasswordField2: "",
  });
  const [passwordMsg, setPasswordMsg] = useState("");
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <p>You are not logged in.</p>
        <Button url ="/dashboard/login" text="Log in"/>
      </div>
    );
  }



  const { user } = session;

  const changePasswordMenu = (e) => {
    setChangePasswordUI((prevState) => !prevState);
    setChangePasswordBtnTxt((prevText) =>
      prevText === "Trocar senha" ? "cancelar" : "Trocar senha"
    );
  };

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
        const res = await ChangePassword(
          formData.currentPassword,
          user.email,
          formData.newPasswordField2
        );
       
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
      my profile
      <p>Logged in as:</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>
        Image:{" "}
        <img
          src={user.image}
          alt="Profile Image"
          style={{ width: "50px", height: "50px" }}
        />
      </p>
      <button onClick={changePasswordMenu}>{changePasswordBtnTxt}</button>
      {changePasswordUI && (
        <form onSubmit={handleReset}>
          <div>
            <input
              type={showPassword.currentPassword ? "text" : "password"}
              name="currentPassword"
              id="currentPassword"
              placeholder="Senha atual"
              onChange={handleOnChange}
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("currentPassword")}
            >
              {showPassword.currentPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
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
      )}
      <button onClick={() => signOut()}>Deslogar</button>
    </div>
  );
};

export default UserProfile;
