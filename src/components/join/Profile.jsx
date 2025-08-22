import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useAuth from "../../hooks/useAuth";
import { getAgeDifference, formateDob } from "../../utils/functions";

import { toast } from "react-toastify";

function Profile() {
  const { isAuthenticated, user } = useAuth0();
  const { createUserProfile, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("User:", user);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    preferredName: "",
    zip: "",
    gender: "",
    lookingFor: "",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prevData) => ({
        ...prevData,
        email: user.email,
      }));
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContinue = async () => {
    if (!isAuthenticated) {
      toast.error("You must be authenticated to create a profile.");
      return;
    }

    // Validate required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.dob ||
      !formData.zip ||
      !formData.gender ||
      !formData.lookingFor
    ) {
      console.error("Missing required fields:", formData);
      toast.error("All fields are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Use the AuthProvider's createUserProfile method
      await createUserProfile({
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        emailAddress: formData.email,
        phoneNumber: formData.phone,
        dateOfBirth: formateDob(formData.dob),
        preferredName: formData.preferredName,
        postalCode: formData.zip,
        gender: formData.gender,
        ageInYears: getAgeDifference(formData.dob),
        lookingFor: formData.lookingFor,
      });

      console.log("Profile created successfully");
      // The AuthProvider will handle setting isLoggedIn to true
    } catch (error) {
      console.error("Profile creation failed:", error);
      // Error handling is done in the AuthProvider
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" bg-background dark:bg-background-dark p-3 md:p-6">
      <div className="container mx-auto max-w-[800px] flex flex-col gap-y-3 ">
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
                  name="firstName"
                  required="true"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange(e)}
                  className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none hover:ring hover:ring-primary focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="middleName"
                  required="true"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange(e)}
                  className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none hover:ring hover:ring-primary focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                  placeholder="Middle Name"
                />
                <input
                  type="text"
                  required="true"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange(e)}
                  className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none hover:ring hover:ring-primary focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2">
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
                    name="dob"
                    lang="en-CA"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none hover:ring hover:ring-primary focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white dark:accent-white"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium dark:text-white"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="phone"
                    lang="en-CA"
                    required="true"
                    value={formData.phone}
                    placeholder="US Phone Number"
                    pattern="^\(\d{3}\) \d{3}-\d{4}$"
                    onChange={handleInputChange}
                    onInput={(e) =>
                      (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none hover:ring hover:ring-primary focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white dark:accent-white"
                  />
                </div>
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
                  name="preferredName"
                  value={formData.preferredName}
                  onChange={(e) => handleInputChange(e)}
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
                  required="true"
                  name="zip"
                  value={formData.zip}
                  onChange={(e) => handleInputChange(e)}
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
                  <label className="text-sm font-medium dark:text-white">
                    You are a:{" "}
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      required="true"
                      name="gender"
                      value={formData.gender}
                      onChange={(e) => handleInputChange(e)}
                      className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none hover:ring hover:ring-primary focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white dark:accent-white"
                    >
                      <option value="Man">Man</option>
                      <option value="Woman">Woman</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="looking-for"
                    className="text-sm font-medium dark:text-white"
                  >
                    Looking for a:
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      required="true"
                      name="lookingFor"
                      value={formData.lookingFor}
                      onChange={(e) => handleInputChange(e)}
                      className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none hover:ring hover:ring-primary focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white dark:accent-white"
                    >
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
            className="py-3 px-8 bg-primary dark:bg-primary-dark rounded-full text-white sm:w-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleContinue}
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Profile...</span>
              </div>
            ) : (
              <span>Continue</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
