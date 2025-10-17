
import ReCAPTCHA from 'react-google-recaptcha';
import React, { useEffect, useRef, useState } from 'react';

export default function Recaptcha({isCaptchaValid,setIsCaptchaValid,resetCaptchaValid}:any) {

  const captchaRef = useRef<ReCAPTCHA | null>(null);
  
  const handleCaptchaChange = (value:any) => {
    setIsCaptchaValid(value !== null);
  };

  const resetCaptcha = () => {
    if (captchaRef.current) {
      captchaRef.current.reset();
      setIsCaptchaValid(false);
    }
  };

  useEffect(() => {
    if (resetCaptchaValid) {
      resetCaptcha();
    }
  }, [resetCaptchaValid]);
  
  return (
    //prepro
     //<ReCAPTCHA sitekey='6LecrwopAAAAAGjV2sD2DbOD8Iv8Y5i7YirlOF--' ref={captchaRef} onChange={handleCaptchaChange } />

    //local
    // <ReCAPTCHA sitekey='6LecrwopAAAAAGjV2sD2DbOD8Iv8Y5i7YirlOF--' ref={captchaRef} onChange={handleCaptchaChange } />

    //prod
    <ReCAPTCHA sitekey='6LfWa2EpAAAAAKgBirDTxt8hBQGxX4LbwpgLJWnD' ref={captchaRef} onChange={handleCaptchaChange } />
  )
}