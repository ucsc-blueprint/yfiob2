"use client";

import React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { useRouter } from "next/navigation";

function App() {
  const router = useRouter();

  const handleGradeClick = (grade) => {
    router.push(`/take-quiz/${grade}`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Top Section */}
      <div className="bg-[#E8F6FF] h-[40vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-kumbh mb-4">
          Discover a career path that matches your unique interests!
        </h1>
        <div className="flex items-center justify-center space-x-40 mt-6">
        <img
            src="/assets/ConstructionPuzzlePiece.svg"
            alt="K-5 Puzzle Piece"
            className="w-36 h-36"
          />
          <img
            src="/assets/TeacherPuzzlePiece.svg"
            alt="K-5 Puzzle Piece"
            className="w-40 h-40"
          />
          <img
            src="/assets/DirectorPuzzlePiece.svg"
            alt="K-5 Puzzle Piece"
            className="w-36 h-36"
          />
          <img
            src="/assets/DoctorPuzzlePiece.svg"
            alt="K-5 Puzzle Piece"
            className="w-36 h-36"
          />
          <img
            src="/assets/FirefighterPuzzlePiece.svg"
            alt="K-5 Puzzle Piece"
            className="w-36 h-36"
          />
        </div>
      </div>

      {/* Career Quiz Section */}
      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-kumbh">Career Quiz</h2>
          <p className="mt-2 font-kumbh">Choose your grade level to begin!</p>
        </div>
        <div className="flex items-center justify-center space-x-8">
          <button onClick={() => handleGradeClick('elementary-school')} className="flex flex-col items-center cursor-pointer focus:outline-none">
            <img src="/assets/K-5PuzzlePiece.svg" alt="K-5 Puzzle Piece" className="w-[150px] h-[150px]" />
          </button>
          <button onClick={() => handleGradeClick('middle-school')} className="flex flex-col items-center cursor-pointer focus:outline-none">
            <img src="/assets/6-8PuzzlePiece.svg" alt="6-8 Puzzle Piece" className="w-[250px] h-[150px]" />
          </button>
          <button onClick={() => handleGradeClick('high-school')} className="flex flex-col items-center cursor-pointer focus:outline-none">
            <img src="/assets/9-12PuzzlePiece.svg" alt="9-12 Puzzle Piece" className="w-[150px] h-[150px]" />
          </button>
        </div>
    );
}

export default App;
