"use client";
import { Navbar } from "../../components/Navbar/Navbar";
import BoxButton from "../../components/BoxButton.jsx";
import Image from 'next/image';
import Puzzle from "../../assets/BluePuzzleGuy.svg"
import { useRouter } from 'next/navigation';


export const Page = () => {

    const router = useRouter();
    
    const handleLoginClick = () => {
        router.push('/login');
    };

    const handleSignUpClick = () => {
        router.push('/sign-up'); 


    const goToQuiz = () => {
        router.push('/take-quiz'); 
    }
    
    return (

      <>
        <div className="min-h-screen flex flex-col bg-[#E8F6FF] overflow-hidden">
          <Navbar />

          <div className="flex-grow flex flex-col items-center justify-center">
            {/* Puzzle Image */}
            <Image
              priority
              src={Puzzle}
              alt="Puzzle Guy"
              className="pb-0 mb-0 w-138 h-137 pt-0"
            />

            {/* Content Wrapper */}
            <div className="w-[502px] space-y-6">
              <h1 className="font-medium font-kumbh text-[40px] leading-[40px] tracking-normal text-center">
                Career Quiz
              </h1>

              <p className="font-medium text-[26px] leading-[40px] tracking-normal text-center font-kumbh pb-6">
                Would you like to save your results?
              </p>

              {/* Account Options Box */}
              <div className="bg-white h-[422px] w-[489px] rounded-[20px] shadow-[0px_4px_9.4px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center">
                <p className="font-lato font-normal text-lg">
                  Create an account
                </p>

                <div className="w-full px-[51px] h-[57px] my-[15px]">
                  <BoxButton
                    text="Sign Up"
                    color="blue"
                    onClick={handleSignUpClick}
                  />
                </div>

                <p className="font-lato font-normal text-lg mt-2">
                  Already have an account?
                </p>
                <div className="w-full px-[51px] h-[57px] my-4">
                  <BoxButton
                    text="Log In"
                    color="blue"
                    onClick={handleLoginClick}
                  />
                </div>

                <div className="w-full px-[51px] my-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex-1 h-px bg-black" />
                    <p className="px-4 text-sm font-lato text-black">OR</p>
                    <div className="flex-1 h-px bg-black" />
                  </div>
                </div>

                <div className="w-full px-[51px] h-[57px] my-4">
                  <BoxButton
                    text="Continue as Guest"
                    color="lightblue"
                    onClick={goToQuiz}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default Page;
