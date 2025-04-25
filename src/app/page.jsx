import React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { CollegeCard } from "../components/CollegeCard";

function App() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="flex justify-center items-center m-16">
                <CollegeCard />
            </div>
        </div>
    );
}

export default App;
