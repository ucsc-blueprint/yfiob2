import React from "react";

export const Button = ({text, size}) => {
  // Button size is dependent on text-size
  if (size === "small") {
    return (
      <div className = "text-white font-lato font-normal text-[1.125rem] bg-[#4C78E7] w-max p-4 pl-8 pr-8 rounded-[30px]">{text}</div>
    );  
  // Button size is based on parent container
  } else if (size === "big") {
    return (
      <div className = "text-white font-lato text-center w-full font-normal text-[1.125rem] bg-[#4C78E7] p-4 pl-8 pr-8 rounded-[30px]">{text}</div>
    );  
  }
};
 