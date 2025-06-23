import ExploreJobsClient from "./ExploreJobsClient";
import {Suspense} from "react";

const careersData = await require("../../../../../constants/CareerGroups.json");
const JobData = await require("../../../../../constants/JobData.json");

export async function generateStaticParams() {
    const industries = Object.keys(careersData);
    const params = [];

    for (const industry of industries) {
        const careers = Object.keys(careersData[industry].careers);
        for (const career of careers) {
            params.push({
                industry,
                career,
            });
        }
    }
    return params;
}

// This is a Server Component
export default async function Page({ params }) {
    const { industry, career } = await params;
    const careerJobsData = JobData[career];
    return (
        <Suspense>
        <ExploreJobsClient
            industry={industry}
            career={career}
            careerJobsData={careerJobsData}
        />
        </Suspense>
    );
}
