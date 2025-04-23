import React from "react";

export const BoxButton = ({ text, color = "blue", onClick }) => {
  if (color === "gray") {
    return (
      <button
        className="min-w-[118px] bg-[#E0E0E0] text-[#4F4F4F] font-lato text-[1rem] px-6 py-3 rounded-[10px]"
        onClick={onClick}
      >
        {text}
      </button>
    );
  } else if (color === "blue") {
    return (
      <button
        className="w-full bg-[#4C78E7] text-white font-lato text-[1.375rem] px-8 py-4 rounded-[10px]"
        onClick={onClick}
      >
        {text}
      </button>
    );
  } else if (color === "lightblue") {
    return (
      <button
        className="w-full bg-[#D8E6FF] border border-[#4C78E7] text-black font-lato text-[1.125rem] px-8 py-4 rounded-[10px]"
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
};

export default BoxButton;
