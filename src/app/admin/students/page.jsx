"use client";

import OptionsIcon from "../../../components/OptionsIcon";
import SearchIcon from "../../../components/SearchIcon";
import FilterIcon from "../../../components/FilterIcon";
import SortIcon from "../../../components/SortIcon";
import BoxArrowUpIcon from "../../../components/BoxArrowUpIcon";
import ForwardArrow from "../../../components/ForwardArrow";
import BackArrow from "../../../components/BackArrow";
import AdminFilterPopup from "../../../components/AdminFilterPopup";
import { useEffect, useState, useRef } from "react";
import getData from "../../../utils/getData";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
// import { AccountIcon } from "./AccountIcon.svg";

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

function UserRows({ data, currentPage, filterFunction, search }) {
	return data ? (
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
	);
}

export default function AdminPage() {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const [grade, setGrade] = useState(null);
	const [shown, setShown] = useState(false);
	const [zipcode, setZipcode] = useState(null);
	const [exportMenuOpen, setExportMenuOpen] = useState(false);

	const exportRef = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (exportRef.current && !exportRef.current.contains(event.target)) {
				setExportMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	function filterFunction(data, search) {
		const user = data.data;
		if (!user.firstName) {
			user.firstName = "";
		}
		if (!user.lastName) {
			user.lastName = "";
		}

		const name = user.firstName.toLowerCase() + " " + user.lastName.toLowerCase();
		const containsName = name.includes(search.toLowerCase());

		let inGrade = user.grade === grade || grade === null;

		let containsZip =
			Math.floor(user.zipcode).toString().includes(zipcode) || zipcode === null;

		return containsName && inGrade && containsZip;
	}

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
					currentGrade={grade}
					setGrade={setGrade}
					setZipcode={setZipcode}
					setShown={setShown}
				/>
			) : null}
			<AdminNavbar />
			<div className="flex justify-center w-[100vw]">
				<div className="w-[80vw] h-[80vh] p-10">
					<div className="flex flex-row justify-between">
						<div className="mb-5 flex items-center align-middle justify-center">
							<div className="h-[48px] w-[48px]">
								<svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
								<mask id="mask0_3691_7436" className="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="49">
								<rect y="0.5" width="48" height="48" fill="#D9D9D9"/>
								</mask>
								<g mask="url(#mask0_3691_7436)">
								<path d="M9 42.5008C8.2 42.5008 7.5 42.2008 6.9 41.6008C6.3 41.0008 6 40.3008 6 39.5008V9.50078C6 8.70078 6.3 8.00078 6.9 7.40078C7.5 6.80078 8.2 6.50078 9 6.50078H29.25L26.25 9.50078H9V39.5008H39V22.1008L42 19.1008V39.5008C42 40.3008 41.7 41.0008 41.1 41.6008C40.5 42.2008 39.8 42.5008 39 42.5008H9ZM18 30.5008V22.0008L37.1 2.90078C37.4 2.60078 37.7333 2.38411 38.1 2.25078C38.4667 2.11745 38.8333 2.05078 39.2 2.05078C39.5667 2.05078 39.9387 2.12578 40.316 2.27578C40.693 2.42578 41.0377 2.65078 41.35 2.95078L45.5 7.15078C45.787 7.44945 46.0087 7.77912 46.165 8.13978C46.3217 8.50078 46.4 8.86778 46.4 9.24078C46.4 9.61411 46.325 9.99245 46.175 10.3758C46.025 10.7591 45.8 11.1008 45.5 11.4008L26.5 30.5008H18ZM21 27.5008H25.25L37.9 14.8508L33.6 10.6508L21 23.2008V27.5008Z" fill="#1C1B1F"/>
								</g>
								</svg>
							</div>
							<div >
								<div className="text-3xl">Student Accounts</div>
								<div className="text-l">Breakdown of student career quiz results</div>
							</div>
						</div>

						<div ref={exportRef} className="relative">
							<button 
								onClick={() => setExportMenuOpen(!exportMenuOpen)}
								className="flex flex-row items-center bg-[#4C78E7] text-white px-4 py-2 rounded-md hover:bg-[#3b5ebf] transition"
							>
								<BoxArrowUpIcon />
								<p className="ml-2">Export Student Data</p>
							</button>
							{exportMenuOpen && (
								<div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
									<button
										onClick={() => console.log("Exporting as JSON")}
										className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										.JSON
									</button>
									<button
										onClick={() => console.log("Exporting as CSV")}
										className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										.CSV
									</button>

								</div>
							)}
						</div>


					</div>

					{/* Search Bar */}
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

					<div>
						<div className="flex w-full gap-4 justify-center py-5">
							<h1>First Name</h1>
							<h1>Last Name</h1>
							<h1>Grade ##</h1>
							<h1>Zipcode</h1>
							<h1>School</h1>
						</div>
						<UserRows
							data={data}
							currentPage={currentPage}
							filterFunction={filterFunction}
							search={search}
						/>
						<div className="flex w-full justify-end py-5">
							<PageSelector
								data={data}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
