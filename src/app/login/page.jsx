"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter  } from "next/navigation";
import { Navbar } from "../../components/Navbar/Navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import TextBox from "../../components/TextBox/TextBox";
import Button from "../../components/Button.jsx";

function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();


    const handleLogin = async () => {
		if (!email || !password) {
			alert("Please enter both email and password.");
			return;
		}
	
		try {
			// Use Firebase's signInWithEmailAndPassword method
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			// If successful, you can get the user data from userCredential.user
			alert("Login successful!");
			// router.push(`/welcome?email=${encodeURIComponent(email)}`);
			router.push(`/`);
		} catch (error) {
			// Handle errors such as wrong credentials or non-existing accounts
			alert("Login failed: " + error.message);
		}
	};

    return (
      <>
        <div className="min-h-screen flex flex-col bg-[#E8F6FF] overflow-hidden">
          <Navbar />

          {/* Centered Login Content */}
          <div className="flex-grow flex items-center justify-center">
            <div className="w-[502px] space-y-6">
              <h1 className="text-4xl font-lato font-bold text-[40px] leading-[40px] tracking-normal text-center mb-8">
                Login
              </h1>

              {/* Email Input */}
              <div className="space-y-1">
                <p className="text-left font-lato font-normal text-[20px]">
                  Email
                </p>
                <TextBox
                  type="text"
                  Placeholder={"Email"}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={(e) => (e.target.style.color = "black")}
                  value={email}
                  id="email"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <p className="text-left font-lato font-normal text-[20px]">
                  Password
                </p>
                <TextBox
                  type="password"
                  Placeholder={"Password"}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={(e) => (e.target.style.color = "black")}
                  value={password}
                  id="password"
                />
              </div>

              {/* Log In Button */}
              <Button text="Log In" size="big" onClick={handleLogin} />

              {/* Sign Up Link */}
              <p className="text-center font-lato text-[20px]">
                Don't have an account?{" "}
                <Link href="/sign-up" className="text-[#4C78E7]">
                  Sign Up!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
}

export default Page;