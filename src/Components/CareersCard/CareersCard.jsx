import './CareersCard.css'

export default function CareersCard({title, description, headerColor, isElementary, careerImage}) {

  if (isElementary) {
    // Display elementary-level card summary
    return (
      <div className="elementary-card-container">
        <header className='elementary-header'> {title} </header>
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