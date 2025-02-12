import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

/**
 * Gets all the doccuments from any given firebase collection
 * @param {string} collectionName - The name of the firebase collection
 * @param {JSON} data - The json to be uploaded
 */
export default async function addData(collectionName, data) {
	try {
		const docRef = await addDoc(collection(db, collectionName), data);
		console.log("Document written with ID: ", docRef.id);
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}
