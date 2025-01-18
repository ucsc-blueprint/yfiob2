import './CareersCard.css'

export default function CareersCard({title, description, headerColor, isElementary, careerImage}) {

  if (isElementary) {
    // Display elementary-level card summary
    return (
      <div className="elementary-card-container bg-white outline-1 outline-black rounded-tr-md rounded-bl-md w-[300px] h-[320px] overflow-y-scroll overflow-x-hidden font-lato">
        <header className='p-1 text-[20px] text-center font-bold'> {title} </header>
        <p>{description}</p>
      </div>
    )
  } else {
    // Otherwise, display middle/high school level card summary
    return (
      <div className="card-container">
        <header className='card-title' style={{ backgroundColor: headerColor }}>{title}</header>
        <p>{description}</p>
        <img src={careerImage} alt='career-image'></img>
      </div>        
      );
    }

}