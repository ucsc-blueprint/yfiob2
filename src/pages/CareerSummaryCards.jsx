import React, { useEffect, useState } from "react";
import CareersCard from "../components/CareersCard/CareersCard";
import BackButton from "../assets/BackButton.svg";
import ForwardButton from "../assets/ForwardButton.svg";
import { Navbar } from "../components/Navbar";

const CareerSummaryCards = ({ CardData, Level }) => {
	const [color, setColor] = useState(["", "", ""]);

	useEffect(() => {
		switch (Level) {
			default:
				setColor(["#FFC273", "#FFE0B8", "#FF7022"]);
				break;
			case "middle":
				setColor(["#9AD7F8", "#EEEEEE", "#3FA1D9"]);
				break;
			case "high":
				setColor(["#B9E98E", "#EEEEEE", "#47B748"]);
				break;
		}
	}, [Level]);

	console.log(color);

	return (
		<div
			className={
				Level === "middle"
					? "bg-[#9AD7F8] font-lato h-[100vh]"
					: Level === "high"
					? "bg-[#B9E98E] font-lato h-[100vh]"
					: "bg-[#FFC273] font-lato h-[100vh]"
			}
		>
			<Navbar />
			<div className="px-10 flex flex-row justify-evenly pt-10 pb-3 items-center ">
				<div className="flex w-1/3 flex-row items-center">
					{/* back button */}
					<button className="flex items-center">
						<img src={BackButton} alt="<" />
						<p className="p-0 px-5">Click to Go Back</p>
					</button>
				</div>
				<div
					className={
						Level === "middle"
							? "bg-[#EEEEEE] w-1/3 p-3 flex justify-center items-center"
							: Level === "high"
							? "bg-[#EEEEEE] w-1/3 p-3 flex justify-center items-center"
							: "bg-[#FFE0B8] w-1/3 p-3 flex justify-center items-center"
					}
				>
					<div>
						<h1
							className={
								Level === "middle"
									? "text-[#3FA1D9] text-2xl"
									: Level === "high"
									? "text-[#47B748] text-2xl"
									: "text-[#FF7022] text-2xl"
							}
						>
							Agriculture and Natural Resources
						</h1>
					</div>
				</div>
				<div className="w-1/3 flex flex-row items-center justify-end">
					{/* forward button */}
					<button className="flex items-center">
						<p className="p-0 px-5 text-right">
							Click to move onto Building and Construction Trades
						</p>
						<img src={ForwardButton} alt=">" />
					</button>
				</div>
			</div>
			<div className="flex justify-center">
				<p>Click on any job for more details</p>
			</div>
			<div className="flex justify-center">
				<div className="flex-row flex flex-wrap justify-center">
					{CardData ? (
						CardData.map((data) => (
							<div key={data.title} className="p-4">
								<CareersCard
									title={data.title}
									description={data.description}
									headerColor={color[2]}
									isElementary={data.isElementary}
									careerImage={data.careerImage}
								/>
							</div>
						))
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default CareerSummaryCards;
