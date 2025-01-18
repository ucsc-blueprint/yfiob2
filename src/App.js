import { Navbar } from "./components/Navbar";
import { CareersCard } from './components/CareersCard/CareersCard.js';

function App() {
	return (
		<div className="bg-[#FFC273] h-[100vh]">
			<Navbar />
      <CareersCard 
        isElementary={false}
        title={"Agricultural Architect"} 
        headerColor={'green'}
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
        careerImage={'https://placehold.co/250x250'}
      />
		</div>
	);
}

export default App;
