"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "../../components/Navbar/Navbar";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import TextBox from "../../components/TextBox/TextBox";
import Button from "../../components/Button.jsx";
import { getAuth, signOut } from "firebase/auth";

function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [loggedinflag, setLogin] = useState(false);
    const searchParams = useSearchParams();
    const grade = searchParams.get('grade') || "elementary-school";

    // Redirect logged-in users to another page
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // If the user is logged in, redirect them to the profile page
                router.push(`/take-quiz/${grade}?valid=true`); // Change this to the desired page
            }
        });

        return () => unsubscribe(); // Cleanup the listener on component unmount
    }, [router]);

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
            // Navigate to the quiz with the grade and valid=true parameter
            router.push(`/take-quiz/${grade}?valid=true`);
            setLogin(true);
            console.log(userCredential.user); // Log the user data for debugging
        } catch (error) {
            // Handle errors such as wrong credentials or non-existing accounts
            alert("Login failed: " + error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth); // Use the imported `auth` object
            alert("Logout successful!");
            setLogin(false); // Update the logged-in state
            router.push("/login"); // Redirect to the login page
        } catch (error) {
            alert("Logout failed: " + error.message); // Handle errors
        }
    };

    return (
        <>
            <div className="min-h-screen flex flex-col bg-[#E8F6FF] overflow-hidden">
                <Navbar loggedinflag={loggedinflag} />
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