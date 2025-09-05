import { useEffect, useState } from "react"
import api from "../../services/api"

import Loader from "../Loader";

function Agreement({ onClick }) {

  const [allowSignup, setAllowSignup] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('v2/settings');
        setAllowSignup(response.data.allowNewUserSignups)
      } catch (err) {
        console.error('ERR_SETTING_ENDPOINT', err)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && (
        <Loader containerHeight={"h-46"} />
      )}
      {!loading && (
        <div className="bg-background dark:bg-background-dark p-3 md:p-8 min-h-screen">
          <div className="container mx-auto max-w-2xl flex flex-col gap-y-8">
            {allowSignup ? (
              <>
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-primary dark:text-primary-dark mb-1">Terms & Agreement</h2>
                  <p className="text-base text-gray-500 dark:text-gray-300">Please review and accept our terms to continue.</p>
                </div>
                <div className="bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 md:p-10">
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Service Agreement</h3>
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        Welcome! This is a placeholder for our upcoming service agreement. The final terms will be published here soon.
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        By proceeding, you acknowledge that you have read and understood the preliminary information provided. Our agreement will outline your rights, responsibilities, and the ways we protect your data.
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        Please check back for the finalized content. In the meantime, feel free to reach out to our support team if you have any questions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Important Notes</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="text-primary dark:text-primary-dark mr-2 mt-1">•</span>
                          <span>In the next steps, you will provide us with your legal name and date of birth, to be used to perform a safety screening on you.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary dark:text-primary-dark mr-2 mt-1">•</span>
                          <span>All personal information will be kept secure and confidential.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary dark:text-primary-dark mr-2 mt-1">•</span>
                          <span>By continuing, you agree to our Terms of Service and Privacy Policy.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <button 
                      className="py-3 px-8 bg-primary dark:bg-primary-dark rounded-full text-white cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 font-medium"
                      onClick={onClick}
                    >
                      ACCEPT & CONTINUE
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 md:p-10 text-center">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-2">Signups Temporarily Closed</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    We're sorry, but new user signups are currently closed. Please check back later.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Agreement