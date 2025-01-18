import { Navbar } from "./components/Navbar";
import { CareersCardExpanded } from "./components/CareersCardExpanded/CareersCardExpanded";

function App() {
	return (
		<div className="bg-[#FFC273] h-[100vh]">
			<Navbar />
        <CareersCardExpanded 
        careerImages={['https://placehold.co/250x250', 'https://placehold.co/250x250', 'https://placehold.co/250x250']}
        careerName={'ugh'}
        category={"ugh x2"}
        description={"lorem ipsum or whatever"}
        salary={10000}
        />
		</div>
	);
}

export default App;
