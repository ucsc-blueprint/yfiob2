import './CareersCardExpanded.css'
import React from "react";


export const CareersCardExpanded = ({category, careerName, description, salary, careerImages}) => {
  return (
    <div className="flex-auto w-11/12 m-auto justify-center align-middle relative top-20 left-0">
      <div className="career-category overflow-y-auto">
        <h4>{category}</h4>
      </div>
      <div className="bg-white p-4 h-5/6">
        {/* .career-expanded-card {
        background-color: white;
        padding: 1em;

      }
      */}
        <h2>{careerName}</h2>
        <p>Description:</p>
        <p>{description}:</p>
        <p>Salary:</p>
        <p>{salary}</p>

        <div  className="career-images-container">
        {careerImages.map((careerImage, index) => (
          <div key={index}>
            <img src={careerImage} alt='careerImage'></img>
          </div>
        ))}
      </div>
      <img src="/jignaSmall.png" alt="Jigna Small" className = 'jignaSmall'/>
      </div>
    </div>
  );
};
