import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getAgeDifference, formateDob } from "../../utils/functions";
import useAuth from "../../hooks/useAuth";
import userService from "../../services/user";

import { toast } from "react-toastify";

function Profile({ onClick }) {
  const { isAuthenticated, user } = useAuth0();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { needProfileCompletion } = useAuth();

  console.log(' User: ', user)

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

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.dob ||
      !formData.zip ||
      !formData.gender ||
      !formData.lookingFor
    ) {
      console.error("Missing required fields:", formData);
      toast.error("Please fill required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const profileData = {
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
        dob: formData.dob,
      };

      await userService.verifyPII(profileData)
        .then(async (res) => {
          if (res.status === 200) {
            await userService.registerNewUser(profileData)
              .then((response) => {
                if (response?.status === 201) {
                  onClick(); 
                }
              })
              .catch((error) => {
                console.error("ERR_PROFILE_CREATION:", error);
              });
          }
        })
        .catch((error) => {
          console.error("ERR_PII_CHECK:", error);
        });

      return;


    } catch (error) {
      console.error("ERR_PROFILE_CREATION", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background dark:bg-background-dark p-3 md:p-8 min-h-screen">
      {needProfileCompletion && (
        <div className="container mx-auto max-w-2xl flex flex-col gap-y-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-primary dark:text-primary-dark mb-1">Complete Your Profile</h2>
            <p className="text-center text-gray-600 dark:text-gray-400">{"("} {user.email} {")"}</p>
            <p className="text-base text-gray-500 dark:text-gray-300">We need these details to do a safety screening on you.</p>
          </div>
          <div className="bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 md:p-10">
            {/* Personal Info Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="firstName" className="text-sm font-medium dark:text-white mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                    placeholder="First Name"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="middleName" className="text-sm font-medium dark:text-white mb-1">Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                    placeholder="Middle Name"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="lastName" className="text-sm font-medium dark:text-white mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                    placeholder="Last Name"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="dob" className="text-sm font-medium dark:text-white mb-1">Date of Birth <span className="text-gray-500 dark:text-gray-400">MM-DD-YYYY</span></label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-sm font-medium dark:text-white mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    placeholder="US Phone Number"
                    onChange={handleInputChange}
                    onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="zip" className="text-sm font-medium dark:text-white mb-1">ZIP Code</label>
                  <input
                    type="text"
                    name="zip"
                    required
                    value={formData.zip}
                    onChange={handleInputChange}
                    inputMode="numeric"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                    placeholder="US ZIP Codes only"
                    onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
                  />
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="preferredName" className="text-sm font-medium dark:text-white mb-1">Preferred Name</label>
                  <input
                    type="text"
                    name="preferredName"
                    value={formData.preferredName}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                    placeholder="You want to be called..."
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="gender" className="text-sm font-medium dark:text-white mb-1">You are a: <span className="text-gray-500 dark:text-gray-400">gender</span></label>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select</option>
                    <option value="Man">Man</option>
                    <option value="Woman">Woman</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="lookingFor" className="text-sm font-medium dark:text-white mb-1">Looking for a:</label>
                  <select
                    name="lookingFor"
                    required
                    value={formData.lookingFor}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select</option>
                    <option value="Man">Man</option>
                    <option value="Woman">Woman</option>
                    <option value="Any">Any</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">In the next step you will enter your debit/credit info.</p>
              <button
                type="button"
                className="py-3 px-8 bg-primary dark:bg-primary-dark rounded-full text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                onClick={handleContinue}
                disabled={isSubmitting}
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
      )}
    </div>
  );
}

export default Profile;
