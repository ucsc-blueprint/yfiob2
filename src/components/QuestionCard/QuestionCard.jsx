import React, { useState } from "react";

const agreeArray = [
	"Strongly Disagree",
	"Disagree",
	"Neutral",
	"Agree",
	"Strongly Agree",
];

export const QuestionCard = ({
	question,
	advice,
	questionNumber,
	totalQuestions,
	selectedAnswer, 
	grade, 
	onAnswerSelect = () => {},
}) => {


	const backgroundColor = {
		"elementary-school": "bg-[#3FA1D9]",
		"middle-school": "bg-[#47B748]",
		"high-school":  "bg-[#FF7022]", 
	}

	const textColor = {
		"elementary-school": "text-[#3FA1D9]", 
		"middle-school": "text-[#47B748]",
		"high-school":  "text-[#FF7022]", 
	}

	const puzzleColor = {
		"elementary-school": "/jigna-small-blue.svg",
		"middle-school": "/jigna-small-green.svg",
		"high-school":  "/jigna-small-orange.svg", 
	}
	
	const bgColor = backgroundColor[grade]
	const tColor = textColor[grade]
	const puzzleImg = puzzleColor[grade]

	return (
		<div className={`bg-slate-300 w-[66vw] h-[50vh] rounded-[20px] font-lato shadow-md overflow-hidden`}>
			<div
				className={`${bgColor} h-[10%] w-[25%] rounded-tl-[20px]`}
				style={{ width: `${Math.floor((questionNumber / totalQuestions) * 100)}%` }}
				
			></div>
			<div className="bg-white h-full rounded-b-[20px] p-[5vh] flex flex-col">
				<div className=" flex-col flex items-center grow justify-space-between">
					<p className="flex-[1] w-[77%] text-[114%] text-center italic">{advice}</p>
					<div className="flex-[3] w-[77%] flex justify-between">
						<h1 className="text-3xl font-bold">"{question}"</h1>
						<img width={"20%"} src={`${puzzleImg}`} alt="Jigna Small" />
					</div>
					<div className="flex-[1] w-[75%] flex-row flex justify-center pb-4 ">
						{agreeArray.map((agreement, i) => {
							const weight = (i === 0) | (i === agreeArray.length - 1) ? 2 : 1;
							return (
								<button
									key={i}
									onClick={() => onAnswerSelect(i)}
									className={`flex-[${weight}] text-center m-[1%] rounded-[20px] px-4 py-3 ${
										selectedAnswer === i ? `${bgColor} text-white` : 'bg-slate-200 text-slate-500' 
									}`}
								>
									{agreement}
								</button>
							);
						})}
					</div>
				</div>
				<div className="flex justify-end items-end text-2xl pb-[2vh]">
					<span className={`${tColor}`}>{questionNumber}</span>
					<span className="text-slate-400">/{totalQuestions}</span> 
				</div>
			</div>
			
			<div className="flex-end justify-center">
				<button className="text-lg text-white bg-blue-500 px-5 py-2 rounded-full hover:bg-blue-700"
				>
					Submit
				</button>
			</div>
		</div>
	);
};
