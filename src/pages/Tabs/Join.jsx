import { useState, useEffect } from 'react'
import api from '../../services/api'
import useAuth from '../../hooks/useAuth'
import { useAuth0 } from '@auth0/auth0-react'

import Agreement from '../../components/join/Agreement'
import Profile from '../../components/join/Profile'
import SignupOption from '../../components/join/SignupOption'
import Payment from '../../components/join/Payment'

function Join() {

  const [step, setStep] = useState(1);
  const { login } = useAuth();
  const { loginWithPopup, user } = useAuth0();

  useEffect(() => {
    if (user) {
      // User is logged in, you can access user information here
      console.log('User information:', user);
    }
  }, [user]);

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handleGoogleSignup = async () => {
    await loginWithPopup({
      authorizationParams: { prompt: "login" }
    });
    alert('Google signup successful');
  };

  return (
    <>
      {step === 1 && <Agreement onClick={handleNext} />}
      {step === 2 && <SignupOption onClick={handleGoogleSignup} />}
      {step === 3 && <ProfileInfo onClick={handleNext} />}
      {step === 4 && <Payment onClick={handleNext} />}
    </>
  )
}

export default Join
