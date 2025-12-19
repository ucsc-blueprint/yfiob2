"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { auth } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleGradeClick = (grade) => {
        if (user) {
            if (grade == "high-school"){
                router.push(`/college-interest?grade=${grade}&valid=true`);
            }
            else{
                router.push(`/take-quiz/${grade}?valid=true`);
            }
        } else {
            router.push(`/choose-account-type?grade=${grade}`);
        }
    }

    if (loading){
        return <p>Loading Quiz...</p>
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="z-10 relative">
                <Navbar />
            </div>
            
            {/* Centered content - fixed overlap issue */}
            <div className="bg-[#E8F6FF] flex-grow flex items-center justify-center pt-0">
                <div className="max-w-6xl w-full px-8 pt-0 pb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-primary">Career Quiz</h2>
                        <p className="mt-3 font-primary text-lg">
                            Choose your grade level to begin!
                        </p>
                    </div>
                    <div className="flex items-center justify-center space-x-12">
                        <button
                            onClick={() => handleGradeClick("elementary-school")}
                            className="flex flex-col items-center cursor-pointer focus:outline-none"
                        >
                            <img
                                src="/assets/K-5PuzzlePiece.svg"
                                alt="K-5 Puzzle Piece"
                                className="w-[180px] h-[180px] transform hover:scale-105 transition-transform"
                            />
                        </button>
                        <button
                            onClick={() => handleGradeClick("middle-school")}
                            className="flex flex-col items-center cursor-pointer focus:outline-none"
                        >
                            <img
                                src="/assets/6-8PuzzlePiece.svg"
                                alt="6-8 Puzzle Piece"
                                className="w-[300px] h-[180px] transform hover:scale-105 transition-transform"
                            />
                        </button>
                        <button
                            onClick={() => handleGradeClick("high-school")}
                            className="flex flex-col items-center cursor-pointer focus:outline-none"
                        >
                            <img
                                src="/assets/9-12PuzzlePiece.svg"
                                alt="9-12 Puzzle Piece"
                                className="w-[180px] h-[180px] transform hover:scale-105 transition-transform"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
