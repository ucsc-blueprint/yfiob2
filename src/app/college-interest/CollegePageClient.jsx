"use client";
import React, { useEffect } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import CollegeCard from "../../components/CollegeCard";

function CollegeInterestPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const grade = searchParams.get("grade");
    const valid = searchParams.get("valid");

    const gradeColors = {
        "elementary-school": "bg-[#9AD7F8]",
        "middle-school": "bg-[#BAE98E]",
        "high-school": "bg-[#FFC273]",
    };

    useEffect(() => {
        if (!grade || !valid) {
            router.push("/pre-quiz");
        }
    }, [grade, valid, router]);

    const handleCollegeInterestResponse = (response) => {
        router.push(`/take-quiz/${grade}?valid=true&collegeInterest=${response}`);
    };

    if (!grade || !valid) {
        return <div>Loading...</div>;
    }

    return (
        <div
            className={`min-h-screen flex flex-col ${
                gradeColors[grade] || "bg-gradient-to-b from-yellow-300 to-yellow-400"
            }`}
        >
            <div className="z-10 relative">
                <Navbar />
            </div>
            <div className="flex-grow flex items-center justify-center px-4">
                <div className="w-full max-w-5xl">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">Career Quiz</h2>
                        <p className="text-lg text-gray-600">Pre Question</p>
                    </div>
                    <div className="flex justify-center">
                        <CollegeCard
                            onResponse={handleCollegeInterestResponse}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CollegeInterestPage;
