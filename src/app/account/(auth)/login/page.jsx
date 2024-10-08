'use client'
import { React, useEffect, useState } from 'react';
import styles from './page.module.css';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { FcGoogle } from 'react-icons/fc'; 

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [erro, setErro] = useState({}); 
  const [mensagemSucesso, setMensagemSucesso] = useState(''); 

 

  useEffect(() => {
    if(window.location.href.includes("error")){
      setErro({login:"Email ou senha invalidos."});
      setTimeout(() => {
        setErro({});
      }, 3000);
  }
    
    if (status === "authenticated") {
      setMensagemSucesso("Sessão iniciada com sucesso");
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const senha = e.target[1].value;
    const novosErros = {};

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      novosErros.email = 'Por favor, insira seu email.';
    } else if (!emailRegex.test(email)) {
      novosErros.email = 'Por favor, insira um endereço de email válido.';
    }    
    if (!senha) {
      novosErros.senha = 'Por favor, insira sua senha.';
    }   
    if (Object.keys(novosErros).length > 0) {
      setErro(novosErros);
      setTimeout(() => {
        setErro({});
      }, 6000); 
      return;
    }   
    signIn("credentials", { email, password: senha });
  };

  const handleGoogleLogin = async () => {
    signIn("google");
  };

 //test4321@gmail.com
  //test4321
  
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Login</h2>
        
        <form className={styles.form} onSubmit={handleSubmit}>          
          <input 
            type="email" 
            placeholder="E-mail" 
            className={styles.input} 
          />
          {erro.email && <p className={styles.error}>{erro.email}</p>}
          
          <input 
            type="password" 
            placeholder="Senha" 
            className={styles.input} 
          />
          {erro.senha && <p className={styles.error}>{erro.senha}</p>}

          <button type="submit" className={styles.button}>
            Logar
          </button>
          {erro.login && <p className={styles.error}>{erro.login}</p>}
          {mensagemSucesso && <p className={styles.sucess}>{mensagemSucesso}</p>}
        </form>

        <div className={styles.orDivider}>
          <span>OU</span>
        </div>       
        <button className={styles.googleButton} onClick={handleGoogleLogin}>
          <FcGoogle className={styles.googleIcon} />
          Logar com o Google
        </button>
        <div className={styles.linksContainer}>
          <Button url="/register" text="Cadastre-se" />
          <Button url="/resetpasswordrequest/" text="Esqueceu a senha?" />
        </div>
      </div>
    </div>
  );
};

export default Login;
