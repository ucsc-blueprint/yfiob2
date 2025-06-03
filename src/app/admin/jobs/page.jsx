"use client";

import { useEffect, useRef, useState } from "react";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import addData from "../../../utils/addData";
import getData from "../../../utils/getData";
import deleteData from "../../../utils/deleteData";
import JobPopup from "../../../components/JobPopup";
import Suitcase from "../../../assets/suitcase.svg"

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
				<div className="flex bg-red-800 border-amber-600" id={job.name}>
					<div className="flex">
						<p>ICON</p>
						<p>{job.name}</p>
					</div>
					<div className="flex ml-auto">
						<button>EDIT</button>
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
				<div className="w-full bg-[#185D6D1A] text-[20px] flex my-8">
					<button
						onClick={() => {
							if (open.includes(name)) {
								setOpen(open.filter((t) => t !== name));
							} else {
								setOpen([...open, ...[name]]);
							}
						}}
					>
						{toggled ? "^" : ">"}
					</button>
					<div>{name}</div>
					<button
						onClick={() => {
							openRef.current = name;
							setPopupOpen(true);
						}}
						className="ml-auto text-[#072b33] font-extralight border-[#185d6d] px-5 rounded-md border-[2px]"
					>
						+ Add job
					</button>
				</div>

				<div>{toggled ? children : null}</div>
			</div>
		);
	}

	useEffect(() => {
		getData("careers").then((data) => {
			setJobData(parseJobs(data));
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
				<div className="w-[80vw] outline outline-black h-[100vw]">
					<div className="flex gap-2 mt-20">
						<img src="/assets/suitcase.svg" alt="suitcase"/>
						<div>
							<h1 className="text-[1.8rem] font-bold">Jobs</h1>
							<p className="text-[20px]">Students are recommended job sectors, which contain individual jobs.</p>
						</div>
					</div>
					<div>
						{jobData.map((industry, index) => {
							return (
								// <div className="my-8">
								<JobContainer key={index} name={industry.name}>
									{industry.jobs.map((job) => {
										if (job.name) {
											return <JobItem key={job.id} job={job} />;
										} else {
											return <></>;
										}
									})}
								</JobContainer>
								// </div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}

export default Page;
