"use client"
import { CareerSummaryCards } from "../../pages/CareerSummaryCards";
import { db } from "../../utils/firebase";
import { collection, where, query, getDocs } from "firebase/firestore";
import { useState } from "react";

export default function ExploreCareersPage() {
    const INDUSTRIES = ['Agriculture and Natural Resources',
          'Energy and Utilities',
          'Arts, Media, and Entertainment',
          'Skilled Trades',
          'Engineering and Design Industry',
          'Education, Child Development, and Family Services',
          'Psychology',
          'Ecology & Environmental',
          'Health Science and Medical Technology',
          'Research & Academia',
          'Hospitality, Tourism, and Recreation',
          'Information Technology',
          'Manufacturing and Product Development',
          'Marketing, Sales, and Service',
          'Aviation',
          'Supply Chain',
          'Law, Law Enforcement',
          'Finance and Business',
          'Public Services',
          'Fashion and Interior Design',
          'Building Trades and Construction',
          'Transportation']

          
    
    const [ind, setInd] = useState(0)
	const [careerData, setCareerData] = useState([]);
	const getFromFirebase = async () =>{ 
		let data = [];
		const res = await getDocs(query(collection(db, "careers"), where("industry", "==", INDUSTRIES[ind])));
		res.forEach((document) => {
			data.push(document.data().careers)
		})
		setCareerData(data)
	}

	getFromFirebase();

	return (
		<div className="bg-[#FFC273] h-full">
			<CareerSummaryCards
			 CardData=
			 {
				careerData.map((career) => (
					{
						title: career,
						description: "",
						iselementary: true, 
				  		careerimage: "jignaSmall.png"
					}
				))
			 }
			 level="high"
			 Industry={INDUSTRIES[ind]}
             Index={ind}
             SetIndex={setInd}
             TotalIndustries = {INDUSTRIES.length}
			>
			</CareerSummaryCards>
		</div>
	);
}