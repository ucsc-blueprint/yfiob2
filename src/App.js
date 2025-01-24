import { Navbar } from "./components/Navbar";
import CareersCard from "./components/CareersCard";

function App() {
	return (
		<div className="bg-[#FFC273] h-[100vh]">
			<Navbar />
			<div className="flex justify-center">
			<CareersCard 
				educationLevel={'elementary-school'}
				title={"Agricultural Architect"} 
				description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
				careerImage={'https://placehold.co/200x200'}
				/>
			</div>
		</div>
	);
}

export default App;
