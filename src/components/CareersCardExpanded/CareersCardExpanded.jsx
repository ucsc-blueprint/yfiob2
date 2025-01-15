import './CareersCardExpanded.css'
import React from "react";

export const CareersCardExpanded = ({category, careerName, description, salary, careerImages}) => {
  return (
    <div className="careers-card-expanded-container">
      <div className="career-category">
        <h4>{category}</h4>
      </div>
      <div className="career-expanded-card">
        <h2>{careerName}</h2>
        <p>{description}:</p>
        <p>Salary:</p>
        <p>{salary}</p>

        <div className="career-images-container">
        {careerImages.map((careerImage, index) => (
          <div key={index}>
            <img src={careerImage} alt='careerImage'></img>
          </div>
        ))}
      </div>      
    </div>
    </div>
  );
};

