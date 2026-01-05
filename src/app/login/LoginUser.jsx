"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "../../components/Navbar/Navbar";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import TextBox from "../../components/TextBox/TextBox";
import Button from "../../components/Button.jsx";

export function LoginUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [loggedinflag, setLogin] = useState(false);

    // Redirect logged-in users to another page
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // If the user is logged in, redirect them to the profile page
                router.push(`/`); // Change this to the desired page
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
            await signInWithEmailAndPassword(auth, email, password);
            // Navigate to the quiz with the grade and valid=true parameter
            router.push(`/`);
            setLogin(true);
        } catch (error) {
            // Handle errors such as wrong credentials or non-existing accounts
            alert("Invalid email or password");
        }
    };

    return (
        <>
            <div className="min-h-screen flex flex-col bg-[#E8F6FF] overflow-hidden">
                <Navbar loggedinflag={loggedinflag} />
                {/* Centered Login Content */}
                <div className="flex-grow flex items-center justify-center">
                    <div className="w-[502px] space-y-6">
                        <h1 className="text-4xl font-secondary font-bold text-[40px] leading-[40px] tracking-normal text-center mb-8">
                            Login
                        </h1>
                        {/* Email Input */}
                        <div className="space-y-1">
                            <p className="text-left font-secondary font-normal text-[20px]">
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
                            <p className="text-left font-secondary font-normal text-[20px]">
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
                        <p className="text-center font-secondary text-[20px]">
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

export default LoginUser;
