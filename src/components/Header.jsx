import useTheme from "../hooks/useTheme";
import { SunIcon, MoonIcon, AlignCenter, X as XIcon } from "lucide-react";
import React, { useState } from "react";
import { UserSquare } from "lucide-react";
import useAuth from "../hooks/useAuth";

import useModel from "../hooks/useModel";


function Navbar() {
  const [isopen, setisopen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn } = useAuth();

  const { openModel } = useModel();

  const LIGHT_IMAGE = "/Images/rook-logo-light.png";
  const DARK_IMAGE = "/Images/rook-logo-dark.png";

  const navLinks = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Features", href: "/features" },
    { id: 3, label: "F.A.Q", href: "/faq" },
  ];

  const loggedNavLinks = [
    { id: 1, label: "FAQ", href: "/faq" },
    { id: 2, label: "Contact Us", href: "/contact" },
  ];



  return (
    <section className="header bg-background dark:bg-background-dark text-text dark:text-text-dark shadow-md sticky top-0 z-50">
      <nav className="flex items-center justify-between px-4 md:px-12 py-4">
        <div>
          <img
            src={theme === 'dark' ? DARK_IMAGE : LIGHT_IMAGE}
            alt="Logo"
            className="h-[40px]"
          />
        </div>
        <div>
          {/* Desktop Menu */}
          <ul className="hidden md:flex w-full gap-7 text-lg font-light">
            {
              isLoggedIn ?
                (
                  <div className="flex items-center gap-4">
                    {loggedNavLinks.map((link) => (
                      <li key={link.id}>
                        <a href={link.href} className="cursor-pointer text-lg">{link.label}</a>
                      </li>
                    ))}
                    <li onClick={() => openModel({ for: 'profile', heading: 'Your Profile', dissmissible: true })} className="cursor-pointer text-lg">

                      <UserSquare className="w-6 h-6 " />
                    </li>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    {navLinks.map((link) => (
                      <li key={link.id}>
                        <a href={link.href} className="cursor-pointer text-lg">{link.label}</a>
                      </li>
                    ))}
                  </div>
                )
            }
            <li>
              <button
                onClick={toggleTheme}
                className="cursor-pointer mt-[-2px]"
              >
                {theme === "dark" ? (
                  <MoonIcon className="w-[25px] h-[25px] " />
                ) : (
                  <SunIcon className="w-[25px] h-[25px]" />
                )}
              </button>
            </li>
          </ul>
        </div>
        <div className="md:hidden">
          <button onClick={() => setisopen(!isopen)}>
            {isopen ? <XIcon className="w-6 h-6" /> : <AlignCenter className="w-6 h-6" />}
          </button>
        </div>
      </nav>
      <div className={`fixed top-0 left-0 w-full h-full z-50 md:hidden ${isopen ? '' : 'pointer-events-none'}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <img
            src={theme === 'dark' ? DARK_IMAGE : LIGHT_IMAGE}
            alt="Logo"
            className="h-[40px]"
          />
          <div className="md:hidden">
            <button onClick={() => setisopen(!isopen)}>
              {isopen ? <XIcon className="w-6 h-6" /> : <AlignCenter className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <ul className={`flex flex-col justify-center items-center gap-5 text-lg font-light p-5 h-full transition-transform duration-300 md:hidden  bg-background dark:bg-background-dark ${isopen ? 'translate-x-0 opacity-100' : 'translate-x-full bg-transparent'}`}>
          {
            isLoggedIn ? (
              <div className="flex flex-col justify-center items-center">
                {loggedNavLinks.map((link) => (
                  <li key={link.id}>
                    <a href={link.href} className="cursor-pointer text-lg">{link.label}</a>
                    </li>
                  ))}
                  <li onClick={() => openModel({ for: 'profile', heading: 'Your Profile' })} className="cursor-pointer text-lg text-center">
                    <UserSquare className="w-6 h-6 " />
                  </li>
                </div>
              ) : (
                <div>
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <a href={link.href} className="cursor-pointer text-lg">{link.label}</a>
                    </li>
                  ))}
                </div>
              )
          }
          <li>
            <button
              onClick={toggleTheme}
              className="cursor-pointer flex justify-center items-center"
            >
              {theme === "dark" ? (
                <MoonIcon className="w-[25px] h-[25px] " />
              ) : (
                <SunIcon className="w-[25px] h-[25px]" />
              )}
            </button>
          </li>
        </ul>
      </div>
    </section>

  );
}

export default Navbar;
