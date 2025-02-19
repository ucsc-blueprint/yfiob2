import React from "react";

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
}) => {
	return (
		<div className="bg-slate-400 w-[66vw] h-[50vh] rounded-[20px] font-lato shadow-md overflow-hidden">
			<div
				className="bg-green-500 h-[10%] w-[25%] rounded-tl-[20px]"
				style={{ width: `${Math.floor((questionNumber / totalQuestions) * 100)}%` }}
			></div>
			<div className="bg-white h-full rounded-b-[20px] p-[5vh] flex flex-col">
				<div className=" flex-col flex items-center grow justify-space-between">
					<p className="flex-[1] w-[77%] text-[114%] text-center italic">{advice}</p>
					<div className="flex-[3] w-[77%] flex justify-between">
						<h1 className="text-3xl font-bold">"{question}"</h1>
						<img width={"20%"} src="/jigna-small.svg" alt="Jigna Small" />
					</div>
					<div className="flex-[1] w-[75%] flex-row flex justify-center pb-4 ">
						{agreeArray.map((agreement, i) => {
							const weight = (i === 0) | (i === agreeArray.length - 1) ? 2 : 1;
							return (
								<button
									key={i}
									className={`flex-[${weight}] text-center text-slate-500 bg-slate-300 m-[1%] rounded-[20px] py-3`}
								>
									{agreement}
								</button>
							);
						})}
					</div>
				</div>
				<div className="flex justify-end items-end text-2xl pb-[2vh]">
					<span className="text-green-600">{questionNumber}</span>
					<span className="text-slate-400">/{totalQuestions}</span>
				</div>
			</div>
		</div>
	);
};
