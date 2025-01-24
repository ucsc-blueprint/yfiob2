import './CareersCard.css'

export default function CareersCard({title, description, headerColor, educationLevel, careerImage}) {
  if (educationLevel === 'elementary') {
    console.log()
    // Display elementary-level card summary
    return (
      <div className="p-2 bg-white outline-1 rounded-l-2xl rounded-r-2xl w-[280px] h-[290px] overflow-y-scroll overflow-x-hidden font-lato">
        <header className='p-2 text-[22px] text-center font-bold'> {title} </header>
        <p className='m-2 mt-4 text-[12px] tracking-tight'>{description}</p>
        <img className='m-auto max-w-64' src={careerImage} alt='career-image'></img>
      </div>
    )
  } else {
    // Otherwise, display middle/high school level card summary
    return (
      <div className="no-scrollbar overflow-y-auto bg-white rounded-3xl outline-1 w-[320px] h-[380px] rounded-15px pb-1em font-lato ">
        { educationLevel === 'middle-school' ? 
        // Header for middle-school level
        <header className='p-2 text-[18px] text-center font-bold'> {title} </header>
        :
        // Header for high-school level
        <header className="p-3 bg-[#47B748] text-center text-[22px] font-bold text-lg pd-[0.7em]">{title}</header>
        }
        <p className="p-6 ">{description}</p>
        <img className='m-auto mb-5' src={careerImage} alt='career-image'></img>
      </div>        
      );
    }

}