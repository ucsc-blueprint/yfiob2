"use client";

import { use, useEffect, useState } from "react";
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
    const [username, setUsername] = useState("Guest");
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsername(user.email);
                console.log("User is signed in:", username);
            }
        });
    }, [auth, username]);

    const searchParams = useSearchParams();
    const isValid = searchParams.get('valid') === 'true';
    const [isLoading, setIsLoading] = useState(false);

    // If not a valid session, redirect to choose-account-type
    useEffect(() => {
        if (!isValid) {
            router.push(`/choose-account-type?grade=${grade}`)
        }
    }, [isValid, router, grade]);

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
        const getData = async () => {
            const data = await getAllResponses(username);
            mergeWithState(data);
            return data;
        };
        getData().then((res) => {
            console.log(res);
        });
    }, [username]);

    function mergeWithState(data) {
        for (const responseObj of data) {
            const answerStr = responseObj["questionNumber"];
            const answerStrSplit = answerStr.split("-");
            const questionNum = answerStrSplit[0];
            const randomQuestionNum = parseInt(answerStrSplit[1]);
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
        const insertData = async () => {
            await storeResponse(username, questionId, value);
        };
        insertData();

        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: value,
        }));
    }

    function handleSubmit() {
        setIsLoading(true);
        storeTopKIndustries(username, 3, grade).then(() => {
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
        "elementary-school": "bg-[#9AD7F8]",
        "middle-school": "bg-[#BAE98E]",
        "high-school": "bg-[#FFC273]",
    };
    const color = gradeColor[grade] || "blue";

    // creates a unique ID for each question
    const currentQuestionId = `${questionNum}-${savedRandomNums[questionNum] ?? randomNum}`;

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
                <div className="font-kumbh text-[40px] py-10">Career Quiz</div>
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
                    <div className="mt-2 text-sm text-gray-500">
                        Matching with careers...
                    </div>
                )}
                {questionNum === questionsForLevel.length - 1 && (
                    <div className="mt-6 flex flex-col justify-center">
                        <button onClick={handleSubmit} className="text-lg text-white bg-blue-500 px-5 py-2 rounded-full hover:bg-blue-700">
                            Submit
                        </button>
                        
                    </div>
                )}
            </div>
        </>
    );
}