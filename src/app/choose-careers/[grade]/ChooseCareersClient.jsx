import CareerBackButton from "../../../components/CareerBackButton";
import CareersCard from "../../../components/Careers_Card/CareersCard";
import { Navbar } from "../../../components/Navbar/Navbar";
const careersData = require("../../../../constants/Careers.json");

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

    return (
        <>
            <Navbar />
            <div className="mt-6">
                <CareerBackButton src={"/choose-grade-level"}>
                    Back to Grade Level
                </CareerBackButton>
                <HeaderSection />
                <div className="flex justify-center px-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 gap-y-4 w-full">
                        {Object.keys(careersData).map((key, index) => (
                            <CareersCard
                                key={index}
                                href={`/careers/${grade}/${key}`}
                                title={careersData[key].name}
                                description={careersData[key].description}
                                grade={grade}
                                image={careersData[key].image}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
