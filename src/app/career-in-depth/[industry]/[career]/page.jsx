import CareerInDepthClient from "./CareerInDepthClient";

const careersData = await require("../../../../../constants/Careers.json");

export async function generateStaticParams() {
    const industries = Object.keys(careersData).map((key) => key);
    const careers = Object.keys(careersData)
        .map((key) => Object.keys(careersData[key].careers).map((key) => key))
        .flat();

    const params = [];
    for (const industry of industries) {
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

    return <CareerInDepthClient industry={industry} career={career} />;
}
