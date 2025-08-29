import useTheme from "../../hooks/useTheme";

function Community() {
   const { theme } = useTheme();
  return (
    <section className="px-6 py-8  bg-background dark:bg-background-dark text-text dark:text-text-dark">
      <div className="flex justify-between items-center flex-col lg:flex-row gap-8 max-w-[1350px] mx-auto">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-normal font-nunito text-left">
            Community
          </h1>
          <ul className="w-full max-w-2xl text-left">
            <div className="flex gap-2">
              <p className="mt-2">
                 <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z " fill={theme === 'dark' ? 'white' : 'dark'}></path>
                </svg>
              </p>
              <li className="py-2">
                It costs $10 to sign up and use Rook for one month.
              </li>
            </div>
            <div className="flex gap-2">
              <p className="mt-2">
                 <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z " fill={theme === 'dark' ? 'white' : 'dark'}></path>
                </svg>
              </p>
              <li className="py-2">
                $30 of that cost is the fee charged by the third-party
                background check processor, to perform the check.
              </li>
            </div>
            <div className="flex gap-2">
              <p className="mt-2">
                 <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z " fill={theme === 'dark' ? 'white' : 'dark'}></path>
                </svg>
              </p>
              <li className="py-2">
                The background check process requires you to provide
                information/documents. If you do not provide these in a timely
                manner, the check may be put on hold, or even terminated. In
                that case, you may not receive a refund (*).
              </li>
            </div>
            <div className="flex gap-2">
              <p className="mt-2">
                 <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z " fill={theme === 'dark' ? 'white' : 'dark'}></path>
                </svg>
              </p>
              <li className="py-2">
                After the check finishes, you can request a copy of your own
                background check report to be emailed to you.
              </li>
            </div>
            <a href="" className="text-primary dark:text-primary-dark">
              <li className="py-2 text-center">
                Full sign-up process and what happens after
              </li>
            </a>
          </ul>
        </div>
        <div>
          <img
            src="/Images/couple-altar.jpg"
            alt="couple altar"
            className="rounded-2xl w-full h-auto"
          />
        </div>
      </div>
      <div className="flex justify-between items-center flex-col lg:flex-row gap-8 max-w-[1350px] mx-auto mt-12">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-normal font-poppins text-left">
            Cost for subsequent months
          </h1>
          <ul className="w-full max-w-2xl text-left">
            <div className="flex gap-2">
              <p className="mt-2">
                 <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z " fill={theme === 'dark' ? 'white' : 'dark'}></path>
                </svg>
              </p>
              <li className="py-2">
                After the first month, you will be charged $5 once a month,
                until you cancel.
              </li>
            </div>
            <div className="flex gap-2">
              <p className="mt-2">
                 <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z " fill={theme === 'dark' ? 'white' : 'dark'}></path>
                </svg>
              </p>
              <li className="py-2">
                You can cancel your Rook subscription in your account settings.
              </li>
            </div>
          </ul>
        </div>
        <div>
          <img
            src="/Images/couple-altar.jpg"
            alt=""
            className="rounded-2xl w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default Community;
