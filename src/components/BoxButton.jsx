import React from "react";

export const BoxButton = ({ text, color = "blue", onClick }) => {
    if (color === "gray") {
        return (
            <button
                className="min-w-[118px] bg-[#E0E0E0] text-[#4F4F4F] font-secondary text-[1.1rem] px-12 py-3 rounded-[5px]"
                onClick={onClick}
            >
                {text}
            </button>
        );
    } else if (color === "blue") {
        return (
            <button
                className="w-full bg-[#4C78E7] text-white font-light font-secondary text-[1.1rem] px-12 py-2 rounded-[5px]"
                onClick={onClick}
            >
                {text}
            </button>
        );
    } else if (color === "lightblue") {
        return (
            <button
                className="w-full bg-[#D8E6FF] border border-[#4C78E7] text-black font-secondary text-[1.1rem] px-12 py-4 rounded-[5px]"
                onClick={onClick}
            >
                {text}
            </button>
        );
    }
};

export default BoxButton;
