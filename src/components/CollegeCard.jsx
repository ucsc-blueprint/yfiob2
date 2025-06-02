"use client";

import Image from "next/image";
import { useState } from "react";
import UniversityCampus from "./UniversityCampus";

const agreeArray = ["Yes", "Maybe", "No"];

function Button({ children, isSelected, onClick }) {
    return (
        <div className="flex grow justify-center">
            <button
                onClick={onClick}
                className={`text-center rounded-[20px] px-4 py-3 w-28 ${
                    isSelected ? "bg-green-500 text-white" : "bg-slate-200 text-slate-500"
                }`}
            >
                {children}
            </button>
        </div>
    );
}

function CollegeCard({ onResponse, grade }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleAnswerSelect = (index) => {
        setSelectedAnswer(index);

        onResponse(agreeArray[index]);
    };

    return (
        <div className="bg-slate-400 w-full max-w-4xl mx-auto h-[50vh] min-h-[400px] rounded-[20px] font-lato shadow-md overflow-hidden">
            <div className="bg-white h-full rounded-b-[20px] p-[5vh] flex">
                <div className="w-2/5 h-full flex flex-col">
                    <div className="grow relative mb-1 rounded-md overflow-hidden">
                        <Image
                            fill
                            className="object-cover"
                            src={"/collegeExterior.png"}
                            alt="College"
                        />
                    </div>
                    <div className="grow relative mt-1 rounded-md overflow-hidden">
                        <Image
                            fill
                            className="object-cover"
                            src={"/collegeInterior.png"}
                            alt="College"
                        />
                    </div>
                </div>
                <div className="w-3/4 flex justify-center items-center">
                    <div className="flex w-3/4 h-3/4 flex-col items-center justify-between">
                        <h1 className="font-bold text-3xl text-center">
                            Are you interested in attending college?
                        </h1>
                        <div>
                            <UniversityCampus />
                        </div>
                        <div className="flex w-full items-stretch">
                            {agreeArray.map((agree, index) => (
                                <Button
                                    key={agree}
                                    isSelected={selectedAnswer === index}
                                    onClick={() => handleAnswerSelect(index)}
                                >
                                    {agree}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CollegeCard;
