"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "../../../components/Navbar/Navbar.jsx";
import { QuestionCard } from "../../../components/QuestionCard/QuestionCard.jsx";
import BackArrow from "../../../components/BackArrow.jsx";
import ForwardArrow from "../../../components/ForwardArrow.jsx";
import questions from "../../../../questions.json";
import { getAllResponses, storeResponse } from "../../../../backend/questions/questionDB.js";
import storeTopKIndustries from "../../../../backend/matchingAlgorithm/matchingAlgo.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function getQuestions(educationLevel) {
    const parsed = Object.values(questions);
    return parsed[educationLevel];
}

export default function QuizClient({ grade }) {
    
    const router = useRouter();
    
    const auth = getAuth();
    const [username, setUsername] = useState(null);


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsername(user.email);
                console.log("User is signed in:", username);
            } else{
                setUsername("Guest");
            }
        });
    }, [auth, username]);

    const searchParams = useSearchParams();
    const isValid = searchParams.get("valid") === "true";
    const [isLoading, setIsLoading] = useState(false);
    const isInterestCollege = searchParams.get("collegeInterest") === "Yes" || searchParams.get("collegeInterest") === "Maybe";
    
    // If not a valid session, redirect to choose-account-type
    useEffect(() => {
        if (!isValid) {
            router.push(`/choose-account-type?grade=${grade}`);
        }
    }, [isValid]);

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


    const localStorageAnswers = localStorage.getItem("answers");
    const localStorageArray = localStorageAnswers 
        ? JSON.parse(localStorageAnswers) 
        : Array(questionsForLevel.length).fill(-1);

    if (!localStorageAnswers) {
        localStorage.setItem("answers", JSON.stringify(localStorageArray));
    }

    const randomNum =
        savedRandomNums[questionNum] ??
        Math.floor(Math.random() * questionsForLevel[questionNum].sub_questions.length);

    useEffect(() => {
        if (savedRandomNums[questionNum] === undefined) {
            setSavedRandomNums((prev) => ({
                ...prev,
                [questionNum]: randomNum,
            }));
        }
    }, [questionNum, randomNum, savedRandomNums]);

    useEffect(() => {
        if (!username) return;

        const getData = async () => {
            const data = await getAllResponses(username);
            if (data.length > 0){
                mergeWithState(data);  
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            return data;
        };
        getData().then((res) => {
            console.log(res);
        });
    }, [username]);

    function mergeWithState(data) {
        for (const responseObj of data) {
            const answerStr = responseObj["questionNumber"];
            const [questionNum, randomQuestionNum] = answerStr.split("-");

            setSavedRandomNums((prev) => ({
                ...prev,
                [questionNum]: randomQuestionNum,
            }));

            setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [answerStr]: responseObj["optionSelected"],
            }));
        }
    }

    function handleAnswerSelect(value, questionId) {
        const questionNum = parseInt(questionId.split("-")[0]);

        const insertData = async () => {       
            localStorageArray[questionNum] = value;   
            localStorage.setItem("answers", JSON.stringify(localStorageArray));
            storeResponse(username, questionId, value);
            console.log(localStorage.getItem("answers"));
        };
        
        
        insertData();
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: value,
        }));
    }

    function handleSubmit() {
        setIsLoading(true);
        storeTopKIndustries(username, 3, grade, isInterestCollege).then(() => {
            router.replace(`/results/?grade=${grade}`);
        });
    }

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
                    onAnswerSelect={(answer) => handleAnswerSelect(answer, questionId)}
                    grade={grade}
                />
            );
        })
    );

    const gradeColor = {
        "elementary-school": "bg-[#A8DEED]",
        "middle-school": "bg-[#B8CB71]",
        "high-school": "bg-[#FFD85F]",
    };
    const color = gradeColor[grade] || "blue";

    // creates a unique ID for each question
    const currentQuestionId = `${questionNum}-${savedRandomNums[questionNum] ?? randomNum}`;
    const allAnswered = localStorageArray.every(ans => ans !== -1);

    return (
        <>
            {/* Navbar sits on top */}
            <div className="relative z-10">
                <Navbar />
            </div>
            {/* full‐screen background under the navbar */}
            <div
                className={`
          fixed
          left-0 right-0
          top-16
          bottom-0
          ${color}
          z-0
          flex flex-col justify-center items-center
        `}
            >
                <div className="font-primary text-[40px] py-10">Career Quiz</div>
                <div className="flex items-center">
                    <button
                        className="mr-10"
                        onClick={() => questionNum > 0 && setQuestionNum((n) => n - 1)}
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
                                grade={grade}
                                onAnswerSelect={(answer) =>
                                    setAnswers((prev) => ({
                                        ...prev,
                                        [currentQuestionId]: answer,
                                    }))
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

                {isLoading && (
                    <div className="mt-2 text-sm text-gray-500">Matching with careers...</div>
                )}
                {allAnswered && (
                    <div className="mt-6 flex flex-col justify-center">
                        <button
                            onClick={handleSubmit}
                            className="text-lg text-white bg-blue-500 px-5 py-2 rounded-full hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
