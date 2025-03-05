"use client";
import { Navbar } from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import addData from "../../utils/addData.js";


export const Page = () => {

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen bg-[#E8F6FF]">
                
                <h1 className="text-4xl font-lato font-medium text-[40px] leading-[40px] tracking-normal text-center">Login</h1>
				<div>
					{/* Email Input */}                
					<p className="text-left m-3 w-[502px] font-lato font-normal text-[20px] leading-[20px] tracking-normal">Email</p>
					<input 
						type="text"
						className="w-[502px] h-[61px] rounded-[10px] text-[20px] text-[#898989] italic font-normal leading-[20px] pl-[30px] flex items-center"
						placeholder={"Email"}
						id="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					
					{/* Password Input */}
					<p className="text-left m-3 w-[502px] font-lato font-normal text-[20px] leading-[20px] tracking-normal">Password</p>   
					<input
					className="w-[502px] h-[61px] rounded-[10px] text-[20px] text-[#898989] italic font-normal leading-[20px] pl-[30px] flex items-center" 
						placeholder={"Password"} 
						id="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					

				<button
					className="mt-4 w-full font-lato h-[50px] bg-blue-500 text-white font-bold rounded-[10px]"
					>
					Log In
					</button>
                    <p className="m-2 font-kumbh">Don't have an account? Sign Up!</p>
				</div>
            </div>
        </>
    );
}

export default Page;
