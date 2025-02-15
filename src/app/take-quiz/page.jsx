"use client";

import { Navbar } from "../../components/Navbar/Navbar";
import { QuestionCard } from "../../components/QuestionCard.jsx";
import questions from "../../../questions.json";
import { useState } from "react";

function getQuestions(educationLevel) {
	const parsedData = Object.values(questions).map((element) => {
		return element;
	});
	return parsedData[educationLevel];
}

export default function Page() {
	const educationLevel = 1;
	const [questions] = useState(getQuestions(educationLevel));
	const [questionNum, setQuestionNum] = useState(5);

	const questionsObject = questions.map((question) => {
		return Object.values(question.sub_questions).map((subQuestion) => {
			return (
				<div className="m-20">
					<QuestionCard
						key={subQuestion.statement}
						advice={question.question}
						question={subQuestion.statement}
						questionNumber={question.question_id}
						totalQuestions={"6"}
					/>
				</div>
			);
		});
	});

	console.log(questionsObject);
	const [randomNum] = useState(
		Math.round(Math.random() * questionsObject[questionNum].length)
	);

	console.log(randomNum);

	return (
		<>
			<Navbar />
			<div className="flex justify-center">
				<button
					onClick={() => {
						if (questionNum > 0) {
							setQuestionNum(questionNum - 1);
						}
					}}
				>
					Back
				</button>
				<div className="flex flex-col items-center">
					{questionsObject[questionNum][randomNum]}
				</div>
				<button
					onClick={() => {
						if (questionNum < 5) {
							setQuestionNum(questionNum + 1);
						}
					}}
				>
					Forward
				</button>
			</div>
		</>
	);
}
