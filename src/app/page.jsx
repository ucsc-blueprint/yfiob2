import React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { CareersCardExpanded } from "../components/CareersCardExpanded/CareersCardExpanded";

function App() {
    const defaultCardProps = {
        educationLevel: "high-school",
        category: "Technology",
        careerName: "Software Developer",
        description: "Develops software applications and systems",
        salary: "$80,000 - $150,000",
        skills: ["computer science", "software engineering", "information technology"],
        careerImages: [
            "https://images.unsplash.com/photo-1657343585287-b5c42ff0d0e3?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxPemNMV2dLQXRXVXx8ZW58MHx8fHx8",
            "https://images.unsplash.com/photo-1696221734265-d2020cffa479?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NXxPemNMV2dLQXRXVXx8ZW58MHx8fHx8",
        ],
        colleges: ["ucsc", "stanford", "mit"],
        majors: "Computer Science, Software Engineering",
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <CareersCardExpanded {...defaultCardProps} />
        </div>
    );
}

export default App;
