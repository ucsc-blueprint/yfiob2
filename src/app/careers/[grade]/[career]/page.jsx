import CareersClient from "./CareersClient";

export async function generateStaticParams() {
    const grades = ["elementary-school", "middle-school", "high-school"];
    const careers = [
        "Transportation",
        "Agriculture and Natural Resources",
        "Energy and Utilities",
        "Arts, Media, and Entertainment",
        "Skilled Trades",
        "Engineering and Design Industry",
        "Education, Child Development, and Family Services",
        "Psychology",
        "Ecology & Environmental",
        "Health Science and Medical Technology",
        "Research & Academia",
        "Hospitality, Tourism, and Recreation",
        "Information Technology",
        "Manufacturing and Product Development",
        "Marketing, Sales, and Service",
        "Aviation",
        "Supply Chain",
        "Law & Law Enforcement",
        "Finance and Business",
        "Public Services",
        "Fashion and Interior Design",
        "Building Trades and Construction",
    ];

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

    return <CareersClient grade={grade} career={career} />;
}
