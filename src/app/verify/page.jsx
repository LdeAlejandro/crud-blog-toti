"use client";
import React, { useState, useEffect } from 'react';
import { VerifyEmail } from '@/utils/VerifyEmail/VerifyEmail';

const Verify = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const url = new URL(window.location.href);
      const token = url.searchParams.get('token');
      setToken(token);

      console.log('Token from URL:', token);
      
      if (token) {
        const result = await VerifyEmail(token);
        console.log(result)
      }
    };

    fetchToken();
  }, []); 

  return (
    <div>Verify</div>
  );
};

export default Verify;
