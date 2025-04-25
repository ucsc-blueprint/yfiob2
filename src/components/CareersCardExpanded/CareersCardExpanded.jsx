import Image from "next/image";
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
        <div>
            <p className="font-medium pb-2">{label}:</p>
            <div className="pb-5">{value}</div>
        </div>
    );

    // Styling to display all career images
    const renderImages = () => (
        <div className="flex flex-col gap-5 items-end">
            {careerImages?.map((careerImage, index) => (
                <div key={index} data-testid="career-image">
                    <Image
                        className="rounded-md object-cover"
                        src={careerImage}
                        alt="careerImage"
                        width={0}
                        height={200}
                        style={{ width: "auto", maxHeight: "200px" }}
                    />
                </div>
            ))}
            {(!careerImages || careerImages.length <= 0) && (
                <img
                    className="mt-auto ml-auto h-24 w-24"
                    src="/jignaSmall.png"
                    alt="Jigna Small"
                />
            )}
        </div>
    );

    return (
        <div
            data-testid="careers-card-expanded-container"
            className="rounded-3xl w-11/12 m-auto no-scrollbar overflow-y-scroll pt-5 max-h-auto shadow-md"
        >
            <h4
                data-testid="careers-header"
                className="pt-2 pb-2 text-center text-xl text-white rounded-t-2xl"
                style={{ backgroundColor: educationStyles[educationLevel] }}
            >
                {category}
            </h4>
            <div className="bg-white p-10 no-scrollbar overflow-y-scroll">
                <div className="flex flex-row gap-8">
                    <div className="flex-1">
                        {educationLevel !== "high-school" && (
                            <h2 className="text-xl font-medium pb-10">{careerName}</h2>
                        )}

                        {renderTextSection("Description", description)}
                        {renderTextSection("Salary", salary)}

                        {educationLevel === "middle-school" &&
                            renderTextSection("Skills", skills)}

                        {educationLevel === "high-school" && (
                            <>
                                {renderTextSection(
                                    "Colleges",
                                    <ul
                                        style={{
                                            listStyleType: "disc",
                                            paddingLeft: "1.5rem",
                                        }}
                                    >
                                        {Array.isArray(colleges)
                                            ? colleges.map((college, index) => (
                                                  <li key={index}>{college}</li>
                                              ))
                                            : colleges}
                                    </ul>
                                )}
                                {renderTextSection(
                                    "Skills",
                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "8px",
                                        }}
                                    >
                                        {Array.isArray(skills)
                                            ? skills.map((skill, index) => (
                                                  <div
                                                      key={index}
                                                      style={{
                                                          background: "#FFC273",
                                                          padding: "5px 10px",
                                                          borderRadius: "5px",
                                                          width: "fit-content",
                                                          whiteSpace: "nowrap",
                                                      }}
                                                  >
                                                      {skill}
                                                  </div>
                                              ))
                                            : skills}
                                    </div>
                                )}
                                {renderTextSection("Majors", majors)}
                            </>
                        )}
                    </div>

                    <div className="w-1/3">{renderImages()}</div>
                </div>
            </div>
        </div>
    );
};
