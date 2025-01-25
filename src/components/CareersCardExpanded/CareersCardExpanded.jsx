import React from "react";

export const CareersCardExpanded = ({educationLevel, category, careerName, description, salary, skills, careerImages, colleges, majors}) => {
  // Elementary School Styling
  if (educationLevel === 'elementary-school') {
    return (
      <div className='w-11/12 m-auto no-scrollbar overflow-y-scroll max-h-[70vh]'>
        <h4 className="pl-6 pr-6 pt-2 pb-2 bg-[#EACAA5] w-max rounded-t-xl italic">{category}</h4>
        <div className="bg-white p-5 no-scrollbar overflow-y-scroll">
          {/* Career text-related info */}
          <h2 className="text-[20px] font-medium pb-2">{careerName}</h2>
          <p className="pb-2">Description:</p>
          <p className="pb-5">{description}:</p>
          <p className="pb-2">Salary:</p>
          <p className="pb-5">{salary}</p>
          
          {/* Image Gallery */}
          <div className="flex gap-5 flex-wrap">
            {careerImages.map((careerImage, index) => (
              <div key={index}>
                <img className="rounded-[5px]" src={careerImage} alt='careerImage'></img>
              </div>
            ))}
            <img className='mt-auto ml-auto h-[100px] w-[100px]' src="/jignaSmall.png" alt="Jigna Small"/>
          </div>

        </div>
      </div>
    );

  // Middle School Styling
  } else if (educationLevel === 'middle-school') {
    return (
      <div className='w-11/12 m-auto no-scrollbar overflow-y-scroll max-h-[70vh]'>
        <h4 className="pl-6 pr-6 pt-2 pb-2 bg-[#3FA1D9] w-max rounded-t-xl italic">{category}</h4>
        <div className="bg-white p-5 no-scrollbar overflow-y-scroll">
          {/* Career text-related info */}
          <p className="pb-2">Description:</p>
          <p className="pb-5">{description}:</p>
          <p className="pb-2">Salary:</p>
          <p className="pb-5">{salary}</p>
          <p className="pb-2">Skills:</p>
          <p className="pb-5">{skills}</p>


          {/* Image Gallery */}
          <div className="flex gap-5 flex-wrap">
            {careerImages.map((careerImage, index) => (
              <div key={index}>
                <img className="rounded-[5px]" src={careerImage} alt='careerImage'></img>
              </div>
            ))}
            <img className='mt-auto ml-auto h-[100px] w-[100px]' src="/jignaSmall.png" alt="Jigna Small"/>
          </div>

        </div>
      </div>
    );
  
  // High-school styling
  } else {
    
    return (
      <div className='w-11/12 m-auto no-scrollbar overflow-y-scroll max-h-[70vh]'>
        <h4 className="pl-6 pr-6 pt-2 pb-2 bg-[#47B748] w-max rounded-t-xl italic">{category}</h4>
        <div className="bg-white p-5 no-scrollbar overflow-y-scroll">
          {/* Career text-related info */}
          <p className="pb-2">Description:</p>
          <p className="pb-5">{description}:</p>
          
          <p className="pb-2">Salary:</p>
          <p className="pb-5">{salary}</p>
          
          <p className="pb-2">Colleges:</p>
          <p className="pb-5">{colleges}</p>

          
          <p className="pb-2">Skills:</p>
          <p className="pb-5">{skills}</p>

          <p className="pb-2">Majors:</p>
          <p className="pb-5">{majors}</p>


          {/* Image Gallery */}
          <div className="flex gap-5 flex-wrap">
            {careerImages.map((careerImage, index) => (
              <div key={index}>
                <img className="rounded-[5px]" src={careerImage} alt='careerImage'></img>
              </div>
            ))}
            <img className='mt-auto ml-auto h-[100px] w-[100px]' src="/jignaSmall.png" alt="Jigna Small"/>
          </div>

        </div>
      </div>
    );

  }

  
};

