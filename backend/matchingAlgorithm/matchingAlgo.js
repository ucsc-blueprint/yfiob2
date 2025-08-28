/*
input: username

output: array of k-highest matching industries

algorithm:
1) initialize a JSON object to store the industries and their scores

2) get all question responses of the user from the database
3) initialize a reference to the question classification collection in the database
4) initalize a reference to the questions collection in the database to get the question category
5) iterate through each response

6a) for each response, get the question category and the selected option
6b) get the industry of the selected option from the database based on the question category and selected option
6c) increment the score of the industry by 1 in the JSON object
6d) if the industry is not in the JSON object, initialize it with a score of 1

7) add the key/value pairs of the json to a list
8) get the k-highest elements from the list and return them as an array of industries
9) return the array of industries
*/

//import { db } from "../firebase.js";
import {db} from "../../src/utils/firebase.js";
import { collection, getDocs, query, where, addDoc, deleteDoc, orderBy, serverTimestamp} from "firebase/firestore";
import { CAREERS, ALL_QUESTIONS, ALL_CLASSIFICATIONS } from "./constants.js";

const loadFromLocalStorage = () => {
    const storedAnswers = localStorage.getItem("answers");
    if (storedAnswers) {
        return JSON.parse(storedAnswers);
    }
    return null;
}

const getQuestionsFromFirebase = async (username) => {
    const userResponsesRef = collection(db, "userResponses");
    const responseRef = query(userResponsesRef, where("username", "==", username));
    const responses = await getDocs(responseRef);

    const questions = [];
    responses.forEach((doc) => {
        const data = doc.data();
        const questionNum = data.questionNumber.split("-")[0];
        questions[questionNum] = data.optionSelected;
    });
    return questions;
}

export default async function storeTopKIndustries(username, k, grade = "", collegeAnswer = "") {
    const industryReference  = collection(db, "userTopKIndustries");
    const addPromises = [];
    const submitReference = collection(db, "submissions");

    const submissionData = { 
        username: username,
        timestamp: serverTimestamp(),
        grade: grade,
    };

    if (collegeAnswer) {
        submissionData["readyForCollege"] = collegeAnswer;
    }

    try {
        addPromises.push(
            addDoc(submitReference, submissionData)
        );
    } catch (error) {
        console.error("Error adding submission:", error);
    }

    try {
        const industriesFoundQuery = query(industryReference, where("username", "==", username));
        const industriesFound = await getDocs(industriesFoundQuery);
        for (const doc of industriesFound.docs) {
            const docRef = doc.ref;
            try {
                await deleteDoc(docRef);
            } catch (error) {
                console.error("Error deleting document:", error);
            }
        }
    } catch (error) {
        console.error("Error querying/deleting industries:", error);
    }

    const industries = {};

    let responses = null;
    try {
        const responsesLocal = loadFromLocalStorage();
        responses = responsesLocal ? responsesLocal : await getQuestionsFromFirebase(username);
    } catch (error) {
        console.error("Error loading responses:", error);
        responses = [];
    }

    if (!responses || responses.length === 0) {
        console.warn("No responses found, skipping industry calculation.");
        return;
    }

    for (let questionNumber = 0; questionNumber < responses.length; questionNumber++) {
        const optionSelected = (responses[questionNumber] + 1).toString();
        const category = ALL_QUESTIONS[questionNumber];

        const industryKey = `${category}|${optionSelected}`;
        const industry = ALL_CLASSIFICATIONS[industryKey];

        if (industry in industries) {
            industries[industry] += 1;
        } else {
            industries[industry] = 1;
        }
    }

    const arr = Object.entries(industries).sort((a, b) => b[1] - a[1]);
    if (k > arr.length) k = arr.length;

    let totalTopIndustryCount = 0;
    for (let i = 0; i < k; i++) {
        totalTopIndustryCount += arr[i][1];
    }

    const localIndustries = [];

    for (let i = 0; i < k; i++) {
        try {
            addPromises.push(
                addDoc(industryReference, { 
                    username,
                    industry: arr[i][0],
                    ranking: i,
                    percentage: Number(((arr[i][1] / totalTopIndustryCount) * 100).toFixed(2))
                })
            );

            localIndustries.unshift({
                industry: arr[i][0],
                ranking: i,
                percentage: Number(((arr[i][1] / totalTopIndustryCount) * 100).toFixed(2))
            });
        } catch (error) {
            console.error("Error adding industry doc:", error);
        }
    }
    console.log("Local Industries:", localIndustries);
    localStorage.setItem("topKIndustries", JSON.stringify(localIndustries));

    try {
        await Promise.all(addPromises);
    } catch (error) {
        console.error("Error awaiting addPromises:", error);
    }
}



export async function getTopKIndustries(username){
    const localIndustries = localStorage.getItem("topKIndustries");
    if (localIndustries){
        return JSON.parse(localIndustries).map(industry => [industry.industry, industry.percentage]);
    }
    if (username === "Guest") {
        return [];
    }
    const industriesFoundQuery = query(collection(db, "userTopKIndustries"), where("username", "==", username), orderBy("percentage"));
    const industriesFound = await getDocs(industriesFoundQuery);
    const industries = [];

    for (const doc of industriesFound.docs) {
        const data = doc.data();
        industries.push([data.industry, data.percentage]);
    }
    console.log(industries);
    return industries;
}

export async function getCareersForIndustry(industry){
    return CAREERS[industry] || [];
}