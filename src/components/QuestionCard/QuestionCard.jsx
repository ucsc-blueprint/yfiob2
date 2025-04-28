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
		"grey-color": "text-[#9F9F9F]",
	}

	const puzzleColor = {
		"elementary-school": "/jigna-small-blue.svg",
		"middle-school": "/jigna-small-green.svg",
		"high-school":  "/jigna-small-orange.svg", 
	}

	
	
	const bgColor = backgroundColor[grade]
	const tColor = textColor[grade]
	const puzzleImg = puzzleColor[grade]
	const gcolor = textColor[3]
	

	return (
		<div className={`bg-slate-300 w-[66vw] h-[50vh] rounded-[20px] font-lato shadow-md overflow-hidden`}>
			<div
				className={`${bgColor} h-[10%] w-[25%] rounded-tl-[20px]`}
				style={{ width: `${Math.floor((questionNumber / totalQuestions) * 100)}%` }}
				
			></div>
			<div className="bg-white h-full rounded-b-[20px] p-[5vh] flex flex-col justify-center">
			<div className={`font-lato italic ${gcolor} mb-5 pl-[11.5%]`}>
  "Don't worry about time, money, training, or education. Just think do you enjoy it?"
</div>

<div className="flex-col flex items-center grow relative mb-14">
  <div className="flex-[3] w-[77%] flex items-start gap-4 mr-14 -ml-5">
    {/* Fixed size circle */}
    <div className={`flex items-center justify-center text-white w-10 h-10 rounded-full ${bgColor} flex-shrink-0`}>
      {questionNumber}
    </div>

    {/* Fixed height for question text area */}
    <div className="flex flex-col min-h-[140px] justify-between">
      <h1 className="text-3xl font-bold mb-2">"{question}"</h1>
      <p className="text-sm text-gray-400">Please select how strongly you agree/disagree with this statement</p>
    </div>

    {/* Keep puzzle image stable */}
    <img className="absolute right-0 w-[20%] min-w-[80px] max-w-[100px]" src={`${puzzleImg}`} alt="Jigna Small" />
  </div>

  {/* Answer buttons */}
  <div className="flex-[1] w-[75%] flex justify-center flex-wrap gap-4 pt-10">
    {agreeArray.map((agreement, i) => {
      const weight = (i === 0 || i === agreeArray.length - 1) ? 2 : 1;
      return (
        <button
          key={i}
          onClick={() => onAnswerSelect(i)}
          className={`flex-[${weight}] text-center rounded-[20px] px-4 py-3 transition ${
            selectedAnswer === i ? `${bgColor} text-white` : 'bg-slate-200 text-slate-500'
          }`}
        >
          {agreement}
        </button>
      );
    })}
<div className="absolute mt-14 right-0 text-2xl">
    <span className={`${tColor}`}>{questionNumber}</span>
    <span className="text-slate-400">/{totalQuestions}</span>
  </div>
  </div>
</div>

  {/* Page Number */}
  
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
