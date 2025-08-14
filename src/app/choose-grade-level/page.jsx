import { Navbar } from "../../components/Navbar/Navbar";
import Link from "next/link";

function App() {
    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Rest of content */}
            <div className="max-w-7xl mx-auto py-10 justify-center pt-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-primary">Explore Careers</h2>
                    <p className="mt-2 font-primary">Choose your grade level to begin!</p>
                </div>
                <div className="flex items-center justify-center space-x-8">
                    <Link href="/explore-industries?grade=elementary-school">
                        <button className="flex flex-col items-center cursor-pointer focus:outline-none">
                            <img
                                src="/assets/K-5PuzzlePiece.svg"
                                alt="K-5 Puzzle Piece"
                                className="w-[300px] h-[180px] transform hover:scale-105 transition-transform"
                            />
                        </button>
                    </Link>
                    <Link href="/explore-industries?grade=middle-school">
                        <button className="flex flex-col items-center cursor-pointer focus:outline-none">
                            <img
                                src="/assets/6-8PuzzlePiece.svg"
                                alt="6-8 Puzzle Piece"
                                className="w-[300px] h-[180px] transform hover:scale-105 transition-transform"
                            />
                        </button>
                    </Link>
                    <Link href="/explore-industries?grade=high-school">
                        <button className="flex flex-col items-center cursor-pointer focus:outline-none">
                            <img
                                src="/assets/9-12PuzzlePiece.svg"
                                alt="9-12 Puzzle Piece"
                                className="w-[300px] h-[180px] transform hover:scale-105 transition-transform"
                            />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default App;
