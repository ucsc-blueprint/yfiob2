"use client";

import React, { useState } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { CollegeCard } from "../components/CollegeCard";

function App() {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="flex justify-center items-center m-16">
                <CollegeCard
                    selectedAnswer={selectedAnswer}
                    onAnswerSelect={setSelectedAnswer}
                />
            </div>
        </div>
  );
}

export default App;
