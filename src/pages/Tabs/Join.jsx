import { useEffect, useState } from "react";
import api from "../../services/api";

import Agreement from "../../components/join/Agreement";
import SignupOption from "../../components/join/SignupOption";
import Profile from "../../components/join/Profile.jsx"
import Payment from "../../components/join/Payment.jsx"

function Join() {
  const [step, setStep] = useState(1);
  const [allowSignup, setAllowSignup] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };


  useEffect(() => {
    api.get("settings")
      .then((res) => {
        console.log('response: ', res)
        if (res.data.allowNewUserSignups === true) {

          setAllowSignup(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setAllowSignup(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-40 bg-background dark:bg-background-dark">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {allowSignup ? (
        <div>
          {step === 1 ? <Agreement onClick={handleClick} /> : null}
          {step === 2 ? <SignupOption onClick={handleClick} /> : null}
          {step === 3 ? <Profile /> : null}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-40 bg-background dark:bg-background-dark text-text dark:text-text-dark">
          <p className="text-gray-700">New user signups are disabled temporarily</p>
        </div>
      )}
    </>
  );
}


export default Join;
