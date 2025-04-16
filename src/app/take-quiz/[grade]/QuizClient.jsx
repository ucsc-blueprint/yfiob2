"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Navbar } from "../../../components/Navbar/Navbar.jsx";
import { QuestionCard } from "../../../components/QuestionCard/QuestionCard.jsx";
import BackArrow from "../../../components/BackArrow.jsx";
import ForwardArrow from "../../../components/ForwardArrow.jsx";
import questions from "../../../../questions.json";

function getQuestions(educationLevel) {
  const parsed = Object.values(questions);
  return parsed[educationLevel];
}

export default function QuizClient({ grade }) {
  // map grade → index
  const gradeToIndex = {
    "elementary-school": 0,
    "middle-school": 1,
    "high-school": 2,
  };
  const educationLevel = gradeToIndex[grade] ?? 0;
  const [questionsForLevel] = useState(() => getQuestions(educationLevel));
  const [questionNum, setQuestionNum] = useState(0);
  const [savedRandomNums, setSavedRandomNums] = useState({});
  const [answers, setAnswers] = useState({});

  const randomNum =
    savedRandomNums[questionNum] ??
    Math.floor(
      Math.random() * questionsForLevel[questionNum].sub_questions.length
    );

  useEffect(() => {
    if (savedRandomNums[questionNum] === undefined) {
      setSavedRandomNums((prev) => ({
        ...prev,
        [questionNum]: randomNum,
      }));
    }
  }, [questionNum, randomNum, savedRandomNums]);

  // build question cards
  const questionsObject = questionsForLevel.map((q, qIndex) =>
    Object.values(q.sub_questions).map((sub, sIndex) => {
      const questionId = `${qIndex}-${sIndex}`;
      return (
        <QuestionCard
          key={questionId}
          advice={q.question}
          question={sub.statement}
          questionNumber={q.question_id}
          totalQuestions={questionsForLevel.length}
          selectedAnswer={answers[questionId]}
          onAnswerSelect={(answer) =>
            setAnswers((prev) => ({ ...prev, [questionId]: answer }))
          }
        />
      );
    })
  );

  const currentQuestionId = `${questionNum}-${
    savedRandomNums[questionNum] ?? randomNum
  }`;

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center m-16">
        <div className="flex items-center">
          <button
            className="mr-10"
            onClick={() =>
              questionNum > 0 && setQuestionNum((n) => n - 1)
            }
          >
            <BackArrow />
          </button>
          <div className="flex flex-col items-center">
            {questionsObject[questionNum]?.[randomNum] ?? (
              <QuestionCard
                advice=""
                question=""
                questionNumber="1"
                totalQuestions={questionsForLevel.length}
                selectedAnswer={answers[currentQuestionId]}
                grade="middle-school"
                onAnswerSelect={(answer) =>
                  setAnswers((prev) => ({ ...prev, [currentQuestionId]: answer }))
                }
              />
            )}
          </div>
          <button
            className="ml-10"
            onClick={() =>
              questionNum < questionsForLevel.length - 1 &&
              setQuestionNum((n) => n + 1)
            }
          >
            <ForwardArrow />
          </button>
        </div>
        {questionNum === questionsForLevel.length - 1 && (
          <div className="mt-6 flex justify-center">
            <button className="text-lg text-white bg-blue-500 px-5 py-2 rounded-full hover:bg-blue-700">
              Submit
            </button>
          </div>
        )}
      </div>
    </>
  );
}
