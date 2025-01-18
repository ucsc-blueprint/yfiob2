import './CareersCard.css'

export default function CareersCard({title, description, headerColor, isElementary, careerImage}) {

  if (isElementary) {
    // Display elementary-level card summary
    return (
      <div className="elementary-card-container bg-white outline-1 outline-black rounded-l-2xl rounded-r-2xl w-[280px] h-[290px] overflow-y-scroll overflow-x-hidden font-lato">
        <header className='bg-[#47B748] p-2 text-[18px] text-center font-bold'> {title} </header>
        <p className='m-2 mt-4 text-[12px] tracking-tight'>{description}</p>
        <img className='m-auto max-w-64' src={careerImage} alt='career-image'></img>
      </div>
    )
  } else {
    // Otherwise, display middle/high school level card summary
    return (
      <div className="card-container bg-white outline-1 w-[300px] h-[320px] rounded-15px pb-1em overflow-y-scroll overflow-x-hidden font-lato ">
        <header className="card-title text-[black] font-bold text-lg pd-[0.7em]" style={{ backgroundColor: headerColor }}>{title}</header>
          <p className="text-start pt-[0em] pb-[1em] px-[1em]">{description}</p>
        <img src={careerImage} alt='career-image'></img>
      </div>        
      );
    }

}