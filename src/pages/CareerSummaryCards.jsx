"use client";
import React, { useEffect, useState } from "react";
import CareersCard from "../components/CareersCard.jsx";
import { Navbar } from "../components/Navbar/Navbar.jsx";
import BackArrow from "../components/BackArrow.jsx"
import ForwardArrow from "../components/ForwardArrow.jsx";

export const CareerSummaryCards = ({ Industry, CardData, Level, Index, SetIndex, TotalIndustries}) => {
	const [color, setColor] = useState(["", "", ""]);

	function handleLeftClick(){
        if (Index > 0){
            SetIndex(Index - 1)
        }
    }

    function handleRightClick(){
        if (Index < TotalIndustries - 1){
        	SetIndex(Index + 1);
        }
    }

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
			<div className="px-10 flex flex-row justify-evenly pt-10 pb-3 items-center ">
				<div className="flex w-1/3 flex-row items-center">
					{/* back button */}
					<button className="flex items-center" onClick={handleLeftClick}>
						<BackArrow />
						{/* <img aria-label="go back to careers page" src={BackButton} alt="<" /> */}
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
							{Industry}
						</h1>
					</div>
				</div>
				<div className="w-1/3 flex flex-row items-center justify-end">
					{/* forward button */}
					<button className="flex items-center" onClick={handleRightClick}>
						<p className="p-0 px-5 text-right">
							Click to go forward
						</p>
						<ForwardArrow />
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

	