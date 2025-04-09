import React from "react";

export const Button = ({text, size, onClick}) => {
  // Button size is dependent on text-size
  if (size === "small") {
    return (
      <button 
        className = "text-white font-lato font-normal text-[1.125rem] bg-[#4C78E7] w-max p-4 pl-8 pr-8 rounded-[30px]"
        onClick = {onClick}
      >
        {text}
      </button>
    );  
  // Button size is based on parent container
  } else if (size === "big") {
    return (
      <button 
        className = "text-white font-lato text-center w-full font-normal text-[1.3rem] bg-[#4C78E7] p-4 pl-8 pr-8 rounded-[30px]"
        onClick = {onClick}
      >
        {text}
      </button>
    );  
  } else if (size === "box") {
    return (
      <button 
        className="rounded-[10px] text-white font-lato text-center w-full font-normal text-[22px] bg-[#4C78E7] p-4 pl-8 pr-8"
        onClick = {onClick}>
        {text}
      </button>
    )
  }
};

export default Button;
 