import { Navbar } from "./components/Navbar/Navbar.jsx";
import { QuestionCard } from "./components/QuestionCard.jsx";

function App() {
	return (
		<div className="bg-[#FFC273] h-[100vh]">
			<Navbar />
			<div className="flex justify-center">
				<QuestionCard
					advice={"here's some advice"}
					question={"test question"}
					questionNumber={5}
					totalQuestions={6}
				/>
			</div>
		</div>
	);
}

export default App;
