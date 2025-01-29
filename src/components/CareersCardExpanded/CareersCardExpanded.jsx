import './CareersCardExpanded.css'
import React from "react";


export const CareersCardExpanded = ({category, careerName, description, salary, careerImages}) => {
  return (
    <div className="w-11/12 m-auto justify-center align-middle relative mt-[5vh] left-0">
      <div className="overflow-y-auto">
        <h4 className = "bg-[#47B748] max-w-fit italic px-[2em] py-[0.3em] rounded-[10px_10px_0px_0px] border-solid border-[black] h-[5vh]">{category}</h4>
      </div>
      <div className="bg-white p-4 h-[74vh] rounded-tr-[17px]">
        {/* .career-expanded-card {
        background-color: white;
        padding: 1em;

      }
      */}
        <p>Description:</p>
        <p>{description}:</p>
        <p>Salary:</p>
        <p>{salary}</p>
        <div className="flex flex-row gap-[20px] flex-wrap justify-between">

          {careerImages.map((careerImage, index) => (
            <div key={index}>
              <img src={careerImage} alt='careerImage' className='max-w-[20vw]'></img>
            </div>
          ))}
        </div>
      <img src="/jignaSmall.png" alt="Jigna Small" className = "jignaSmall max-w-[10vw] ml-auto object-scale-down"/>
      </div>
    </div>
  );
};
