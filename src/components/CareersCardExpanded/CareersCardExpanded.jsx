import React from "react";

export const CareersCardExpanded = ({
  educationLevel,
  category,
  careerName,
  description,
  salary,
  skills,
  careerImages,
  colleges,
  majors,
}) => {
  const educationStyles = {
    "elementary-school": "#EACAA5",
    "middle-school": "#3FA1D9",
    "high-school": "#47B748",
  };

  // Used to dynamically render information sections (i.e colleges, majors, etc.)
  const renderTextSection = (label, value) => (
    <>
      <p className="font-medium pb-2">{label}:</p>
      <p className="pb-5">{value}</p>
    </>
  );

  // Styling to display all career images
  const renderImages = () => (
    <div className="flex flex-col gap-5">
      {careerImages.map((careerImage, index) => (
        <div key={index}>
          <img 
            data-testid="career-image" 
            className="rounded-md w-full object-cover" 
            src={careerImage} 
            alt="careerImage" 
          />
        </div>
      ))}
      <img 
        className="mt-auto ml-auto h-24 w-24" 
        src="/jignaSmall.png" 
        alt="Jigna Small"
      />
    </div>
  );

  return (
    <div 
      data-testid="careers-card-expanded-container" 
      className="rounded-3xl w-11/12 m-auto no-scrollbar overflow-y-scroll max-h-auto"
    >
      <h4
        data-testid="careers-header"
        className="pt-2 pb-2 text-center text-xl text-white"
        // Set background color depending on education-level
        style={{ backgroundColor: educationStyles[educationLevel] }}
      >
        {category}
      </h4>
      <div className="bg-red-50 p-10 no-scrollbar overflow-y-scroll">
        {/* Two-column layout for content and images */}
        <div className="flex flex-row gap-8">
          {/* Left column for text content */}
          <div className="flex-1">
            <h2 className="text-xl font-medium pb-10">{careerName}</h2>
            
            {/* If elementary-school, display career name, description and salary */}
            {educationLevel === "elementary-school" && (
              <>
                {renderTextSection("Description", description)}
                {renderTextSection("Salary", salary)}
              </>
            )}
            
            {/* If middle-school, display skills, description and salary */}
            {educationLevel === "middle-school" && (
              <>
                {renderTextSection("Description", description)}
                {renderTextSection("Salary", salary)}
                {renderTextSection("Skills", skills)}
              </>
            )}
            
            {/* If high-school, display all information except career name */}
            {educationLevel === "high-school" && (
              <>
                {renderTextSection("Description", description)}
                {renderTextSection("Salary", salary)}
                {renderTextSection("Colleges", colleges)}
                {renderTextSection("Skills", skills)}
                {renderTextSection("Majors", majors)}
              </>
            )}
          </div>
          
          {/* Right column for images */}
          <div className="w-1/3">
            {renderImages()}
          </div>
        </div>
      </div>
    </div>
  );
};