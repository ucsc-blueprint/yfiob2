import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import Link from "next/link";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="z-10 relative">
        <Navbar />
      </div>
      
      {/* Centered content - fixed overlap issue */}
      <div className="flex-grow flex items-center justify-center pt-0">
        <div className="max-w-6xl w-full px-8 pt-0 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-kumbh">Career Quiz</h2>
            <p className="mt-3 font-kumbh text-lg">Choose your grade level to begin!</p>
          </div>
          <div className="flex items-center justify-center space-x-12">
            <Link href="/take-quiz/elementary-school">
              <button className="flex flex-col items-center cursor-pointer focus:outline-none transform hover:scale-105 transition-transform">
                <img
                  src="/assets/K-5PuzzlePiece.svg"
                  alt="K-5 Puzzle Piece"
                  className="w-[180px] h-[180px]"
                />
              </button>
            </Link>
            <Link href="/take-quiz/middle-school">
              <button className="flex flex-col items-center cursor-pointer focus:outline-none transform hover:scale-105 transition-transform">
                <img
                  src="/assets/6-8PuzzlePiece.svg"
                  alt="6-8 Puzzle Piece"
                  className="w-[300px] h-[180px]"
                />
              </button>
            </Link>
            <Link href="/take-quiz/high-school">
              <button className="flex flex-col items-center cursor-pointer focus:outline-none transform hover:scale-105 transition-transform">
                <img
                  src="/assets/9-12PuzzlePiece.svg"
                  alt="9-12 Puzzle Piece"
                  className="w-[180px] h-[180px]"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
