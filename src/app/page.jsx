"use client";

import { Navbar } from "../components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
    const router = useRouter();

    const handleGradeClick = (grade) => {
        const userAuth = auth;

        onAuthStateChanged(userAuth, (user) => {
            if (user) {
                // User is signed in
                console.log("User is signed in:", user.uid);
                if (grade === "high-school"){
                    router.push(`/college-interest?grade=${grade}&valid=true`);
                }
                else{
                    router.push(`/take-quiz/${grade}?valid=true`);
                }
            } else {
                router.push(`/choose-account-type?grade=${grade}`);
                console.log("User is signed out");
                // Optional: Handle signed out state
            }
        });
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            {/* Top Section */}
            <div className="bg-[#E8F6FF] h-[40vh] flex flex-col items-center justify-center">
                <h1 className="text-3xl font-primary mb-4">
                    Discover a career path that matches your unique interests!
                </h1>
                <div className="flex items-center justify-center space-x-20 mt-6">
                    <img
                        src="/characters/Agriculture&NaturalResources/AnimalScience.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                    <img
                        src="/characters/ArtsMedia&Entertainment/Art-Management.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                    <img
                        src="/characters/Building&ConstructionTrades/Building-Maintenance.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                    <img
                        src="/characters/Business&Finance/Accounting-Auditing.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                    <img
                        src="/characters/EducationChildDev&FamServices/Child-Family-Services.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                    <img
                        src="/characters/EnergyEnvironment&Utilities/Energy-Production-Management.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                    <img
                        src="/characters/Engineering&Architecture/Architecture-and-Planning.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                    <img
                        src="/characters/Fashion&InteriorDesign/Fashion-Design.svg"
                        alt="K-5 Puzzle Piece"
                        className="w-36 h-36"
                    />
                </div>
            </div>

            {/* Career Quiz Section */}
            <div className="max-w-7xl mx-auto py-10 px-4">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-primary">Career Quiz</h2>
                    <p className="mt-2 font-secondary">Choose your grade level to begin!</p>
                </div>
                <div className="flex items-center justify-center space-x-8">
                    <button
                        onClick={() => handleGradeClick("elementary-school")}
                        className="flex flex-col items-center cursor-pointer focus:outline-none"
                    >
                        <img
                            src="/assets/K-5PuzzlePiece.svg"
                            alt="K-5 Puzzle Piece"
                            className="w-[150px] h-[150px] transform hover:scale-105 transition-transform"
                        />
                    </button>
                    <button
                        onClick={() => handleGradeClick("middle-school")}
                        className="flex flex-col items-center cursor-pointer focus:outline-none"
                    >
                        <img
                            src="/assets/6-8PuzzlePiece.svg"
                            alt="6-8 Puzzle Piece"
                            className="w-[250px] h-[150px] transform hover:scale-105 transition-transform"
                        />
                    </button>
                    <button
                        onClick={() => handleGradeClick("high-school")}
                        className="flex flex-col items-center cursor-pointer focus:outline-none"
                    >
                        <img
                            src="/assets/9-12PuzzlePiece.svg"
                            alt="9-12 Puzzle Piece"
                            className="w-[150px] h-[150px] transform hover:scale-105 transition-transform"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
