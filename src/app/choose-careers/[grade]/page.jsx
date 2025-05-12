import ChooseCareersCleint from "./ChooseCareersClient";

export async function generateStaticParams() {
    return [
        { grade: "elementary-school" },
        { grade: "middle-school" },
        { grade: "high-school" },
    ];
}

export default async function Page({ params }) {
    const { grade } = await params;

    return <ChooseCareersCleint grade={grade} />;
}
