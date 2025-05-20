"use client";

import BoxButton from "../../components/BoxButton.jsx";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";


export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe;
  }, []);

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logout successful!");
      router.push("/login");
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <div className="bg-white shadow-md font-lato">
      <div className="flex items-center justify-between px-6 h-[20vw] md:h-auto">
        {/* Logo */}
        <div className="font-bold py-2 z-30">
          <Link href={"/"}>
            <Image
              width={170}
              height={20}
              priority
              src="/assets/YFIOBLogo.png"
              alt="YFIOB Logo"
              aria-label="Logo"
            />
          </Link>
        </div>

        {/* Hamburger Menu */}
        <button
          className="w-12 h-16 flex items-center justify-center md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="space-y-2">
            <span
              className={`block h-0.5 bg-black rounded-full transition-all duration-300 ${
                isOpen ? "w-8 rotate-45 translate-y-2.5" : "w-8"
              }`}
            />
            <span
              className={`block h-0.5 bg-black rounded-full transition-all duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 bg-black rounded-full transition-all duration-300 ${
                isOpen ? "w-8 -rotate-45 -translate-y-2.5" : "w-8"
              }`}
            />
          </div>
        </button>

        {/* Navigation Links - Desktop */}
        <div className="">
          <Link href={"/"} className="px-3 hover:text-[#4C78E7] py-1 text-[1.1rem]">
            Home
          </Link>
          <Link href={"/pre-quiz"} className="px-3 hover:text-[#4C78E7] py-1 text-[1.1rem]">
            Take Quiz!
          </Link>
          <Link href={"/choose-grade-level"} className="px-3 hover:text-[#4C78E7] py-1 text-[1.1rem]">
            Explore Careers
          </Link>
        </div>

        {/* Log In / Profile Button - Desktop */}
        {isLoggedIn ? (
          <div className="hidden md:flex px-8 relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center justify-center w-[180px] h-[62px] text-[20px] font-semibold font-kumbh ${
                isDropdownOpen
                  ? "bg-[#1A6567] text-white rounded-t-[10px] rounded-b-none"
                  : "bg-[#1A6567] text-white rounded-[10px]"
              } shadow-md transition-all`}
            >
              <span className="font-kumbh">Profile</span>
              <span className="ml-2">
                {isDropdownOpen ? (
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_3691_9458"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="36"
                      height="36"
                    >
                      <rect width="36" height="36" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_3691_9458)">
                      <path
                        d="M18 16.2L11.1 23.1L9 21L18 12L27 21L24.9 23.1L18 16.2Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                ) : (
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_3691_9458"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="36"
                      height="36"
                    >
                      <rect width="36" height="36" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_3691_9458)">
                      <path
                        d="M18 19.8L24.9 12.9L27 15L18 24L9 15L11.1 12.9L18 19.8Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                )}
              </span>
            </button>
            {isDropdownOpen && (
              <div className="absolute left-8 top-[100%] -mt-[1px] w-[180px] bg-white border border-[#1A6567] rounded-b-[10px] shadow-md">
                {/* Header */}

                <div className="flex flex-col">
                  <button
                    className="flex items-center text-[#1A6567] text-[18px] px-4 py-3 hover:bg-gray-100"
                    onClick={() => {
                      router.push("/profile");
                      setIsDropdownOpen(false);
                    }}
                  >
                    Results
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-auto">
                    < path fillRule="evenodd" clip-rule="evenodd" d="M2.625 1.5C2.32663 1.5 2.04048 1.61853 1.8295 1.8295C1.61853 2.04048 1.5 2.32663 1.5 2.625C1.5 2.92337 1.61853 3.20952 1.8295 3.4205C2.04048 3.63147 2.32663 3.75 2.625 3.75H15.375C15.6734 3.75 15.9595 3.63147 16.1705 3.4205C16.3815 3.20952 16.5 2.92337 16.5 2.625C16.5 2.32663 16.3815 2.04048 16.1705 1.8295C15.9595 1.61853 15.6734 1.5 15.375 1.5H2.625ZM1.5 7.125C1.5 6.82663 1.61853 6.54048 1.8295 6.3295C2.04048 6.11853 2.32663 6 2.625 6H10.5C10.7984 6 11.0845 6.11853 11.2955 6.3295C11.5065 6.54048 11.625 6.82663 11.625 7.125C11.625 7.42337 11.5065 7.70952 11.2955 7.9205C11.0845 8.13147 10.7984 8.25 10.5 8.25H2.625C2.32663 8.25 2.04048 8.13147 1.8295 7.9205C1.61853 7.70952 1.5 7.42337 1.5 7.125ZM15 18.75C15.9946 18.75 16.9484 18.3549 17.6516 17.6516C18.3549 16.9484 18.75 15.9946 18.75 15C18.75 14.0054 18.3549 13.0516 17.6516 12.3483C16.9484 11.6451 15.9946 11.25 15 11.25C14.0054 11.25 13.0516 11.6451 12.3483 12.3483C11.6451 13.0516 11.25 14.0054 11.25 15C11.25 15.9946 11.6451 16.9484 12.3483 17.6516C13.0516 18.3549 14.0054 18.75 15 18.75ZM15 21C16.251 21 17.4105 20.6175 18.372 19.9635L20.58 22.17C20.683 22.2805 20.8072 22.3692 20.9452 22.4307C21.0832 22.4922 21.2322 22.5252 21.3832 22.5279C21.5343 22.5306 21.6843 22.5028 21.8244 22.4462C21.9645 22.3896 22.0917 22.3054 22.1986 22.1986C22.3054 22.0917 22.3896 21.9645 22.4462 21.8244C22.5028 21.6843 22.5306 21.5343 22.5279 21.3832C22.5252 21.2322 22.4922 21.0832 22.4307 20.9452C22.3692 20.8072 22.2805 20.683 22.17 20.58L19.9635 18.372C20.7163 17.264 21.0767 15.9359 20.9873 14.5993C20.8978 13.2627 20.3636 11.9945 19.4699 10.9967C18.5761 9.99889 17.3741 9.32889 16.0553 9.09342C14.7366 8.85795 13.377 9.07057 12.1931 9.69739C11.0092 10.3242 10.0692 11.3292 9.52268 12.5522C8.97618 13.7753 8.85469 15.146 9.17755 16.4461C9.50041 17.7462 10.2491 18.9009 11.3042 19.7261C12.3594 20.5514 13.6604 20.9998 15 21ZM2.625 10.5C2.32663 10.5 2.04048 10.6185 1.8295 10.8295C1.61853 11.0405 1.5 11.3266 1.5 11.625C1.5 11.9234 1.61853 12.2095 1.8295 12.4205C2.04048 12.6315 2.32663 12.75 2.625 12.75H6C6.29837 12.75 6.58452 12.6315 6.7955 12.4205C7.00647 12.2095 7.125 11.9234 7.125 11.625C7.125 11.3266 7.00647 11.0405 6.7955 10.8295C6.58452 10.6185 6.29837 10.5 6 10.5H2.625Z" fill="#185D6D"/>
                    </svg>

                  </button>

                  <div className="border-t border-gray-300"></div>

                  <button
                    className="flex items-center text-[#EB5757] text-[18px] px-4 py-3 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-auto">
                      <path d="M2 18C1.45 18 0.979333 17.8043 0.588 17.413C0.196667 17.0217 0.000666667 16.5507 0 16V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H9V2H2V16H9V18H2ZM13 14L11.625 12.55L14.175 10H6V8H14.175L11.625 5.45L13 4L18 9L13 14Z" fill="#E74C4C"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex px-8">
                <button
      onClick={handleLoginClick}
      className="flex items-center justify-center w-[180px] h-[62px] text-[20px] font-semibold font-kumbh bg-[#1A6567] text-white rounded-[10px] shadow-md transition-all"
    >
      <span className="font-kumbh">Login</span>
    </button>
          </div>
        )}

      </div>

      {/* Navigation Links - Mobile */}
      <div
        className={`absolute z-0 left-0 w-full bg-white shadow-md flex flex-col items-center transition-transform duration-300 md:hidden p-6 ${
          isOpen ? "translate-y-8" : "-translate-y-[200%]"
        }`}
      >
        <Link
          href={"/"}
          onClick={() => setIsOpen(false)}
          className="text-lg text-black hover:text-blue-600 p-2"
        >
          Home
        </Link>
        <Link
          href={"/take-quiz"}
          onClick={() => setIsOpen(false)}
          className="text-lg text-black hover:text-blue-600 p-2"
        >
          Take Quiz!
        </Link>
        <Link
          href={"/choose-grade-level"}
          onClick={() => setIsOpen(false)}
          className="text-lg text-black hover:text-blue-600 p-2"
        >
          Explore Careers
        </Link>
        {isLoggedIn ? (
          <Link
            href={"/profile"}
            onClick={() => setIsOpen(false)}
            className="text-lg text-black bg-[#4C78E757] px-5 py-2 rounded-full hover:text-white m-2"
          >
            Profile
          </Link>
        ) : (
          <Link
            href={"/login"}
            onClick={() => setIsOpen(false)}
            className="text-lg text-black bg-[#4C78E757] px-5 py-2 rounded-full hover:text-white m-2"
          >
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};
