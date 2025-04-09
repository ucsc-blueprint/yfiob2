"use client";
import { Navbar } from "../../components/Navbar/Navbar";
import Button from "../../components/Button.jsx";
import Image from 'next/image';
import Puzzle from "../../assets/BluePuzzleGuy.svg"


export const Page = () => {
    
    return (
        <>
            <Navbar />
            <div className="bg-[#E8F6FF] h-screen flex flex-col justify-center items-center">
                <Image
                    priority
                    src={Puzzle}
                    alt="Puzzle Guy"
                    className="pb-0 mb-0 w-138 h-137 pt-12"
                />
                <div className = "space-y-4 w-[502px] pt-0">
                    <h1 className="font-medium font-kumbh text-[40px] leading-[40px] tracking-normal text-center pt-0 mu-0">
                        Career Quiz
                    </h1>

                    <p className="font-medium text-[26px] m-8 leading-[40px] tracking-normal text-center font-kumbh pt-3 pb-10">
                        Would you like to save your results?
                    </p>


                    {/* Parent Container */}
                    <div className="mt-8 bg-white h-[422px] w-[489px] rounded-[20px] shadow-[0px_4px_9.4px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center"> 
                        <p className="font-lato font-normal text-lg ">
                            Create an account
                        </p>
                        <div className="w-full px-[51px] h-[57px] my-[15px]">
                            <Button
                                text = "Sign Up"
                                size = "box"
                                // onClick = {handleSubmit}
                            />
                        </div>

   
                        <p className="font-lato font-normal text-lg mt-2">
                            Already have an account?
                        </p>
                        <div className="w-full px-[51px] h-[57px] my-4">
                            <Button
                                text = "Log In"
                                size = "box"
                                // onClick = {handleSubmit}
                            />
                        </div>

                        <div className="flex w-full justify-between px-10">
                            <div className="bg-black w-[150px] h-[1px] mt-4 "> </div>
                            <p className="px-[27px]">OR</p>
                            <div className="bg-black w-[150px] h-[1px] mt-4"> </div>
                        </div>


                        {/* <p className=" font-lato font-normal text-[20px] ">
                            __ OR __
                        </p> */}


                    </div>
                    

                    

                   

                    {/* Student ID Input */}
                   
                    </div>

                    <div className="my-6 w-[502px] flex flex-col  gap-4 p-4 items-center justify-center h-screen">
                        
                    </div>
            </div>
        </>
    );
};

export default Page;
