import { Navbar } from "../../../components/Navbar/Navbar";
import { CareerSummaryCards } from "../../../pages/CareerSummaryCards";

const gradeColor = {
    "elementary-school": "#FF9E1E",
    "middle-school": "#75D122",
    "high-school": "#2CA9F6",
};

export default async function ChooseCareersCleint({ grade }) {
    const HeaderSection = () => (
        <>
            <div
                className="flex items-center gap-2 px-6 py-3 min-w-[164px] h-[41px] rounded-lg border-2 text-white font-bold transition-all duration-200"
                style={{ background: gradeColor }}
            >
                {grade}
            </div>

            <div>
                <h1>Explore Careers</h1>
                <h2>Choose a career area to begin!</h2>
            </div>
        </>
    );

    const BackButton = () => (
        <button className="flex items-center gap-2 px-6 py-3 min-w-[164px] h-[41px] bg-blue-600 rounded-lg border-2 border-blue-700 text-white font-bold transition-all duration-200 hover:bg-blue-500">
            <a href="/choose-grade-level">
                <span>Back to Grade Levels</span>
            </a>
        </button>
    );

    return (
        <>
            <Navbar />
            <div className="mt-6">
                <BackButton />
                {grade}
                <HeaderSection />
            </div>
        </>
    );
}
