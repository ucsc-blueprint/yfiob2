import BackArrow from "../../../components/BackArrow";
import CareersCard from "../../../components/Careers_Card/CareersCard";
import { Navbar } from "../../../components/Navbar/Navbar";

const backgroundColor = {
    "elementary-school": "bg-[#2CA9F6]",
    "middle-school": "bg-[#75D122]",
    "high-school": "bg-[#FF9E1E]",
};
const gradeName = {
    "elementary-school": "Grades K - 5",
    "middle-school": "Grades 6 - 8",
    "high-school": "Grades 9 - 12",
};

const dummyCareers = [
    {
        name: "Transportation",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al",
        image: "https://placehold.co/100x100",
    },
    {
        name: "Transportation",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al",
        image: "https://placehold.co/100x100",
    },
    {
        name: "Transportation",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al",
        image: "https://placehold.co/100x100",
    },
    {
        name: "Transportation",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al",
        image: "https://placehold.co/100x100",
    },
    {
        name: "Transportation",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al",
        image: "https://placehold.co/100x100",
    },
    {
        name: "Transportation",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al",
        image: "https://placehold.co/100x100",
    },
    {
        name: "Transportation",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al",
        image: "https://placehold.co/100x100",
    },
    {
        name: "Transportation",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al",
        image: "https://placehold.co/100x100",
    },
    {
        name: "Transportation",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al",
        image: "https://placehold.co/100x100",
    },
    {
        name: "Transportation",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al",
        image: "https://placehold.co/100x100",
    },
    {
        name: "Transportation",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al",
        image: "https://placehold.co/100x100",
    },
    {
        name: "Transportation",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al",
        image: "https://placehold.co/100x100",
    },
    {
        name: "Transportation",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al",
        image: "https://placehold.co/100x100",
    },
    {
        name: "Transportation",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al",
        image: "https://placehold.co/100x100",
    },
];

export default async function ChooseCareersCleint({ grade }) {
    const HeaderSection = () => (
        <div className="flex flex-col items-center font-kumbh py-10">
            <div
                className={`flex items-center text-[36px] mb-7 px-5 py-2 rounded-lg text-white font-[500] ${backgroundColor[grade]}`}
            >
                {gradeName[grade]}
            </div>
            <div className="font-[500] flex flex-col items-center">
                <h1 className="text-[40px]">Explore Careers</h1>
                <h2 className="text-[26px]">Choose a career area to begin!</h2>
            </div>
        </div>
    );

    const BackButton = () => (
        <div className="absolute top-28 left-[64px]">
            <button className="flex items-center gap-2 px-2 py-3 h-[41px] bg-[#4C78E7] rounded-lg border-2 border-[#516FBE] text-white font-bold transition-all duration-200 hover:bg-blue-500">
                <a href="/choose-grade-level">
                    <span className="flex items-center">
                        <div style={{ transform: "scale(0.9)" }}>
                            <BackArrow />
                        </div>
                        <div className="pl-2">Back to Grade Levels</div>
                    </span>
                </a>
            </button>
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="mt-6">
                <BackButton />
                <HeaderSection />
                <div className="flex justify-center px-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 gap-y-4 w-full">
                        {dummyCareers.map((data, index) => (
                            <CareersCard
                                key={index}
                                title={data.name}
                                description={data.description}
                                grade={grade}
                                image={data.image}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
