"use client";
import React from "react";

export const CareersCard = ({ title, description, educationLevel, careerImage }) => {
    if (educationLevel === "elementary-school") {
        // Display elementary-level card summary
        return (
            <div className="no-scrollbar overflow-y-auto bg-white rounded-tr-xl rounded-b-xl border-black border-2  w-[240px] h-[250px] font-secondary ">
                <header className="p-3 text-center text-[20px] font-bold text-lg pd-[0.7em]">
                    {" "}
                    {title}{" "}
                </header>
                <p className="pl-5 pr-5 text-[12px]"> {description} </p>
            </div>
        );
    } else {
        // Otherwise, display middle/high school level card summary
        return (
            <div className="no-scrollbar overflow-y-auto bg-white rounded-3xl w-[240px] h-[250px] rounded-15px pb-1em font-secondary ">
                {/* Dynamically render header for either middle-school or high-school header */}
                {educationLevel === "middle-school" ? (
                    // Header for middle-school level
                    <header className="pt-2 pb-2 bg-[#3FA1D9] text-center text-[22px] font-bold text-lg pd-[0.7em]">
                        {" "}
                        {title}{" "}
                    </header>
                ) : (
                    // Header for high-school level
                    <header className="pt-2 pb-2 bg-[#47B748] text-center text-[22px] font-bold text-lg pd-[0.7em]">
                        {title}
                    </header>
                )}
                <p className="pl-5 pr-5 pt-3 pb-3 text-[12px]">{description}</p>
                <img className="m-auto mb-5" src={careerImage} alt="career-image"></img>
            </div>
        );
    }
};

export default CareersCard;
