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
      <p className="pb-2">{label}:</p>
      <p className="pb-5">{value}</p>
    </>
  );
  // Styling to display all career images
  const renderImages = () => (
    <div className="flex gap-5 flex-wrap">
      {careerImages.map((careerImage, index) => (
        <div key={index}>
          <img className="rounded-[5px]" src={careerImage} alt="careerImage" />
        </div>
      ))}
      <img className="mt-auto ml-auto h-[100px] w-[100px]" src="/jignaSmall.png" alt="Jigna Small"
      />
    </div>
  );

  return (
    <div className="flex flex-col flex-1 w-11/12 mt-auto ml-auto mr-auto no-scrollbar overflow-y-scroll h-auto">
      <h4
        className={`pl-6 pr-6 pt-2 pb-2 w-max rounded-t-xl italic`}
        // Set background color depending on education-level
        style={{ backgroundColor: educationStyles[educationLevel] }}
      >
        {category}
      </h4>
      <div className="bg-white p-5 no-scrollbar overflow-y-scroll h-[100%] ">
        {/* If elementary-school, display career name, description and salary  */}
        {educationLevel === "elementary-school" && (
          <>
            <h2 className="text-[20px] font-medium pb-2">{careerName}</h2>
            {renderTextSection("Description", description)}
            {renderTextSection("Salary", salary)}
          </>
        )}
        {/* If middle-school, display skills, description and salary  */}
        {educationLevel === "middle-school" && (
          <>
            {renderTextSection("Description", description)}
            {renderTextSection("Salary", salary)}
            {renderTextSection("Skills", skills)}
          </>
        )}
        {/* If middle-school, display all information except career name */}
        {educationLevel === "high-school" && (
          <>
            {renderTextSection("Description", description)}
            {renderTextSection("Salary", salary)}
            {renderTextSection("Colleges", colleges)}
            {renderTextSection("Skills", skills)}
            {renderTextSection("Majors", majors)}
          </>
        )}
        {renderImages()}
      </div>
    </div>
  );
};
