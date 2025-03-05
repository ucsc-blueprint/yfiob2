import { Navbar } from "../components/Navbar/Navbar";
import ExploreCareersPage from "./explore-careers/page";
function App() {
	return (
		<div className="bg-[#FFC273] h-[100vh]">
			<Navbar/>
			<ExploreCareersPage/>
		</div>
	);
}

export default App;