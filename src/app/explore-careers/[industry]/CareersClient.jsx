"use client";

import { useSearchParams } from "next/navigation";
import CareerBackButton from "../../../components/CareerBackButton";
import CareersCard from "../../../components/Careers_Card/CareersCard";
import { Navbar } from "../../../components/Navbar/Navbar";

const CareerGroups = await require("../../../../constants/CareerGroups.json");

export default function CareersClient({ industry }) {
    const searchParams = useSearchParams();
    const grade = searchParams.get("grade") ?? "elementary-school";

    const CareersArray = Object.keys(CareerGroups[industry].careers).map((key) => ({
        key: key,
        title: CareerGroups[industry].careers[key].title,
        description: null, //TODO: MAKE IT PULL FROM A DATA FILE
        image: CareerGroups[industry].careers[key].image,
    }));

    const HeaderSection = () => (
        <div className="flex flex-col items-center font-primary py-[7.5rem]">
            <div className="font-[500] flex flex-col items-center">
                <h1 className="text-[40px]">{CareerGroups[industry].title}</h1>
            </div>
        </div>
    );

    return (
        <>
            <Navbar />
            <CareerBackButton src={`/explore-industries/?grade=${grade}`}>
                Back to All Careers
            </CareerBackButton>
            <HeaderSection />
            <div className="flex justify-center px-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 gap-y-4 w-full">
                    {CareersArray.map((career, index) => (
                        <CareersCard
                            key={index}
                            title={career.title}
                            description={career.description}
                            grade={grade}
                            image={career.image}
                            href={`/explore-jobs/${industry}/${career.key}?grade=${grade}`}
                            specific={true}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
