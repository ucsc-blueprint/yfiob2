import './BeforeYouStart.css'
import { Navbar } from '../Navbar'

export const BeforeYouStart = () => {
    return (
        <div
        // style={{
        //     backgroundColor: 'blue',
        //   }}
        >
            <Navbar></Navbar>
            <div className = "header">Before You Start Answering</div>
            
            <div className = "dropContainer">
                <select className = "dropdown" name = "School" id ="School">
                    <option selected disabled>school</option>
                </select>
                <select className = "dropdown" name = "School" id = "Grade">
                    <option selected disabled>grade</option>
                </select>
            </div>
        </div>
    )
}