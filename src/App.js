import { CareersCardExpanded } from "./components/CareersCardExpanded/CareersCardExpanded";
import { Navbar } from "./components/Navbar";

function App() {
	return (
		<div className="bg-[#FFC273] h-[100vh]">
			<Navbar />
			<CareersCardExpanded 
				category={'Agriculture and Natural Resources'} 
				careerName={'Agricultural Architect'} 
				description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed'}	
				salary={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed'}
				careerImages={['https://placehold.co/350x250', 'https://placehold.co/350x250', 'https://placehold.co/350x250',  'https://placehold.co/350x250',  'https://placehold.co/350x250',  'https://placehold.co/350x250']}
			/>
		</div>
	);
}

export default App;
