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


const allQuestions = {
  '0': 'physical',
  '1': 'observe',
  '2': 'creative',
  '3': 'teach',
  '4': 'lead',
  '5': 'engineer'
}
const allClassifications = {
  'physical|5': 'Building and Construction Trades',
  'creative|3': 'Hospitality, Tourism, and Recreation',
  'teach|1': 'Energy, Environment and Utilities',
  'teach|5': 'Hospitality, Tourism, and Recreation',
  'physical|4': 'Fashion and Interior Design',
  'creative|5': 'Fashion and Interior Design',
  'lead|5': 'Manufacturing and Product Development',
  'physical|3': 'Energy, Environment, and Utilities',
  'engineer|3': 'Agriculture and Natural Resources',
  'observe|4': 'Agriculture and Natural Resources',
  'teach|4': 'Business and Finance',
  'lead|1': 'Agriculture and Natural Resources',
  'observe|3': 'Health Science and Medical Technology',
  'lead|3': 'Fashion and Interior Design',
  'physical|1': 'Information and Communication Technologies',
  'physical|2': 'Hospitatility, Tourism, and Recreation',
  'engineer|2': 'Information and Communication Technologies',
  'creative|1': 'Building and Construction Trades',
  'teach|3': 'Building and Construction Trades',
  'observe|1': 'Information and Communication Technologies',
  'engineer|1': 'Arts, Media and Entertainment',
  'creative|2': 'Agriculture and Natural Resources',
  'teach|2': 'Public Services',
  'engineer|5': 'Engineering and Architecture',
  'engineer|4': 'Marketing, Sales, and Service',
  'lead|4': 'Arts, Media, and Entertainment',
  'observe|2': 'Arts, Media and Entertainment',
  'creative|4': 'Marketing, Sales, and Service',
  'lead|2': 'Health Science and Medical Technology',
  'observe|5': 'Engineering and Architecture'
}

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
    const industryReference  = collection(db, "userTopKIndustries")
    const addPromises = [];
    const submitReference = collection(db, "submissions")

    const submissionData = { 
        username: username,
        timestamp: serverTimestamp(),
        grade: grade,
    }

    if (collegeAnswer) {
        submissionData["readyForCollege"] = collegeAnswer;
    }
    addPromises.push(
        addDoc(submitReference, submissionData)
    );

    const industriesFoundQuery = query(industryReference, where("username", "==", username));
    const industriesFound = await getDocs(industriesFoundQuery);
    for (const doc of industriesFound.docs) {
        const docRef = doc.ref;
        await deleteDoc(docRef);
    }


    const industries = {};

    const responsesLocal = loadFromLocalStorage();
    const responses =  responsesLocal ? responsesLocal : await getQuestionsFromFirebase(username);
    console.log(responses);

    for (let questionNumber = 0; questionNumber < responses.length; questionNumber++) {
        const optionSelected = (responses[questionNumber] + 1).toString();
        const category = allQuestions[questionNumber];

        const industryKey = `${category}|${optionSelected}`;
        const industry = allClassifications[industryKey];
        console.log(`Question: ${questionNumber}, Option: ${optionSelected}, Industry: ${industry}`);

        if (industry in industries) {
            industries[industry] += 1;
        } else {
            industries[industry] = 1;
        }
    }
    console.log(industries);

    const arr = Object.entries(industries).sort((a, b) => b[1] - a[1]);
    if (k > arr.length) k = arr.length;

    let totalTopIndustryCount = 0;
    for (let i = 0; i < k; i++) {
        totalTopIndustryCount += arr[i][1];
    }
    console.log(arr);

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

storeTopKIndustries("b@a.com", 3, "high-school", "yes")