import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";
import { getAgeDifference, formateDob } from "../../utils/functions";

import { toast } from "react-toastify";

function Profile() {
  const { isAuthenticated, user } = useAuth0();
  const { setIsLoggedIn } = useAuth();

  console.log('User:', user);

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
    lookingFor: ""
  })

  useEffect(() => {
    if (isAuthenticated) {
      setFormData((prevData) => ({
        ...prevData,
        email: user.email,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleContinue = async () => {
    if (isAuthenticated) {
      if (!formData.firstName || !formData.lastName || !formData.dob || !formData.zip || !formData.gender || !formData.lookingFor) {
        console.error(formData);
        toast.error("All fields are required.");
        return;
      }
      // Proceed with the API call
       await api.post("user", {
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
        lookingFor: formData.lookingFor
      }).then((res) => {
        console.log('User Creation Response:', res);
        if (res.status === 201) {
          toast.success("Profile created successfully.");
          setIsLoggedIn(true);
        } else if (res.status === 409) {
          toast.error("User already exists.");
        } else if (res.status === 400) {
          toast.error("Invalid data provided.");
        } else if (res.status === 500) {
          toast.error("Internal server error.");
        }
      }).catch((err) => {
        console.log(err);
        toast.error("An error occurred while creating profile.");
      })
      // Navigate to the next step, e.g., Payment component
      console.log('Form Data:', formData);
    } else {
      // Handle case where user is not authenticated
      console.warn("User is not authenticated");
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
                  <label
                    className="text-sm font-medium dark:text-white"
                  >
                    You are a:{" "}
                  </label>
                  <div className="flex items-center gap-2">
                    <select required="true" name="gender" value={formData.gender} onChange={(e) => handleInputChange(e)} className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none hover:ring hover:ring-primary focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white dark:accent-white">
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
                    <select required="true" name="lookingFor" value={formData.lookingFor} onChange={(e) => handleInputChange(e)} className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none hover:ring hover:ring-primary focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white dark:accent-white">
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
