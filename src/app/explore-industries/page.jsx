import ExploreIndustriesClient from "./ExploreIndustriesClient";
import {Suspense} from "react";


export default function Page() {
    return (
        <Suspense>
        <ExploreIndustriesClient />
        </Suspense>
    );
}
