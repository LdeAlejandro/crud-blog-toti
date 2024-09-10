"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import styles from "./page.module.css"; 

const UserProfile = () => {
  const { data: session, status } = useSession();
  const [changePasswordUI, setChangePasswordUI] = useState(false);
  const [changePasswordBtnTxt, setChangePasswordBtnTxt] = useState("Trocar senha");
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
      <div className={styles.notLoggedIn}>
        <p>You are not logged in.</p>
        <Button url="/dashboard/login" text="Log in" />
      </div>
    );
  }

  const { user } = session;

  const changePasswordMenu = (e) => {
    setChangePasswordUI((prevState) => !prevState);
    setChangePasswordBtnTxt((prevText) =>
      prevText === "Trocar senha" ? "Cancelar" : "Trocar senha"
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
      }
    } else if (formData.newPasswordField1 !== formData.newPasswordField2) {
      setPasswordMsg("As senhas não são iguais.");
    } else {
      setPasswordMsg("A senha nova não pode ser sua senha antiga.");
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>My Profile</h1>
      <div className={styles.userInfo}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {user.image && (
          <div className={styles.avatarContainer}>
            <img
              src={user.image}
              alt="Profile Image"
              className={styles.avatar}
            />
          </div>
        )}
      </div>
      <button onClick={changePasswordMenu} className={styles.changePasswordBtn}>
        {changePasswordBtnTxt}
      </button>
      {changePasswordUI && (
        <form onSubmit={handleReset} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type={showPassword.currentPassword ? "text" : "password"}
              id="currentPassword"
              placeholder="Senha atual"
              onChange={handleOnChange}
              required
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("currentPassword")}
              className={styles.togglePassword}
            >
              {showPassword.currentPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <div className={styles.inputGroup}>
            <input
              type={showPassword.newPassword ? "text" : "password"}
              id="newPasswordField1"
              placeholder="Senha nova"
              required
              onChange={handleOnChange}
              className={styles.input}
            />
            <input
              type={showPassword.newPassword ? "text" : "password"}
              id="newPasswordField2"
              placeholder="Repita a senha nova"
              required
              onChange={handleOnChange}
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("newPassword")}
              className={styles.togglePassword}
            >
              {showPassword.newPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <button className={styles.submitButton}>Trocar</button>
          {passwordMsg && <p className={styles.passwordMsg}>{passwordMsg}</p>}
        </form>
      )}
      <button onClick={() => signOut()} className={styles.logoutBtn}>
        Deslogar
      </button>
    </div>
  );
};

export default UserProfile;