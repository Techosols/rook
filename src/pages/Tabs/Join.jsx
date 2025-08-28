import { useState } from "react";
import userService from "../../services/user";
import useAuth from "../../hooks/useAuth";

import Agreement from "../../components/join/Agreement";
import Profile from "../../components/join/Profile";
import SignupOption from "../../components/join/SignupOption";
import Payment from "../../components/join/Payment";

function Join() {
  const [ loading, setLoading ] = useState(false);
  const [step, setStep] = useState(1);
  const { loginWithPopup, user, isAuthenticated, setNeedProfileCompletion, setUserExternalId } = useAuth();

  async function verifyUser() {
    setLoading(true);
    const response = await userService.verifyUserExistenceByEmail(user.email);
    if (response.status === 204) {
      setNeedProfileCompletion(true);
      setStep(3);
      setLoading(false);
    } else if (response.status === 200) {
      userService.checkUserStatus(response.data.status);
      setUserExternalId(response.data.externalId);
    }
  }

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithPopup({
        authorizationParams: { prompt: "login" },
      });
      if (isAuthenticated) {
        await verifyUser();
      }
      // No need to alert response; Auth0 updates user state automatically
    } catch (error) {
      alert("Login failed: " + (error?.message || error));
    }
  };

  return (
    <>
      {step === 1 && <Agreement onClick={handleNext} />}
      {step === 2 && <SignupOption onClick={handleGoogleSignup} loading={loading} />}
      {step === 3 && <Profile onClick={handleNext} />}
      {step === 4 && <Payment onClick={handleNext} />}
    </>
  );
}

export default Join;
