import { useEffect, useState } from "react"
import api from "../../services/api"

import Loader from "../Loader";

function Agreement({ onClick }) {

  const [allowSignup, setAllowSignup] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('settings');
        setAllowSignup(response.data.allowNewUserSignups)
      } catch (error) {
        console.error('Error fetching agreement data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && (
        <Loader containerHeight={46} />
      )}
      {!loading && (
        <div className="bg-background dark:bg-background-dark dark:text-white">
          <div className="container mx-auto p-4 text-center">
            {allowSignup ? (
              <div>
                <h1 className="text-2xl font-bold mb-4">Agreement</h1>
                <p className="py-4">
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not only five
                  centuries, but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with the release
                  of Letraset sheets containing Lorem Ipsum passages, and more recently
                  with desktop publishing software like Aldus PageMaker including versions
                  of Lorem Ipsum.
                </p>
                <ul className="py-4">
                  <li>In the next steps, you will provide us with your legal name and date of birth, to be used to perform a safety screening on you.</li>
                  <li>More reminders here.</li>
                </ul>
                <button className="bg-primary dark:bg-primary-dark text-white px-6 py-2 rounded-full cursor-pointer" onClick={onClick}>
                  ACCEPT & CONTINUE
                </button>
              </div>
            ) : (
              <div className="py-4">
                <p>We're sorry, but new user signups are currently closed.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Agreement