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
            <Navbar />
            <div className="flex flex-col items-center h-screen bg-[#E8F6FF]">
                <div className = "space-y-4 w-[502px] mt-20">
                    <h1 className="text-4xl font-lato font-medium text-[40px] m-8 leading-[40px] tracking-normal text-center">
                        Login
                    </h1>
                    
                    {/* Email Input */}
                    <p className="text-left font-lato font-normal text-[20px] leading-[20px] tracking-normal">Email</p>
                    <TextBox 
                            type = "text"
                            Placeholder = {"Email"}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={(e) => e.target.style.color = "black"}  // Change text color to black on focus
                            value={email}
                            id="email"
                    />
                    
                    {/* Password Input */}
                    <p className="text-left font-lato font-normal text-[20px] leading-[20px] tracking-normal">Password</p>
                    <TextBox 
                            type = "password"
                            Placeholder = {"Password"}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={(e) => e.target.style.color = "black"}  // Change text color to black on focus
                            value={password}
                            id="password"
                    />
                </div>

                <div className="space-y-6 my-7 w-[502px]">
                    <Button
                        text = "Log In"
                        size = "big"
                        onClick = {handleLogin}
                    />
                    <p className="text-center font-lato text-[20px]">Don't have an account? 
                    &nbsp;	
                        <Link href="/sign-up" className="text-[#4C78E7]">
                            Sign Up!	
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Page;