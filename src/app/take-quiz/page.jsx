"use client";

import { Navbar } from "../../components/Navbar/Navbar";
import { QuestionCard } from "../../components/QuestionCard/QuestionCard.jsx";
import questions from "../../../questions.json";
import { useEffect, useState } from "react";
import BackArrow from "../../components/BackArrow.jsx";
import ForwardArrow from "../../components/ForwardArrow.jsx";

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
	const [randomNum, setRandomNum] = useState(null);

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

	useEffect(() => {
		setRandomNum(Math.floor(Math.random() * questionsObject[questionNum].length));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionsObject]);

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
					<BackArrow />
				</button>
				<div className="flex flex-col items-center">
					{randomNum != null ? (
						questionsObject[questionNum][randomNum]
					) : (
						<div className="m-20">
							<QuestionCard
								advice={""}
								question={""}
								questionNumber={"1"}
								totalQuestions={"6"}
							/>
						</div>
					)}
				</div>
				<button
					onClick={() => {
						if (questionNum < 5) {
							setQuestionNum(questionNum + 1);
						}
					}}
				>
					<ForwardArrow />
				</button>
			</div>
		</>
	);
}
