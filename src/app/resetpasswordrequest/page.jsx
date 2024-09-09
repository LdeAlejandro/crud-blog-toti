"use client";
import {useState } from "react";
import { RequestPasswordReset } from "@/utils/ChangePasswordViaToken/ChangePasswordViaToken";
import styles from './page.module.css';

const ResetPasswordRequest = () => {
  const [resetRequest, setResetRequest] = useState("");
  const [showModal, setShowModal] = useState(false);
  //Alejandro
  const handleReset = async(e) => {
    e.preventDefault();

    const email = e.target.email.value;
    console.log(email);

    const res = await RequestPasswordReset(email);

    if (res.ok) {
      setResetRequest("Reset de senha solicitado");
      setShowModal(true); 
      setTimeout(() => {
        setShowModal(false); 
      }, 3000);
    } else {
      setResetRequest("Erro ao solicitar reset de senha.");
    }
  };



  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Solicitar Reset de Senha</h2>
        <form onSubmit={handleReset}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className={styles.input}
            required
          />
          <button className={styles.button}>Trocar Senha</button>
          {resetRequest && (
            <p className={resetRequest.includes("solicitado") ? styles.successMsg : styles.errorMsg}>
              {resetRequest}
            </p>
          )}
        </form>
      </div>
    
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Solicitação Enviada!</h3>
            <p>Verifique seu e-mail para resetar sua senha.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordRequest;
