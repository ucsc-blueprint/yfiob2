import { db } from "./firebase";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

/**
 * Gets all the documents from any given firebase collection
 * @param {string} collectionName - The name of the firebase collection
 * @param {JSON} data - The json to be uploaded
 * @param {string} [documentName] - Optional custom name for the document (if not provided, Firebase will auto-generate an ID)
 */
export async function addData(collectionName, data, documentName) {
    try {
        let docRef;

        if (documentName) {
            // Use setDoc with custom document name
            docRef = doc(db, collectionName, documentName);
            await setDoc(docRef, data);
        } else {
            // Use addDoc to auto-generate ID
            docRef = await addDoc(collection(db, collectionName), data);
        }

        console.log("Document written with ID: ", docRef.id);
        return docRef; // Return the document reference
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}
