//import { Navbar } from "./components/Navbar";
import { QuestionCard } from "./components/QuestionCard/QuestionCard";
//import CareersCard from "./components/CareersCard/CareersCard";
function App() {
	return (
		<QuestionCard question={"Testing a question"} advice={"Here's some advice"} questionNumber={5} totalQuestions={15}/>
	);
}

export default App;
