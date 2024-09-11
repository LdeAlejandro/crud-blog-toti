"use client";
import React, { useState, useEffect, useRef } from 'react';
import { VerifyEmail } from '@/utils/VerifyEmail/VerifyEmail';

const Verify = () => {
  const [token, setToken] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const hasFetched = useRef(false); // Use useRef to track if the effect has run

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
           
          } else {
            setVerificationStatus("A verificação falhou");
           
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
    <div>{verificationStatus}</div>
  );
};

export default Verify;
