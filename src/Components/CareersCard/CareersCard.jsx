import './CareersCard.css'

export default function CareersCard({title, description, headerColor, userStage}){
    if (userStage === 'elementary') {
        return (
            <>
                <div className="elementary-card-container">
                    <header className='elementary-header'>Agricultural Architect</header>
                    <p>{description}</p>
                </div>
            </>
        )
    } else {
        return (
            <>
            <div className="card-container">
                <header className='card-title' style={{ backgroundColor: headerColor }}>{title}</header>
                <p>{description}</p>
                <img src="https://placehold.co/250x250" alt='test' className='card-img'></img>
            </div>
        
        </>
        );
    }

}