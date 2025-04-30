import { Careers } from "../../constants/CAREERS.js";

import { db } from "../../src/utils/firebase.js";
import { addDoc, collection } from "firebase/firestore";

async function operate(tableName, industryAttribute) {
    const ref = collection(db, tableName);
    for(const industry in Careers){
        const arr = Careers[industry][industryAttribute];

        for(const val of arr){ 
            //console.log(industry + " = " + val);
            
            
            addDoc(ref, {"industry": industry, [industryAttribute]: val}).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
            
            
        }
    }
}

const tableName = "companies"
const tableAttributeCareersJSON = "companies"
operate(tableName, tableAttributeCareersJSON)
