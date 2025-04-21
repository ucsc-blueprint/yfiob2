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
    skills: "Programming, problem-solving, communication",
    careerImages: [],
    colleges: "Various universities and colleges",
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
