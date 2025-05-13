import CareerInDepthClient from "./CareerInDepthClient";

const careersData = await require("../../../../../constants/Careers.json");

export async function generateStaticParams() {
    const grades = ["elementary-school", "middle-school", "high-school"];
    const careers = Object.keys(careersData)
        .map((key) => Object.keys(careersData[key].careers).map((key) => key))
        .flat();

    const params = [];
    for (const grade of grades) {
        for (const career of careers) {
            params.push({
                grade,
                career,
            });
        }
    }

    return params;
}

// This is a Server Component
export default async function Page({ params }) {
    const { grade, career } = await params;

    return <CareerInDepthClient grade={grade} career={career} />;
}
