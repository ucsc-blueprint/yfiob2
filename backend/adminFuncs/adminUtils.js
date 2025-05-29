import {db} from "../../src/utils/firebase.js"
import { collection, getDocs, query, where, addDoc, deleteDoc, orderBy} from "firebase/firestore";

export async function getAllIndustries(){
    const industriesFoundQuery = query(collection(db, "userTopKIndustries"));
    const industriesFound = await getDocs(industriesFoundQuery);
    const industries = {};
    var total = 0; 
    for (const doc of industriesFound.docs) {
        total += 1;
        const data = doc.data();
        const industry = data.industry;
        if(industry in industries){
            industries[industry] += 1;
        }else{
            industries[industry] = 1;
        }
    }

    for (const key in industries){
        industries[key] = ((industries[key] / total) * 100).toFixed(2); 
    }
    
    const industriesArr = Object.entries(industries).sort();
    return industriesArr;
}

// Checks  if the user is an admin
export async function checkIsAdmin(email){
    const responsesReference = collection(db, "users")
    const q = query(
        responsesReference, 
        where("email", '==', email), 
    );
    // Returns array of users answer chocies
    const docs = await getDocs(q);
    return docs.docs[0].data().isAdmin;
}
