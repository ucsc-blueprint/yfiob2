"use client";

import { useEffect, useRef, useState } from "react";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import addData from "../../../utils/addData";
import getData from "../../../utils/getData";
import deleteData from "../../../utils/deleteData";
import JobPopup from "../../../components/JobPopup";
import Jobs from "./../../../../constants/CareerGroups.json"
// import upArrow from "./upArrow.svg";
// import downArrow from "./downArrow.svg";


function parseJobs(jobData) {
	let jobs = {};
	let final = [];
	for (let i = 0; i < jobData.length; i++) {
		let job = jobData[i].data;

		if (!job.industry || !job.careers) {
			continue;
		}

		// Initialize the industry if it doesn't exist
		if (!jobs[job.industry.toString()]) {
			jobs[job.industry.toString()] = { name: job.industry.toString() };
		}

		jobs[job.industry.toString()][job.careers.toString()] = {
			name: job.careers,
			description: job.description,
			experienceRequired: job.experienceRequired,
			salary: job.salary,
			photos: job.photos,
			industry: job.industry,
			id: jobData[i].id,
		};
	}

	for (let i in jobs) {
		let industryArr = { name: i, jobs: [] };
		for (let j in jobs[i]) {
			industryArr.jobs.push(jobs[i][j]);
		}
		final.push(industryArr);
	}

	return final;
}

function Page() {
	const [jobData, setJobData] = useState(null);
	const [open, setOpen] = useState([]);
	const [popupOpen, setPopupOpen] = useState(false);
	const openRef = useRef(null);

	async function addJob(
		name,
		description,
		experienceRequired,
		salary,
		photos,
		industry
	) {
		console.log({
			careers: name,
			description: description,
			experienceRequired: experienceRequired,
			salary: salary,
			photos: photos,
			industry: industry,
		});
		addData("careers", {
			careers: name,
			description: description,
			experienceRequired: experienceRequired,
			salary: salary,
			photos: photos,
			industry: industry,
		});
		const newData = await getData("careers").then((data) => parseJobs(data));
		setJobData(newData);
	}

	function JobItem({ job }) {
		return (
			<div key={job.id}>
				<div className="flex" id={job.name}>
					<div className="flex">
						<p>ICON</p>
						<p>{job.name}</p>
					</div>
					<div className="flex ml-auto">
						<button>EDIT&nbsp;</button>
						<button
							onClick={async () => {
								await deleteData("careers", job.id);
								const newData = await getData("careers").then((data) =>
									parseJobs(data)
								);
								setJobData(newData);
							}}
						>
							DELETE
						</button>
					</div>
				</div>
			</div>
		);
	}

	function JobContainer({ children, name }) {
		const toggled = open.includes(name);
		return (
			<div>
				<div 
					className="w-full flex bg-[#185D6D1A] p-2"
					onClick={() => {
								if (open.includes(name)) {
									setOpen(open.filter((t) => t !== name));
								} else {
									setOpen([...open, ...[name]]);
								}
							}}>
					<button
						
						
					>
						{toggled ? "^" : "▼"}
					</button>
					{/* Job Titles - # of jobs */}
					<div> {name} </div>
					<button
						
						className="ml-auto text-[#185D6D] border rounded-md p-2 border-[#185D6D] hover:bg-[#185D6D1A] hover:text-[#185D6D] active:bg-[#185D6D1A] active:text-[#185D6D]"
					>
						+ Add job
					</button>
				</div>

				<div>{toggled ? children : null}</div>
			</div>
		);
	}

	

	useEffect(() => {
		fetch("./../../../../constants/CareerGroups.json")
			.then((res) => res.json())
			.then((data) => {
				const parsed = transformJobJSON(data);
				setJobData(parsed);
			});
	}, []);
	
	return !jobData ? (
		<></>
	) : (
		<>
			<JobPopup
				openRef={openRef}
				isOpen={popupOpen}
				onClose={() => {
					setPopupOpen(false);
				}}
				onSubmit={(data) => {
					addJob(
						data.name,
						data.description,
						data.experience,
						data.salary,
						"TODO",
						data.industry
					);
				}}
			/>
			<AdminNavbar />
			<div className="flex justify-center">
				<div className="w-[80vw] h-[100vw]">

					<div className="flex items-center">


						
							<svg width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M3 38.5C2.2 38.5 1.5 38.2 0.9 37.6C0.3 37 0 36.3 0 35.5V11.5C0 10.7 0.3 10 0.9 9.4C1.5 8.8 2.2 8.5 3 8.5H12V3.5C12 2.7 12.3 2 12.9 1.4C13.5 0.8 14.2 0.5 15 0.5H25C25.8 0.5 26.5 0.8 27.1 1.4C27.7 2 28 2.7 28 3.5V8.5H37C37.8 8.5 38.5 8.8 39.1 9.4C39.7 10 40 10.7 40 11.5V35.5C40 36.3 39.7 37 39.1 37.6C38.5 38.2 37.8 38.5 37 38.5H3ZM3 35.5H37V11.5H3V35.5ZM15 8.5H25V3.5H15V8.5Z" fill="#1C1B1F"/>
							</svg>
						

						<div className="ml-4">
							<h1 className="text-[36px] font-bold">Jobs</h1>
							<p className="text-[20px]">Students are recommended job sectors, which contain individual jobs.</p>
						</div>
						

					</div>
					<div className="">
						{jobData.map((industry, index) => {
							return (
								<JobContainer key={index} name={industry.name}>
									{industry.jobs.map((job) => {
										if (job.name) {
											return <JobItem key={job.id} job={job} />;
										} else {
											return <></>;
										}
									})}
								</JobContainer>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}

export default Page;
