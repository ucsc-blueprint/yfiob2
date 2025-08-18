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

export async function storeTopKIndustriesGuest(answers, k, grade){
    console.log("in function")
    console.log("in function")
    const industryReference  = collection(db, "userTopKIndustries")
    const addPromises = [];
    const submitReference = collection(db, "submissions")

    addPromises.push(
        addDoc(submitReference, { 
            username: "Guest",
            timestamp: serverTimestamp(),
            grade: grade
        })
    );

    const questionsRef = collection(db, "questions");
    const questionClassificationRef = collection(db, "questionClassification");

    //using batch reads to minimize number of queries to the database

    const allQuestions = {};
    const allQuestionDocs = await getDocs(questionsRef);
    for (const doc of allQuestionDocs.docs) {
        const data = doc.data();
        allQuestions[data.questionNumber] = data.questionCategory;
    }

    const allClassifications = {};
    const allClassificationDocs = await getDocs(questionClassificationRef);
    for (const doc of allClassificationDocs.docs) {
        const data = doc.data();
        const key = `${data.questionCategory}|${data.optionSelected}`;
        allClassifications[key] = data.industry;
    }

    const industries = {};

    const responses = answers;
    console.log(answers)

    for (const doc of responses.docs) {
        const questionData = doc.data();
        const questionFullNumber = questionData.questionNumber;
        const optionSelectedStr = (parseInt(questionData.optionSelected) + 1)
        const optionSelected = optionSelectedStr.toString();
        
        const questionNumber = questionFullNumber.split("-")[0];

        const category = allQuestions[questionNumber];
        const industryKey = `${category}|${optionSelected}`;
        const industry = allClassifications[industryKey];
        if (industry in industries) {
            industries[industry] += 1;
        } else {
            industries[industry] = 1;
        }
    }
console.log("in function")
    const arr = Object.entries(industries).sort((a, b) => b[1] - a[1]);
    if (k > arr.length) k = arr.length;

    let totalTopIndustryCount = 0;
    for (let i = 0; i < k; i++) {
        totalTopIndustryCount += arr[i][1];
    }

    for (let i = 0; i < k; i++) {
        console.log(
                username,
                arr[i][0],
                i,
                Number(((arr[i][1] / totalTopIndustryCount) * 100).toFixed(2))
        )
    }
    await Promise.all(addPromises);

    return;
}

export default async function storeTopKIndustries(username, k, grade) {
    const industryReference  = collection(db, "userTopKIndustries")
    const addPromises = [];
    const submitReference = collection(db, "submissions")

    addPromises.push(
        addDoc(submitReference, { 
            username: username,
            timestamp: serverTimestamp(),
            grade: grade
        })
    );

    const industriesFoundQuery = query(industryReference, where("username", "==", username));
    const industriesFound = await getDocs(industriesFoundQuery);
    for (const doc of industriesFound.docs) {
        const docRef = doc.ref;
        await deleteDoc(docRef);
    }

    const questionsRef = collection(db, "questions");
    const questionClassificationRef = collection(db, "questionClassification");
    
    //using batch reads to minimize number of queries to the database

    const allQuestions = {};
    const allQuestionDocs = await getDocs(questionsRef);
    for (const doc of allQuestionDocs.docs) {
        const data = doc.data();
        allQuestions[data.questionNumber] = data.questionCategory;
    }

    const allClassifications = {};
    const allClassificationDocs = await getDocs(questionClassificationRef);
    for (const doc of allClassificationDocs.docs) {
        const data = doc.data();
        const key = `${data.questionCategory}|${data.optionSelected}`;
        allClassifications[key] = data.industry;
    }

    console.log(allQuestions);
    console.log(allClassifications);

    const industries = {};

    const userResponsesRef = collection(db, "userResponses");
    const responseRef = query(userResponsesRef, where("username", "==", username));
    const responses = await getDocs(responseRef);

    console.log(responses);

    for (const doc of responses.docs) {
        const questionData = doc.data();
        const questionFullNumber = questionData.questionNumber;
        const optionSelectedStr = (parseInt(questionData.optionSelected) + 1)
        const optionSelected = optionSelectedStr.toString();
        
        const questionNumber = questionFullNumber.split("-")[0];

        const category = allQuestions[questionNumber];
        const industryKey = `${category}|${optionSelected}`;
        const industry = allClassifications[industryKey];
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

    for (let i = 0; i < k; i++) {
        addPromises.push(
            addDoc(industryReference, { 
                username,
                industry: arr[i][0],
                ranking: i,
                percentage: Number(((arr[i][1] / totalTopIndustryCount) * 100).toFixed(2))
            })
        );
    }
    await Promise.all(addPromises);
}



export async function getTopKIndustries(username){
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
    const careersFoundQuery = query(collection(db, "careers"), where("industry", "==", industry));
    const careersFound = await getDocs(careersFoundQuery);
    const careers = [];

    for (const doc of careersFound.docs) {
        const data = doc.data();
        careers.push(data.careers);
    }
    return careers;
}

