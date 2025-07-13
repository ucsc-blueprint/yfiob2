import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Gets all the doccuments from any given firebase collection
 * @param {string} collectionName - The name of the firebase collection
 * @param {JSON} docId - The id of the document to be deleted
 */
export default async function deleteData(collectionName, docId) {
    try {
        await deleteDoc(doc(db, collectionName, docId));
        console.log("Document deleted");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
