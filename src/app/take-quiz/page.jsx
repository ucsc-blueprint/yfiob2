"use client"

import { Navbar } from "../../components/Navbar/Navbar";
import { QuestionCard } from "../../components/QuestionCard.jsx";
import questions from "../../../questions.json";

function getQuestions(educationLevel) {
	const parsedData = Object.values(questions).map((element) => {
		return element
	})
	
	console.log(parsedData[educationLevel])
	return parsedData[educationLevel]
}

export default function page({educationLevel}) {
	return (
		<>
			{getQuestions(educationLevel).map((question) => {
				console.log(question_id)
				return <p>{question.question_id}</p>
			})}
			<Navbar />
			<p>Take quiz page</p>
			<QuestionCard />
		</>
	);
}
