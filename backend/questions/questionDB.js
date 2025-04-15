import { db } from "../firebaseConfig.js";
import { collection, getDocs, query, where, limit, addDoc, updateDoc} from "firebase/firestore";

async function storeQuestion(username, questionNumber, questionResponse){
    /*
    1) check if there is an existing document where 
    questionNumber of that document equals the parameter to this function
    2) If a document is found, update the questionResponse to the parameter to this function. 
    Update this document.
    3) If not, then create a brand new document with the data in the parameters to this function.
    Append this new document to the collection
    */
   

    //1)
    const responsesReference = collection(db, "userResponses")
    
    const q = query(
        responsesReference, 
        where("username", '==', username), 
        where("questionNumber", "==", questionNumber),
        limit(1)
    );

    
    const docs = await getDocs(q);

    if(docs.docs.length > 0){
        console.log(docs.docs[0].data());

        docs.docs[0].data().questionResponse = Number(questionResponse);
        // update the document
        const docRef = docs.docs[0].ref;
        const updatedDoc = await updateDoc(docRef, {
            questionResponse: Number(questionResponse)
        });
        
    }else{
        console.log("not found")
        // create a new document
        const newDoc = addDoc(responsesReference, { 
            username: username,
            questionNumber: Number(questionNumber),
            questionResponse: Number(questionResponse)
        });
    }    
}

async function getAllResponses(username){

    console.log("Hello world")
    const responsesReference = collection(db, "userResponses")

    const q = query(
        responsesReference, 
        where("username", '==', username), 
    );

    const docs = await getDocs(q);
    console.log("Number of docs: ", docs.docs.length());

    return docs.docs.map((doc) => {
        return doc.data();
    });
}

async function getResponse(username, questionNumber){
    const responsesReference = collection(db, "userResponses")

    const q = query(
        responsesReference, 
        where("username", '==', username), 
        where("questionNumber", "==", questionNumber),
        limit(1)
    );
    
    const docs = await getDocs(q);

    return docs.docs[0].data();
}

getResponse("Akshay", 1);





