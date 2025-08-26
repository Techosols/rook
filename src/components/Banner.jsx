import React from "react";
import { useEffect, useState } from "react";
import useTab from "../hooks/useTab";
import useAuth from "../hooks/useAuth";

function Banner() {
  const { setActiveTab } = useTab();
  const { loginWithPopup } = useAuth();
  const [atTop, setAtTop] = useState(() => window.scrollY < 20);

  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const current = window.scrollY;
      if (current < 20 || current < lastScroll) {
        setAtTop(true); // show on scroll up or at top
      } else {
        setAtTop(false); // hide on scroll down
      }
      lastScroll = current;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSignIn(e) {
    e.preventDefault();

    loginWithPopup({
      authorizationParams: {
        prompt: "login",
      },
    }).catch((error) => {
      console.error("Login failed:", error);
    });
  }

  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 256 256"
          className="text-white"
          fill="currentColor"
        >
          <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-52-56H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-24,16v24H116V152ZM80,164a12,12,0,0,1,12-12h8v24H92A12,12,0,0,1,80,164Zm84,12h-8V152h8a12,12,0,0,1,0,24ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Z"></path>
        </svg>
      ),
      tab: "background",
      text: "No bots or spammers. Everyone has background check done",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 256 256"
          className="text-white"
          fill="currentColor"
        >
          <path d="M232,120A104.12,104.12,0,0,0,128,16h0A104.12,104.12,0,0,0,24,120a7.94,7.94,0,0,0,3.05,6.27.93.93,0,0,0,.15.13L120,196v20h-8a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16h-8V196l92.8-69.6h0A8,8,0,0,0,232,120Zm-16.36-8H175.83c-1.54-37.95-13.91-62.43-25.11-77A88.2,88.2,0,0,1,215.64,112ZM128,34a76.89,76.89,0,0,1,13.88,16.22C149.49,62,158.45,81.87,159.82,112H96.18c1.37-30.13,10.33-50,17.94-61.74A76.92,76.92,0,0,1,128,34Zm26.4,94L128,175.53,101.6,128Zm-71.11,0,19.5,35.09L56,128Zm89.42,0H200l-46.79,35.09ZM105.28,35c-11.2,14.57-23.57,39.05-25.11,77H40.36A88.2,88.2,0,0,1,105.28,35Z"></path>
        </svg>
      ),
      tab: "background",
      text: "See background check summary in profile of users you are connected to",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 256 256"
          className="text-white"
          fill="currentColor"
        >
          <path d="M248,120a48.05,48.05,0,0,0-48-48H160.2c-2.91-.17-53.62-3.74-101.91-44.24A16,16,0,0,0,32,40V200a16,16,0,0,0,26.29,12.25c37.77-31.68,77-40.76,93.71-43.3v31.72A16,16,0,0,0,159.12,214l11,7.33A16,16,0,0,0,194.5,212l11.77-44.36A48.07,48.07,0,0,0,248,120ZM48,199.93V40h0c42.81,35.91,86.63,45,104,47.24v65.48C134.65,155,90.84,164.07,48,199.93Zm131,8,0,.11-11-7.33V168h21.6ZM200,152H168V88h32a32,32,0,1,1,0,64Z"></path>
        </svg>
      ),
      tab: "pricing",
      text: "No ads, no premium features. You get everything for $5/mo.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 256 256"
          className="text-white"
          fill="currentColor"
        >
          <path d="M230.6,49.53A15.81,15.81,0,0,0,216,40H40A16,16,0,0,0,28.19,66.76l.08.09L96,139.17V216a16,16,0,0,0,24.87,13.32l32-21.34A16,16,0,0,0,160,194.66V139.17l67.74-72.32.08-.09A15.8,15.8,0,0,0,230.6,49.53ZM40,56h0Zm106.18,74.58A8,8,0,0,0,144,136v58.66L112,216V136a8,8,0,0,0-2.16-5.47L40,56H216Z"></path>
        </svg>
      ),
      tab: "filter",
      text: "15+ filters to find your matches with.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 256 256"
          className="text-white"
          fill="currentColor"
        >
          <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z"></path>
        </svg>
      ),
      tab: "background",
      text: "No lying about age. We find age from your background check.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 256 256"
          className="text-white"
          fill="currentColor"
        >
          <path d="M200,112a8,8,0,0,1-8,8H152a8,8,0,0,1,0-16h40A8,8,0,0,1,200,112Zm-8,24H152a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Zm40-80V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Zm-80.26-34a8,8,0,1,1-15.5,4c-2.63-10.26-13.06-18-24.25-18s-21.61,7.74-24.25,18a8,8,0,1,1-15.5-4,39.84,39.84,0,0,1,17.19-23.34,32,32,0,1,1,45.12,0A39.76,39.76,0,0,1,135.75,166ZM96,136a16,16,0,1,0-16-16A16,16,0,0,0,96,136Z"></path>
        </svg>
      ),
      tab: "pictures",
      text: "Reviewed and verified profile pictures.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 256 256"
          className="text-white"
          fill="currentColor"
        >
          <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
        </svg>
      ),
      tab: "community",
      text: "Suggest changes privately, or tag profiles publicly",
    },
  ];
  return (
    <section className="relative bg-[url(Images/bride-groom-their-wedding-ceremony.jpg)] bg-no-repeat bg-cover bg-[center_20%] bg-background dark:bg-background-dark text-text dark:text-text-dark px-4 py-10 ">
      {/* Top white gradient overlay - theme aware */}
      <div className="absolute inset-0 w-full h-full bg-white/80 dark:bg-black/60 pointer-events-none z-0"></div>
      {/* Bottom white gradient overlay - theme aware */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent dark:from-black dark:to-transparent pointer-events-none z-10"></div>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
        {/* LEFT COLUMN - LIST */}
        <div className="container mx-auto w-full max-w-2xl">
          <ul className="space-y-3">
            {features.map((feature, idx) => (
              <li
                key={idx}
                onClick={() => setActiveTab(feature.tab)}
                className="transition-all duration-300 hover:-translate-y-2.5 shadow-lg bg-background dark:bg-background-dark text-text dark:text-text-dark px-4 py-3 rounded-full w-full md:w-[800px] cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="bg-primary dark:bg-primary-dark text-white rounded-full flex items-center justify-center mr-2 w-7 h-7">
                    {feature.icon}
                  </span>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT COLUMN - TEXT + BUTTONS */}
        <div
          className={`w-full max-w-xl text-center md:text-left transition-all duration-700 sm:transition-all sm:duration-700
      ${atTop ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight">
            {/* Mobile: Online Dating Like | you remember; Large: each line centered */}
            <span className="block text-center sm:hidden">
              Online Dating Like
            </span>
            <span className="block text-center sm:hidden">you remember</span>
            <span className="hidden sm:block text-center">Online Dating</span>
            <span className="hidden sm:block text-center">Like you</span>
            <span className="hidden sm:block text-center">remember</span>
          </h1>
          <div className="mt-5 text-base sm:text-lg font-normal text-center flex flex-wrap items-center justify-center">
            <span>
              $10 for the first month, $5 
            </span>
            <span>
              <span className="">/month afterward</span>
            </span>
          </div>
          <div className="flex flex-row flex-wrap gap-4 mt-6 justify-center items-center ">
            <button
              className="py-3 px-8 bg-primary dark:bg-primary-dark rounded-full text-white w-auto cursor-pointer"
              onClick={() => setActiveTab("join")}
            >
              Join Us
            </button>
            <button
              className="py-3 px-8 bg-primary dark:bg-primary-dark rounded-full text-white w-auto cursor-pointer"
              onClick={(e) => handleSignIn(e)}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
