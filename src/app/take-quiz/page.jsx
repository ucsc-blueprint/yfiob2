"use client";

import { Navbar } from "../../components/Navbar/Navbar";
import { QuestionCard } from "../../components/QuestionCard/QuestionCard.jsx";
import questions from "../../../questions.json";
import { useEffect, useState } from "react";
import BackArrow from "../../components/BackArrow.jsx";
import ForwardArrow from "../../components/ForwardArrow.jsx";
import { getAllResponses } from "../../../backend/questions/questionDB.js";

function getQuestions(educationLevel) {
	const parsedData = Object.values(questions).map((element) => {
		return element;
	});
	return parsedData[educationLevel];
}

export default function Page() {
	
	

	const educationLevel = 1;
	const [questions] = useState(getQuestions(educationLevel));
	
	const [questionNum, setQuestionNum] = useState(0);
	const [savedRandomNums, setSavedRandomNums] = useState({});
	const [answers, setAnswers] = useState({}); 

	const randomNum = savedRandomNums[questionNum] ?? Math.floor(Math.random() * questions[questionNum].sub_questions.length);

	useEffect(() => {
		if (savedRandomNums[questionNum] === undefined) {
			setSavedRandomNums((prev) => ({
				...prev,
				[questionNum]: randomNum,
			}));
		}
	}, [questionNum, randomNum, savedRandomNums]);

	useEffect(()=>{
		const getData = async () =>{
			const data =  await getAllResponses("Akshay");
			return data;
		} 
		getData().then((res)=>{console.log(res)})
	}, [])
	
	// map each question to the sub question 
	const questionsObject = questions.map((question, qIndex) => {
		return Object.values(question.sub_questions).map((subQuestion, sIndex) => {
			const questionId = `${qIndex}-${sIndex}`; 
			return (
				<div key={questionId}>
					<QuestionCard
						advice={question.question}
						question={subQuestion.statement}
						questionNumber={question.question_id}
						totalQuestions={"6"}
						selectedAnswer={answers[questionId]} 
						onAnswerSelect={(answer) => {
							setAnswers((prevAnswers) => ({
								...prevAnswers,
								[questionId]: answer, 
							}));
						}}
					/>
				</div>
			);
		});
	});

	// creates a unique ID for each question
	const currentQuestionId =  `${questionNum}-${savedRandomNums[questionNum] || randomNum}`;
	return (
		<>
<Navbar />
<div className="flex flex-col justify-center items-center m-16">
	<div className="flex flex-row items-center justify-center">
		<button className = "mr-10"
			onClick={() => {
				if (questionNum > 0) {
					setQuestionNum(questionNum - 1);
				}
			}}
		>
			<BackArrow />
		</button>

		{/* Question Card */}
		<div className="flex flex-col items-center ">
			{questionsObject[questionNum]?.[randomNum] ?? (
				<div className="m-20">
					<QuestionCard
						advice={""}
						question={""}
						questionNumber={"1"}
						totalQuestions={"6"}
						selectedAnswer={answers[question]}
						onAnswerSelect={(answer) => {
							setAnswers((prevAnswers) => ({
								...prevAnswers,
								[currentQuestionId]: answer,
							}));
						}}
					/>
				</div>
			)}
		</div>

		<button className="ml-10"
			onClick={() => {
				if (questionNum < questions.length - 1) {
					setQuestionNum(questionNum + 1);
				}
			}}
		>
			<ForwardArrow />
		</button>
	</div>

	
</div>
	{
		
		questionNum === questions.length - 1 && <div className="mt-6 flex justify-center ">
		<button className="text-lg text-white bg-blue-500 px-5 py-2 rounded-full hover:bg-blue-700">
			Submit
		</button>
	</div>
	}

		</>
	);
}
