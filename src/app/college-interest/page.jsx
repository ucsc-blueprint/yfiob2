import { Suspense } from "react";
import CollegePageClient from "./CollegePageClient";

export default function Page() {
    return (
        <Suspense>
        <CollegePageClient />
        </Suspense>
    );
}