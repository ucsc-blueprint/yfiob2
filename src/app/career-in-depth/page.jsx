"use client";
import BackArrow from "../../components/BackArrow";
import { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import careerData from "/dummycareer.json";

const HeaderSection = () => (
    <div className="flex flex-col items-center font-kumbh py-10">
        <div className="font-[500] flex flex-col items-center">
            <h1 className="text-[40px]">Animal Science</h1>
        </div>
    </div>
);

const BackButton = () => (
    <div className="absolute top-28 left-[64px]">
        <button className="flex items-center gap-2 px-2 py-3 h-[41px] bg-[#4C78E7] rounded-lg border-2 border-[#516FBE] text-white font-bold transition-all duration-200 hover:bg-blue-500">
            <a href="/choose-careers">
                <span className="flex items-center">
                    <div style={{ transform: "scale(0.9)" }}>
                        <BackArrow />
                    </div>
                    <div className="pl-2">Back to Careers</div>
                </span>
            </a>
        </button>
    </div>
);

// Get category data
const categoryData = careerData.categories.find((cat) => cat.name === "Animal Science");

export default function AnimalScience() {
    // Add state management for selected job
    const [selectedJobId, setSelectedJobId] = useState(categoryData?.jobs[0]?.id || 0);

    // Get the selected job data
    const selectedJob =
        categoryData?.jobs.find((job) => job.id === selectedJobId) || categoryData?.jobs[0];

    return (
        <>
            <Navbar />
            <HeaderSection />
            <BackButton />
            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Sidebar - Job List */}
                    <div className="w-full md:w-1/3">
                        <div className="bg-blue-500 text-white p-4 text-center font-bold">
                            Jobs/Occupations
                        </div>
                        <div className="border border-gray-200">
                            {categoryData?.jobs.map((job) => (
                                <div
                                    key={job.id}
                                    className={`p-3 border-b cursor-pointer hover:bg-orange-100 ${
                                        job.id === selectedJobId
                                            ? "bg-orange-200"
                                            : "bg-orange-50"
                                    }`}
                                    onClick={() => setSelectedJobId(job.id)}
                                >
                                    {job.title}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - Job Details */}
                    <div className="w-full md:w-2/3 bg-white p-6 border border-gray-200">
                        <div className="flex flex-col md:flex-row items-center mb-6">
                            <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
                                <div className="relative w-32 h-32">
                                    <div className="bg-orange-200 w-full h-full rounded flex items-center justify-center">
                                        <div className="text-4xl">
                                            {selectedJob?.icon || "😊"}
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
                            <p className="text-sm">{selectedJob?.jobTasks}</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-bold mb-2">Earnings:</h3>
                            <div className="text-xl font-bold text-green-800 mb-2">
                                ${selectedJob?.earnings?.toLocaleString()}
                            </div>
                            <p className="text-sm">{selectedJob?.earningsDetails}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-2">Training:</h3>
                            <p className="text-sm">{selectedJob?.training}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
