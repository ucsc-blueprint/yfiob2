"use client";

import { useEffect, useRef, useState, Fragment } from "react";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import { addData } from "../../../utils/addData";
import getData from "../../../utils/getData";
import deleteData from "../../../utils/deleteData";
import JobPopup from "../../../components/JobPopup";

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
	const [jobToEdit, setJobToEdit] = useState(null);

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
			<div className="mx-2 p-2" key={job.id}>
				<div className="flex" id={job.name}>
					<div className="flex gap-2">
						<img src="/assets/business_center.svg" alt="suitcase"/>
						<p>{job.name}</p>
					</div>
					<div className="ml-auto flex gap-2">
					<button
						onClick={() => {
							openRef.current = job.industry;
							setJobToEdit(job);
							setPopupOpen(true);
						}}
					>
						<img src="/assets/pencil-icon.svg" alt="pencil icon"/>
					</button>
						<button
							onClick={async () => {
								await deleteData("careers", job.id);
								const newData = await getData("careers").then((data) =>
									parseJobs(data)
								);
								setJobData(newData);
							}}
						>
							<img src="/assets/delete-icon.svg" alt="delete icon"/>
						</button>
					</div>
				</div>
			</div>
		);
	}

	function JobContainer({ children, name }) {
		const toggled = open.includes(name);
		return (
			<div className="my-8 outline-[#104c5a1a] border-[1px] rounded-md">
				<div className="w-full bg-[#185D6D1A] text-[20px] flex items-center justify-center rounded-[5px]">
					<button
						className="rounded-3xl bg-white m-2  h-[30px] w-[30px] flex justify-center items-center"
						onClick={() => {
							if (open.includes(name)) {
								setOpen(open.filter((t) => t !== name));
							} else {
								setOpen([...open, ...[name]]);
							}
						}}
					>
						{toggled ? <img src="/assets/arrow-down.svg" alt='arrow down icon'/> : <img src="/assets/arrow-up.svg" alt='arrow up icon'/>}
					</button>
					<div>{name}</div>
					<button
						onClick={() => {
							openRef.current = name;
							setJobToEdit(null);
							setPopupOpen(true);
						}}
						className="ml-auto text-[#072b33] font-[100] bg-[#185D6D1A] border-[#185d6d] px-5 rounded-md border-[1px] mr-2"
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
					setJobToEdit(null);
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
				jobToEdit={jobToEdit}
			/>
			<AdminNavbar />
			<div className="flex justify-center">
				<div className="w-[80vw] h-[100vw]">
					<div className="flex gap-2 mt-10">
						<img src="/assets/suitcase.svg" alt="suitcase"/>
						<div>
							<h1 className="text-[1.8rem] font-bold">Jobs</h1>
							<p className="text-[20px]">Students are recommended job sectors, which contain individual jobs.</p>
						</div>
					</div>
					<div className="overflow-y-auto no-scrollbar">
						{jobData.map((industry, index) => {
							return (
								<JobContainer key={index} name={industry.name}>
										{industry.jobs.map((job) => {
											if (job.name) {
												return <Fragment key={job.id}><JobItem job={job} /><hr className="border-[#888888] border-1"/></Fragment>;
											} else {
												return null;
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
