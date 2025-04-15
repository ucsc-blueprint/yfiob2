import { db } from "../firebaseConfig.js";
import { collection, getDocs, query, where, limit, addDoc} from "firebase/firestore";

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
    if(!docs.empty){
        console.log(docs.docs[0].data());
        
    }else{
        console.log("not found")
        // create a new document
        const newDoc = addDoc(responsesReference, { 
            username: username,
            questionNumber: Number(questionNumber),
            questionResponse: Number(questionResponse)
        });
    }
    
    
    //console.log("Docs: ", docs.get())
    
}

async function getAllResponses(username){
    /*
      1) 
    */
}

async function getResponse(username, questionNumber){

}


storeQuestion("Akshay", 2, 5);




