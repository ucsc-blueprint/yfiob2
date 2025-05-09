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
      if (user) {
        setIsLoggedIn(true);
        console.log("User email:", user.email); // Log the user's email for debugging
      } else {
        setIsLoggedIn(false);
        console.log("No user is logged in."); // Log when no user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  const handleLoginClick = () => {
    router.push('/login'); // Navigate to the /login page
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Use the imported `auth` object
      alert("Logout successful!");
      router.push("/login"); // Redirect to the login page
    } catch (error) {
      alert("Logout failed: " + error.message); // Handle errors
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
            <BoxButton
              text="Profile"
              color="blue"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              icon={
                <span
                  className={`ml-2 transform transition-transform ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              }
            />
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white shadow-md rounded-md w-48">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => router.push("/profile")}
                >
                  Results
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex px-8">
            <BoxButton
              text="Login"
              color="blue"
              onClick={handleLoginClick}
            />
          </div>
        )}
      </div>

      {/* Navigation Links - Mobile */}
      <div
        className={`absolute b-top hrefp-20 z-0 left-0 w-full bg-white shadow-md flex flex-col items-center  transition-transform duration-300 md:hidden p-6 ${
          isOpen ? "translate-y-8" : "-translate-y-[200%]"
        }`}
      >
        <Link
          href={"/"}
          onClick={() => setIsOpen(false)}
          className="text-lg text-black hover:text-blue-600 z-0 p-2"
        >
          Home
        </Link>
        <Link
          href={"/take-quiz"}
          onClick={() => setIsOpen(false)}
          className="text-lg text-black hover:text-blue-600 z-10 p-2"
        >
          Take Quiz!
        </Link>
        <Link
          href={"/choose-grade-level"}
          onClick={() => setIsOpen(false)}
          className="text-lg text-black hover:text-blue-600 z-10 p-2"
        >
          Explore Careers
        </Link>
        {isLoggedIn ? (
          <Link
            href={"/profile"}
            onClick={() => setIsOpen(false)}
            className="text-lg text-black bg-[#4C78E757] px-5 py-2 rounded-full hover:text-white z-10 m-2"
          >
            Profile
          </Link>
        ) : (
          <Link
            href={"/login"}
            onClick={() => setIsOpen(false)}
            className="text-lg text-black bg-[#4C78E757] px-5 py-2 rounded-full hover:text-white z-10 m-2"
          >
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};
