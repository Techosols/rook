import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useAuth from "../../hooks/useAuth";

function Profile() {
  const { isAuthenticated } = useAuth0();
  const { setIsLoggedIn } = useAuth();

  const handleContinue = () => {
    console.log("Continue to payment processing", isAuthenticated);
    // Mark user as fully authenticated after profile completion
    setIsLoggedIn(true);
  };

  return (
    <div className=" bg-background dark:bg-background-dark p-3 md:p-6">
      <div className="container mx-auto max-w-[600px] flex flex-col gap-y-3 ">
        <div className="flex flex-col justify-center p-4 border border-gray-400 rounded-lg shadow-lg bg-background dark:bg-background-dark">
          <p className="text-lg text-gray-500 dark:text-white">
            We need these to do a safety screening on you.
          </p>
          <form className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-medium dark:text-white"
              >
                Legal Name
              </label>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none hover:ring hover:ring-primary focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none hover:ring hover:ring-primary focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="dob"
                className="text-sm font-medium dark:text-white"
              >
                Date of Birth
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none hover:ring hover:ring-primary focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white dark:accent-white"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="flex flex-col justify-center p-4 border border-gray-400 rounded-lg shadow-lg bg-background dark:bg-background-dark gap-3 md:gap-6">
          <p className="text-lg text-gray-500 dark:text-white">
            Tell us about you & what you are looking for
          </p>
          <form className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="pname"
                className="text-sm font-medium dark:text-white"
              >
                Preferred Name
              </label>
              <div>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none hover:ring hover:ring-primary focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                  placeholder="You want to be called..."
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="zip"
                className="text-sm font-medium dark:text-white"
              >
                Your ZIP Code
              </label>
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none hover:ring hover:ring-primary focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                  placeholder="US ZIP Codes only"
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div>
                  <label
                    htmlFor="dob"
                    className="text-sm font-medium dark:text-white"
                  >
                    You are a:{" "}
                  </label>
                  <div className="flex items-center gap-2">
                    <select className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none hover:ring hover:ring-primary focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white dark:accent-white">
                      <option value="Man">Man</option>
                      <option value="Woman">Woman</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="dob"
                    className="text-sm font-medium dark:text-white"
                  >
                    Looking for a:
                  </label>
                  <div className="flex items-center gap-2">
                    <select className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none hover:ring hover:ring-primary focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white dark:accent-white">
                      <option value="Man">Man</option>
                      <option value="Woman">Woman</option>
                      <option value="Any">Any</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <p className=" text-sm text-gray-500 dark:text-white">
            In the next step you will enter your debit/credit info.
          </p>
          <button
            className="py-3 px-8 bg-primary dark:bg-primary-dark rounded-full text-white sm:w-auto cursor-pointer"
            onClick={handleContinue}
          >
            <span>Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
