"use client"
import { CareersCardExpanded } from "../components/CareersCardExpanded";
import { Navbar } from "../components/Navbar/Navbar";
import { CareerSummaryCards } from "../pages/CareerSummaryCards";
import { db } from "../utils/firebase";
import { collection, where, query, getDocs } from "firebase/firestore";
import { useState } from "react";

function App() {
	const [careerData, setCareerData] = useState([]);
	const getFromFirebase = async () =>{ 
		let data = [];
		const res = await getDocs(query(collection(db, "careers"), where("industry", "==", "Fashion and Interior Design")));
		res.forEach((document) => {
			data.push(document.data().careers)
		})
		setCareerData(data)
	}

	getFromFirebase();

	return (
		<div className="bg-[#FFC273] h-[100vh]">
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
			 level="elementary"
			 Industry={"Fashion and Interior Design"}
			>
			</CareerSummaryCards>
		</div>
	);
}

export default App;
