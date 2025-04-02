"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "../../components/Navbar/Navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";

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
            <Navbar />
            <div className="flex flex-col items-center h-screen bg-[#E8F6FF]">
                <h1 className="text-4xl font-lato font-medium text-[40px] text-center mb-5 mt-[126px]">Login</h1>
                <div>
                    {/* Email Input */}
                    <p className="text-left m-3 w-[502px] font-lato font-normal text-[20px] leading-[20px] tracking-normal">Email</p>
                    <input
                        type="text"
                        className="w-[502px] h-[61px] rounded-[10px] text-[20px] text-[#898989] font-medium leading-[20px] pl-[30px] flex items-center"
                        placeholder={"Email"}
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Password Input */}
                    <p className="text-left m-3 mt-4 w-[502px] font-lato font-normal text-[20px] leading-[20px] tracking-normal">Password</p>
                    <input
                        type="password"
                        className="w-[502px] h-[61px] rounded-[10px] text-[20px] text-[#898989] font-medium leading-[20px] pl-[30px] flex items-center"
                        placeholder={"Password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="mt-7 text-[24px] w-full font-lato h-[63px] bg-blue-500 text-white rounded-[30px]"
                        onClick={handleLogin}
                    >
                        Log In
                    </button>
                    <p className="mt-9 ml-28 font-lato">Don't have an account? <span className="text-[#4C78E7]">Sign Up!</span></p>
                </div>
            </div>
        </>
    );
}

export default Page;