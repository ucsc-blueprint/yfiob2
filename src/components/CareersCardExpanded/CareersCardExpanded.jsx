import React from "react";


export const CareersCardExpanded = ({educationLevel, category, careerName, description, salary, skills, careerImages}) => {
  if (educationLevel === 'elementary-school') {
    return (
      <div className='w-11/12 m-auto no-scrollbar overflow-y-scroll max-h-[70vh]'>
        <h4 className="pl-6 pr-6 pt-2 pb-2 bg-[#EACAA5] w-max rounded-t-xl italic">{category}</h4>
        <div className="bg-white p-5 no-scrollbar overflow-y-scroll">
          <h2 className="text-[20px] font-medium pb-2">{careerName}</h2>
          <p className="pb-2">Description:</p>
          <p className="pb-5">{description}:</p>
          <p className="pb-2">Salary:</p>
          <p className="pb-5">{salary}</p>
          {/* Image Gallery */}
          <div className="flex gap-5 flex-wrap">
            {careerImages.map((careerImage, index) => (
              <div key={index}>
                <img src={careerImage} alt='careerImage'></img>
              </div>
            ))}
            <img className='mt-auto ml-auto h-[100px] w-[100px]' src="/jignaSmall.png" alt="Jigna Small"/>
          </div>
        </div>

        {/* <div className="bg-red-50">
          <h4>{category}</h4>
        </div>
        <div className="bg-green-300">
          <h2>{careerName}</h2>
          <p>Description:</p>
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
        <img src="/jignaSmall.png" alt="Jigna Small" className = 'jignaSmall'/>
        </div> */}
      </div>
    );

  } else if (educationLevel === 'middle-school') {


  } else {
    
  }

  
};

