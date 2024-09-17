"use client";
import { useState } from "react";
import { RequestPasswordReset } from "@/utils/ChangePasswordViaToken/ChangePasswordViaToken";
import styles from "./page.module.css";

const ResetPassword = () => {
  const [resetRequest, setResetRequest] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    console.log(email);

    try {
      const res = await RequestPasswordReset(email);
      if (res.ok) {
        setResetRequest("Reset de senha solicitado com sucesso!");
      } else {
        setResetRequest("Falha ao solicitar reset de senha.");
      }
    } catch (error) {
      console.error(error);
      setResetRequest("Erro ao solicitar reset de senha.");
    }
  };

  return (
    <div className="reset-password-container">
    <div className={styles.pageContainer}>
      <div>
        <h2>Trocar Senha</h2>

        <form className={styles.imgContainer} onSubmit={handleReset}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu e-mail"
            required
          />
        


          <button type="submit">Enviar por e-mail</button>

          {resetRequest && <p>{resetRequest}</p>}
        </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
