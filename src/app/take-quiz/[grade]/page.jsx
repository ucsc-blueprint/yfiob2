import QuizClient from "./QuizClient";

export async function generateStaticParams() {
    return [
        { grade: "elementary-school" },
        { grade: "middle-school" },
        { grade: "high-school" },
    ];
}
export default async function Page({ params, searchParams }) {
    const { grade } = await params;

    return <QuizClient grade={grade} />;
}
