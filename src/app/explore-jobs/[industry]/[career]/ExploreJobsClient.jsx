"use client";
import { useState } from "react";
import { Navbar } from "../../../../components/Navbar/Navbar";
import CareerBackButton from "../../../../components/CareerBackButton";
import { useSearchParams } from "next/navigation";
const CareerGroups = await require("../../../../../constants/CareerGroups.json");

const lorem =
    "Commodo aliqua eu elit aliqua ea eu deserunt. Sunt commodo ex pariatur magna do consectetur sit incididunt exercitation do Lorem. Do ea non ad mollit.";

export default function ExploreJobsClient({ industry, career, careerJobsData }) {
    const searchParams = useSearchParams();
    const grade = searchParams.get("grade");
    const careerTitle = CareerGroups[industry]["careers"][career].title;
    const industryTitle = CareerGroups[industry].title;
    const careerJobs = CareerGroups[industry]["careers"][career].jobs;

    const HeaderSection = () => (
        <div className="flex flex-col items-center font-kumbh py-10">
            <div className="font-[500] flex flex-col items-center">
                <h1 className="text-[40px]">{careerTitle}</h1>
            </div>
        </div>
    );

    // Add state management for selected job
    const [selectedJobTitle, setSelectedJobTitle] = useState(
        careerJobsData[Object.keys(careerJobsData)[0]].title
    );

    // Get the selected job data
    const selectedJob = careerJobsData[selectedJobTitle];

    return (
        <>
            <Navbar />
            <HeaderSection />
            <CareerBackButton src={`/explore-careers/${industry}?grade=${grade}`}>
                Back to {industryTitle}
            </CareerBackButton>
            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Sidebar - Job List */}
                    <div className="w-full md:w-1/3">
                        <div className="bg-blue-500 text-white p-4 text-center font-bold">
                            Jobs/Occupations
                        </div>
                        <div className="border border-gray-200">
                            {careerJobs?.map((job, index) => {
                                const jobData = careerJobsData[job];
                                console.log(jobData);

                                if (jobData == null) return <div key={index}></div>;

                                return (
                                    <div
                                        key={index}
                                        className={`p-3 border-b cursor-pointer hover:bg-orange-100 ${
                                            job.title === selectedJob
                                                ? "bg-orange-200"
                                                : "bg-orange-50"
                                        }`}
                                        onClick={() => setSelectedJobTitle(jobData.title)}
                                    >
                                        {jobData.title}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Content - Job Details */}
                    <div className="w-full md:w-2/3 bg-white p-6 border border-gray-200">
                        <div className="flex flex-col md:flex-row items-center mb-6">
                            <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
                                <div className="relative w-32 h-32">
                                    <div className="w-full h-full rounded flex items-center justify-center">
                                        <div className="text-4xl">
                                            {selectedJob?.icon ? (
                                                <img
                                                    src={selectedJob.icon} // choose icon from json file
                                                    alt={selectedJob.title || "Job icon"}
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <span
                                                    className="text-4xl" // if null, place emoji
                                                    role="img"
                                                    aria-label="Smiley face emoji"
                                                >
                                                    😊
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-2/3">
                                <h2 className="text-2xl font-bold text-center md:text-left">
                                    {selectedJob?.title}
                                </h2>
                            </div>
                        </div>

                        {/* Job details sections */}
                        <div className="mb-6">
                            <h3 className="text-xl font-bold mb-2">Job Tasks:</h3>
                            <p className="text-sm">{selectedJob?.jobTasks || lorem}</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-bold mb-2">Earnings:</h3>
                            <div className="text-xl font-bold text-green-800 mb-2">
                                ${selectedJob?.earnings?.toLocaleString() || "1234"}
                            </div>
                            <p className="text-sm">{selectedJob?.earningsDetails || lorem}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-2">Training:</h3>
                            <p className="text-sm">{selectedJob?.training || lorem}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
