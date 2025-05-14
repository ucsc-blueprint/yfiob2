"use client";

import CareerBackButton from "../../../../components/CareerBackButton";
import CareersCard from "../../../../components/Careers_Card/CareersCard";
import { Navbar } from "../../../../components/Navbar/Navbar";
const careersData = require("../../../../../constants/Careers.json");

export default function CareersClient({ grade, career }) {
    const HeaderSection = () => (
        <div className="flex flex-col items-center font-kumbh py-[7.5rem]">
            <div className="font-[500] flex flex-col items-center">
                <h1 className="text-[40px]">{careersData[career].name}</h1>
            </div>
        </div>
    );

    return (
        <>
            <Navbar />
            <CareerBackButton src={`/choose-careers/${grade}`}>
                Back to Explore Careers
            </CareerBackButton>
            <HeaderSection />
            <div className="flex justify-center px-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 gap-y-4 w-full">
                    {Object.keys(careersData[career].careers).map((key, index) => (
                        <CareersCard
                            key={index}
                            title={careersData[career].careers[key].name}
                            description={careersData[career].careers[key].description}
                            grade={grade}
                            image={careersData[career].careers[key].image}
                            href={`/career-in-depth/${career}/${key}?grade=${grade}`}
                            specific={true}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
