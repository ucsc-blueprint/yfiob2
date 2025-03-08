"use client";
import { Navbar } from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import addData from "../../utils/addData.js";


export const Page = () => {

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center h-screen bg-[#E8F6FF]">
                
                <h1 className="text-4xl font-lato font-medium text-[40px] text-center mb-5 mt-[126px] ">Login</h1>
				<div>
					{/* Email Input */}                
					<p className="text-left m-3 w-[502px] font-lato font-normal text-[20px] leading-[20px] tracking-normal">Email</p>
					<input 
						type="text"
						className="w-[502px] h-[61px] rounded-[10px] text-[20px] text-[#898989] italic font-normal leading-[20px] pl-[30px] flex items-center"
						placeholder={"Email"}
						id="email"
					/>
					
					{/* Password Input */}
					<p className="text-left m-3 mt-4 w-[502px] font-lato font-normal text-[20px] leading-[20px] tracking-normal">Password</p>   
					<input
					className="w-[502px] h-[61px] rounded-[10px] text-[20px] text-[#898989] italic font-normal leading-[20px] pl-[30px] flex items-center" 
						placeholder={"Password"} 
						id="password"
					/>
					
				<button
					className="mt-7 text-[24px] w-full font-lato h-[63px] bg-blue-500 text-white  rounded-[30px] w-[499.9px]"
					>
					Log In
					</button>
                    <p className="mt-9 ml-28 font-kumbh">Don't have an account? <span className="text-[#4C78E7]">Sign Up!</span></p>
				</div>
            </div>
        </>
    );
}

export default Page;
