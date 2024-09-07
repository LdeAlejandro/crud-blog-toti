"use client"
import { React, useEffect } from 'react';
import styles from './page.module.css'
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { SendMail } from '@/utils/SendMail/SendMail';


const Login = () => {

  //Alejandro
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);
  
  if(status === "loading"){
    return <p>Loading...</p>;
  }


  const handleSubmit = async (e)=>{
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

   signIn("credentials", {email, password})

    
  };

  const handleGoogleLogin = async ()=>{
    signIn("google");
  }

  //test4321@gmail.com
  //test4321

  return (
    // Equipe FrontEnd
    <div className={styles.container}>

      <form className= {styles.form} onSubmit={handleSubmit}>
        <input type="email" placeholder='email' className={styles.input} required />
        <input type="password" placeholder='password' className={styles.input} required />
        <button className={styles.button} onClick={() => signIn("credentials")}>
          Login
        </button>
      </form>
      
      
      <button className={styles.button} onClick={handleGoogleLogin}>
        Login with Google
      </button>
      
      <Button url ="/register" text="Cadastrar-se"/>
      <Button url ="/resetpasswordrequest/" text="Esqueceu senha"/>
      </div>
  )
}

export default Login