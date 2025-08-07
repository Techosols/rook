  const navLinks = [
    { label: 'Home', href: '' },
    { label: 'Features', href: '' },
    { label: 'F.A.Q', href: '' },
  ];
import useTheme from "../hooks/useTheme"; // Assuming you have a custom hook for theme management
import { SunIcon, MoonIcon, AlignCenter, X as XIcon } from "lucide-react";
import React, { useState } from 'react';
function Navbar() {

  const [isopen, setisopen] = useState(false); 
  const { theme, toggleTheme } = useTheme(); // Use when you need Dark/Light mode toggle functionality

  return (
      <section className="header bg-background dark:bg-background-dark text-text dark:text-text-dark shadow-md">
        <nav className="flex items-center justify-between px-4 md:px-12 py-4">
            <div>
              <img
                src="/public/Images/rook-logo-light.png"
                alt="Logo"
                className="h-[40px]"
              />
            </div>
           <div>
            <ul className="hidden md:flex w-full gap-7 text-lg font-light">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="cursor-pointer text-lg">{link.label}</a>
                </li>
              ))}
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
           <div className={`fixed top-0 left-0 w-full h-full bg-white z-50 transition-transform duration-300 md:hidden ${isopen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <img
                src="/public/Images/rook-logo-light.png"
                alt="Logo"
                className="h-[40px]"
              />
              <div className="md:hidden">
                <button onClick={() => setisopen(!isopen)}>
                  {isopen ? <XIcon className="w-6 h-6" /> : <AlignCenter className="w-6 h-6" />}
                </button>
              </div>
            </div>
          <ul className="flex flex-col items-center gap-5 text-lg font-light p-5 mt-32">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="cursor-pointer text-lg">{link.label}</a>
              </li>
            ))}
            <li>
              <button
                onClick={toggleTheme}
                className="cursor-pointer "
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
