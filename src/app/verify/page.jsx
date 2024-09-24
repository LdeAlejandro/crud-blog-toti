"use client";
import React, { useState, useEffect, useRef } from 'react';
import { VerifyEmail } from '@/utils/VerifyEmail/VerifyEmail';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

const Verify = () => {
  const [token, setToken] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const hasFetched = useRef(false); // Use useRef to track if the effect has run

  const router = useRouter();

  useEffect(() => {
    // Check if the effect has already been executed
    if (hasFetched.current) return;

    const fetchToken = async () => {
      try {
        // Retrieve the token from the URL
        const url = new URL(window.location.href);
        const token = url.searchParams.get('token');
        setToken(token);
        console.log('Token from URL:', token);

      
        if (token) {
          const result = await VerifyEmail(token);
          if (result.status === 200) {
            setVerificationStatus("Conta verificada");
    
          }else if(result.status === 409){
            setVerificationStatus("Conta ja verificada");

          } else {
            setVerificationStatus("Houve um problema com a verificação.");
            router.push("/account/myprofile") 
          }
        }
      } catch (error) {
        console.error('Error during token verification:', error);
      }
    };

    fetchToken();

 
    hasFetched.current = true;
  }, []); 

  return (
    <div className={styles.container}>{verificationStatus}</div>
  );
};

export default Verify;
