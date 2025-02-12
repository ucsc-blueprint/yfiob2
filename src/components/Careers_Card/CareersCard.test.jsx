export default CareersCard;
import CareersCard from './CareersCard'
import {render, fireEvent, screen} from '@testing-library/react'


test('Elementary-school page rendered', async () =>{
    render(<CareersCard 
        title={"Software engineer"} 
        description={"Codes a lot"} 
        educationLevel ={"elementary-school"} 
        careerImage = {'https://placehold.co/600x400/EEE/31343C'} 
        />
    );
    expect(screen.getByText("Software engineer")).toBeInTheDocument(); 
    expect(screen.getByText("Codes a lot")).toBeInTheDocument(); 
    const image = screen.queryByRole('img');
    expect(image).not.toBeInTheDocument(); 
})

test('Middle-school page rendered', async () =>{
    render(<CareersCard 
        title={"Software engineer"} 
        description={"Codes a lot"} 
        educationLevel ={"middle-school"} 
        careerImage = {'https://placehold.co/600x400/EEE/31343C'} 
        />
    );
    expect(screen.getByText("Software engineer")).toBeInTheDocument(); 
    expect(screen.getByText("Codes a lot")).toBeInTheDocument(); 
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument(); 
})

// Testing component for the high-school parameter
test('High-school page rendered', async () =>{
    render(<CareersCard 
        title={"Software engineer"} 
        description={"Codes a lot"} 
        educationLevel ={"high-school"} 
        careerImage = {'https://placehold.co/600x400/EEE/31343C'} 
        />
    );    
    expect(screen.getByText("Software engineer")).toBeInTheDocument(); 
    expect(screen.getByText("Codes a lot")).toBeInTheDocument(); 
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument(); 
})


