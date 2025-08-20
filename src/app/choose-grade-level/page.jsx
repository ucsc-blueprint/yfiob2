import { Navbar } from "../../components/Navbar/Navbar";
import Link from "next/link";

function App() {
    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Top Section */}
            <div className="bg-[#E8F6FF] h-[40vh] flex flex-col items-center justify-center">
                <h1 className="text-3xl font-primary mb-4">
                    Explore pathways and careers to pursue!
                </h1>
                <div className="flex items-center justify-center space-x-30 mt-6">
                    <img
                        src="/icons/Agriculture&NaturalResources.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                    <img
                        src="/icons/Business&Finance.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                    <img
                        src="/icons/Fashion&InteriorDesign.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                    <img
                        src="/icons/ArtsMedia&Entertainment.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                    <img
                        src="/icons/EducationChildDev&FamServices.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                    <img
                        src="/icons/EnergyEnvironment&Utilities.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                    <img
                        src="/icons/Engineering&Architecture.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                    <img
                        src="/icons/HealthScience&MedTechnology.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                    <img
                        src="/icons/Building&ConstructionTrades.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                    <img
                        src="/icons/HospitalityTourism&Recreation.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                    <img
                        src="/icons/Manufacturing&ProductDevelopment.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                </div>
            </div>

            {/* Rest of content */}
            <div className="max-w-7xl mx-auto py-10 justify-center pt-5 mt-5">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-primary">Explore Careers</h2>
                    <p className="mt-2 font-secondary">Choose your grade level to begin!</p>
                </div>
                <div className="flex items-center justify-center space-x-8">
                    <Link href="/explore-industries?grade=elementary-school">
                        <button className="flex flex-col items-center cursor-pointer focus:outline-none">
                            <img
                                src="/assets/K-5PuzzlePiece.svg"
                                alt="K-5 Puzzle Piece"
                                className="w-[150px] h-[150px] transform hover:scale-105 transition-transform"
                            />
                        </button>
                    </Link>
                    <Link href="/explore-industries?grade=middle-school">
                        <button className="flex flex-col items-center cursor-pointer focus:outline-none">
                            <img
                                src="/assets/6-8PuzzlePiece.svg"
                                alt="6-8 Puzzle Piece"
                                className="w-[250px] h-[150px] transform hover:scale-105 transition-transform"
                            />
                        </button>
                    </Link>
                    <Link href="/explore-industries?grade=high-school">
                        <button className="flex flex-col items-center cursor-pointer focus:outline-none">
                            <img
                                src="/assets/9-12PuzzlePiece.svg"
                                alt="9-12 Puzzle Piece"
                                className="w-[150px] h-[150px] transform hover:scale-105 transition-transform"
                            />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default App;
