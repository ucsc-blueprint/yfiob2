import QuizClient from "./QuizClient";

export async function generateStaticParams() {
  return [
    { grade: "elementary-school" },
    { grade: "middle-school" },
    { grade: "high-school" },
  ];
}

export default function Page({ params }) {
  return (
    <QuizClient grade={params.grade} />
  );
}
