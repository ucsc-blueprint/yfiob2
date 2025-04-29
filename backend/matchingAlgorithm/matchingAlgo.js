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

// import { db } from "../../src/utils/firebase.js";
import { db } from "../firebaseConfig.js";
import { collection, getDocs, addDoc } from "firebase/firestore";

async function storeTopKIndustries(username, k) {
    // Step 1: Initialize a JSON object to store the industries and their scores
    const industries = {};

    // Step 2: Get all question responses of the user from the database
    const userResponsesRef = collection(db, "userResponses");
    const responseRef = query(userResponsesRef, where("username", "==", username));
    const responses = await getDocs(responseRef);

    // Step 3: Initialize a reference to the question classification collection in the database
    const questionClassificationRef = collection(db, "questionClassification");

    // Step 4: Initialize a reference to the questions collection in the database to get the question category
    const questionsRef = collection(db, "questions");

    // Step 5: Process each response
    for (const doc of responses.docs) {
        const questionData = doc.data();
        const questionNumber = questionData.questionNumber;
        const optionSelected = questionData.optionSelected;

        // Step 6a: Get the question category
        const categoryQuery = query(questionsRef, where("questionNumber", "==", questionNumber));
        const categoryDocs = await getDocs(categoryQuery);

        for (const categoryDoc of categoryDocs.docs) {
            const categoryData = categoryDoc.data();
            const category = categoryData.questionCategory;

            // Step 6b: Get the industry of the selected option
            const industryQuery = query(
                questionClassificationRef,
                where("questionCategory", "==", category),
                where("optionSelected", "==", optionSelected.toString())
            );
            const industryDocs = await getDocs(industryQuery);

            for (const industryDoc of industryDocs.docs) {
                const industryData = industryDoc.data();
                const industry = industryData.industry;

                // Step 6c: Increment the score of the industry
                if (industry in industries) {
                    industries[industry] += 1;
                } else {
                    industries[industry] = 1;
                }
            }
        }
    }
    const arr = Object.entries(industries)

    insertionSort(arr);
    
    if(k > arr.length) {
        k = arr.length;
    }

    const industryReference  = collection(db, "userTopKIndustries")

    //saving the top k industries to the database
    for(let i = 0; i < k; i++){
        //store the industry at this index (arr[i][0]) and store the ranking (which is i)
        addDoc(industryReference, { 
            username: username,
            industry: arr[i][0],
            ranking: Number(i)
        });
    }
}

// Step 7: Return the sorted industries object
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++){
        const current = arr[i];
        const currentVal = current[1];
        let j = i - 1;
        while (j >= 0 && arr[j][1] > currentVal){
            arr[j + 1] = arr[j]
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
}

storeTopKIndustries("Akshay", 2)