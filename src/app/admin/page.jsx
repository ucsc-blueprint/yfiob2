"use client";

import OptionsIcon from "../../components/OptionsIcon";
import SearchIcon from "../../components/SearchIcon";
import FilterIcon from "../../components/FilterIcon";
import SortIcon from "../../components/SortIcon";
import BoxArrowUpIcon from "../../components/BoxArrowUpIcon";
import ForwardArrow from "../../components/ForwardArrow";
import BackArrow from "../../components/BackArrow";
import AdminFilterPopup from "../../components/AdminFilterPopup";

import { useEffect, useState } from "react";
import getData from "../../utils/getData";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";

const clipLength = 30;

function CustomSearch(props) {
	return (
		<div className="w-1/4">
			<div className="flex flex-row mb-0">
				<input
					className="field-sizing-content outline-none min-w-1 grow mx-3 italic"
					{...props}
				/>
				<button className="ml-2">
					<SearchIcon style={{ transform: "scale(0.55)" }} />
				</button>
			</div>
			<hr className="h-px w-full  my-0 border-0 bg-gray-700" />
		</div>
	);
}

function InfoCards({ text, weight }) {
	text = text ?? "undefined";
	return (
		<div
			className="bg-[#4C78E721] rounded-md mx-1.5 p-2 overflow-hidden"
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

function PageSelector({ data, currentPage, setCurrentPage }) {
	const maxPages = Math.ceil(data.length / 10);

	return (
		<>
			<div className="flex flex-row w-1/3">
				<div className="flex flex-row justify-between grow-[6]">
					<button>
						<BackArrow
							onClick={() => {
								currentPage > 0
									? setCurrentPage(currentPage - 1)
									: console.log("No lower page");
							}}
						/>
					</button>
					<button>{currentPage + 1}</button>
					<button
						onClick={() => {
							setCurrentPage(currentPage + 1);
						}}
					>
						{currentPage + 2 <= maxPages ? currentPage + 2 : ""}
					</button>
					<button
						onClick={() => {
							setCurrentPage(currentPage + 2);
						}}
					>
						{currentPage + 3 <= maxPages ? currentPage + 3 : ""}
					</button>
					<button>
						<ForwardArrow
							onClick={() => {
								currentPage < maxPages
									? setCurrentPage(currentPage + 1)
									: console.log("No upper page");
							}}
						/>
					</button>
				</div>
				<div className="grow px-3">
					<p>{`out of ${maxPages}`}</p>
				</div>
			</div>
		</>
	);
}
export default function AdminPage() {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const [grade, setGrade] = useState(1);
	const [shown, setShown] = useState(false);
	const [zipcode, setZipcode] = useState(123091);
	const [school, setSchool] = useState(null);

	useEffect(() => {
		const getNewData = async () => {
			const newData = await getData("users");
			setData(newData);
		};
		getNewData();
	}, []);

	function handleChange(e) {
		setSearch(e.target.value);
	}

	return (
		<>
			{shown ? (
				<AdminFilterPopup
					grade={grade}
					setGrade={setGrade}
					setZipcode={setZipcode}
					setSchool={setSchool}
					setShown={setShown}
				/>
			) : null}
			<AdminNavbar />
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
					<div className="flex flex-row justify-between pb-3">
						<CustomSearch
							onClick={() => {
								setCurrentPage(0);
							}}
							onChange={handleChange}
							placeholder="Type the name of student"
						/>
						<div className="flex flex-row">
							<button>
								<FilterIcon
									onClick={() => {
										setShown(true);
									}}
									style={{ transform: "scale(0.8)" }}
									className="mx-3"
								/>
							</button>
							<SortIcon style={{ transform: "scale(0.8)" }} />
						</div>
					</div>
					{data ? (
						data
							.filter((data) => filterFunction(data, search))
							.slice(currentPage * 10, currentPage * 10 + 10)
							.map((object, index) => {
								const data = object.data;
								return (
									<div key={data.id || index}>
										<StudentRow
											studentNum={currentPage * 10 + index + 1}
											firstName={data.firstName}
											lastName={data.lastName}
											grade={data.grade}
											zipcode={Math.floor(data.zipcode)}
											email={data.email}
										/>
									</div>
								);
							})
					) : (
						<></>
					)}
					<div className="flex w-full justify-end py-5">
						<PageSelector
							data={data}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
