import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import Link from "next/link";

function App() {
    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Rest of content */}
            <div className="max-w-7xl mx-auto py-10 px-4">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-kumbh">Explore Careers</h2>
                    <p className="mt-2 font-kumbh">Choose your grade level to begin!</p>
                </div>
                <div className="flex items-center justify-center space-x-8">
                    <Link href="/explore-industries?grade=elementary-school">
                        <button className="flex flex-col items-center cursor-pointer focus:outline-none">
                            <img
                                src="/assets/K-5PuzzlePiece.svg"
                                alt="K-5 Puzzle Piece"
                                className="w-[150px] h-[150px]"
                            />
                        </button>
                    </Link>
                    <Link href="/explore-industries?grade=middle-school">
                        <button className="flex flex-col items-center cursor-pointer focus:outline-none">
                            <img
                                src="/assets/6-8PuzzlePiece.svg"
                                alt="6-8 Puzzle Piece"
                                className="w-[250px] h-[150px]"
                            />
                        </button>
                    </Link>
                    <Link href="/explore-industries?grade=high-school">
                        <button className="flex flex-col items-center cursor-pointer focus:outline-none">
                            <img
                                src="/assets/9-12PuzzlePiece.svg"
                                alt="9-12 Puzzle Piece"
                                className="w-[150px] h-[150px]"
                            />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default App;
