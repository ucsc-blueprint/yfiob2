"use client";

import OptionsIcon from "../../components/OptionsIcon";
import SearchIcon from "../../components/SearchIcon";
import FilterIcon from "../../components/FilterIcon";
import SortIcon from "../../components/SortIcon";
import BoxArrowUpIcon from "../../components/BoxArrowUpIcon";

import { Navbar } from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import getData from "../../utils/getData";

const clipLength = 30;

function CustomSearch(props) {
	return (
		<div className="w-1/4">
			<div className="m-3 flex flex-row mb-0">
				<input className="field-sizing-content w-4/5 outline-none" {...props} />
				<button className="mx-2">
					<SearchIcon style={{ transform: "scale(0.8)" }} />
				</button>
			</div>
			<hr className="h-px w-full  my-0 border-0 bg-gray-700" />
		</div>
	);
}

function InfoCards({ text, weight }) {
	console.log(text);
	text = text ?? "Undefined";
	console.log(text.length);

	return (
		<div
			className="bg-blue-200 rounded-md mx-1.5 p-2 overflow-hidden"
			style={{ gridColumn: "span " + weight + " / span " + weight }}
		>
			{text.length > clipLength ? text.slice(0, clipLength) + "..." : text}
		</div>
	);
}

function StudentRow({
	studentNum,
	firstName,
	lastName,
	grade,
	zipcode,
	email,
}) {
	return (
		<div className="flex flex-row items-center w-full my-3">
			<p className="w-5 h-full">{studentNum}</p>
			<div className="grid grid-cols-12 grid-rows-1 w-full">
				<InfoCards weight={4} text={firstName + " " + lastName ?? ""} />
				<InfoCards weight={2} text={"Grade: " + grade} />
				<InfoCards weight={2} text={"Zipcode: " + zipcode} />
				<InfoCards weight={4} text={email} />
			</div>
			<OptionsIcon style={{ transform: "scale(0.8)" }} />
		</div>
	);
}

function filterFunction(data, search) {
	const user = data.data;
	if (!user.firstName) {
		user.firstName = "";
	}
	if (!user.lastName) {
		user.lastName = "";
	}

	const name = user.firstName.toLowerCase() + " " + user.lastName.toLowerCase();
	return name.includes(search.toLowerCase());
}

export default function AdminPage() {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const getNewData = async () => {
			const newData = await getData("users");
			console.log(newData);
			setData(newData);
		};
		getNewData();
	}, []);

	function handleChange(e) {
		setSearch(e.target.value);
	}

	return (
		<>
			<Navbar />
			<div className="flex justify-center w-[100vw]">
				<div className="w-[80vw] h-[80vh] p-10">
					<div className="flex flex-row justify-between">
						<div className="pb-5">
							<div className="text-3xl">Student Accounts</div>
							<div className="text-l">Breakdown of student career quiz results</div>
						</div>
						<div className="flex flex-row items-center">
							{/* <SearchIcon /> */}
							<BoxArrowUpIcon />
							<p>Export Student Data</p>
						</div>
					</div>
					<div className="flex flex-row justify-between">
						<CustomSearch
							onChange={handleChange}
							placeholder="Type the name of student"
						/>
						<div className="flex flex-row">
							<FilterIcon className="mx-3" />
							<SortIcon />
						</div>
					</div>
					{data ? (
						data
							.filter((data) => filterFunction(data, search))
							.map((object, index) => {
								const data = object.data;
								return (
									<div key={data.id || index}>
										<StudentRow
											studentNum={index + 1}
											firstName={data.firstName}
											lastName={data.lastName}
											grade={data.grade}
											zipcode={data.zipcode}
											email={data.email}
										/>
									</div>
								);
							})
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	);
}
