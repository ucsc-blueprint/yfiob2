import { db } from "../../src/utils/firebase.js";
import { collection, getDocs, query, where, limit, addDoc, updateDoc} from "firebase/firestore";

export async function storeResponse(username, questionNumber, questionResponse){
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
        const docRef = docs.docs[0].ref
        updateDoc(docRef, {
            optionSelected: Number(questionResponse)
        })
        
    }else{
        addDoc(responsesReference, { 
            username: username,
            questionNumber: questionNumber,
            optionSelected: Number(questionResponse)
        });
    }
    
}

export async function getAllResponses(username){
    const responsesReference = collection(db, "userResponses")

    const q = query(
        responsesReference, 
        where("username", '==', username), 
        
    );

    // Returns array of users answer chocies
    const docs = await getDocs(q);
    const res = docs.docs.map((doc) => {
        return doc.data()
    })
    return res;
}



export async function getResponse(username, questionNumber){
    const responsesReference = collection(db, "userResponses")
    
    const q = query(
        responsesReference, 
        where("username", '==', username), 
        where("questionNumber", "==", questionNumber),
        limit(1)
    );

    
    const docs = await getDocs(q);
    if(!docs.empty){
        const docRef = docs.docs[0].ref
        return docs.docs[0].data()
    }else{
        return null
    }
}

export async function deleteAllResponses(username, questionNumber){
    const responsesReference = collection(db, "userResponses")

    const q = query(
        responsesReference, 
        where("username", '==', username), 
        where("questionNumber", "==", questionNumber)
    );

    const docs = await getDocs(q);
    const batch = writeBatch(db);
    docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();
}



