import * as fs from 'fs';
import { parse } from "csv-parse";

import { db } from "../firebaseConfig.js";
import { addDoc, collection } from "firebase/firestore";

const ref = collection(db, "questionClassification");
fs.createReadStream("./data.csv")
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data", function (row) {
    console.log(row);
    addQuestionClassificationRow(row);
  })


function addQuestionClassificationRow(row){
    addDoc(ref, {"questionCategory": row[0], "optionSelected": row[1], "industry": row[2]}).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })

}