import CareersClient from "./CareersClient";
const CareerGroups = await require("../../../../constants/CareerGroups.json");
import {Suspense} from "react";

export async function generateStaticParams() {
    const params = Object.keys(CareerGroups).map((key) => ({
        industry: key,
    }));

    return params;
}

// This is a Server Component
export default async function Page({ params }) {
    const { industry } = await params;

    return (
        <Suspense>
        <CareersClient industry={industry} />
        </Suspense>
    );
}
