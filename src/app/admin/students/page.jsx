"use client";

import { useEffect, useState } from "react";
import OptionsIcon from "../../../components/OptionsIcon";
import SearchIcon from "../../../components/SearchIcon";
import FilterIcon from "../../../components/FilterIcon";
import SortIcon from "../../../components/SortIcon";
import BoxArrowUpIcon from "../../../components/BoxArrowUpIcon";
import ForwardArrow from "../../../components/ForwardArrow";
import BackArrow from "../../../components/BackArrow";
import AdminFilterPopup from "../../../components/AdminFilterPopup";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import getData from "../../../utils/getData";
import EditSquareIcon from "../../../components/EditSquareIcon";
import ArrowDropDownIcon from "../../../components/ArrowDropDownIcon";
import FileExportIcon from "../../../components/FileExportIcon";

const clipLength = 30;

function CustomSearch(props) {
    return (
        <div className="w-64 border-black border-[1px] rounded-md">
            <div className="flex flex-row mb-0">
                <input
                    className="field-sizing-content outline-none min-w-1 mx-3 grow"
                    {...props}
                />
                <button className="ml-2">
                    <SearchIcon style={{ transform: "scale(0.55)" }} />
                </button>
            </div>
        </div>
    );
}

function FilterButton({ onClick }) {
    return (
        <button
            onClick={(e) => onClick(e)}
            className="border-black border-[1px] h-full rounded-md flex items-center ml-3"
        >
            <FilterIcon className="mx-3" style={{ transform: "scale(0.8)" }} />
            <p className="mr-3">Filter...</p>
            <ArrowDropDownIcon className="mr-3" style={{ transform: "scale(0.8)" }} />
        </button>
    );
}

function ExportButton({ onClick }) {
    return (
        <button
            onClick={(e) => onClick(e)}
            className="bg-[#185D6D] rounded-md flex items-center ml-3 text-white"
        >
            <FileExportIcon className="mx-2 text-white" style={{ transform: "scale(0.8)" }} />
            <p className="mr-2">Export as...</p>
            <ArrowDropDownIcon className="mr-3" style={{ transform: "scale(0.8)" }} />
        </button>
    );
}

function isGradeMatch(studentGrade, filterGrades) {
    if (!filterGrades || filterGrades.length === 0) return true;

    const studentRange = String(studentGrade).trim();
    let studentGrades = [];

    if (studentRange.includes("-")) {
        const [min, max] = studentRange.split("-").map((g) => (g === "K" ? 0 : Number(g)));
        studentGrades = Array.from({ length: max - min + 1 }, (_, i) => (min + i).toString());
    } else {
        studentGrades = [studentRange === "K" ? "0" : studentRange];
    }

    return filterGrades.some((g) => {
        const target = g === "K" ? "0" : g;
        return studentGrades.includes(target);
    });
}

function InfoCards({ text, weight, start = false, end = false, title = false }) {
    const display = text?.length > clipLength ? text.slice(0, clipLength) + "..." : text;
    return (
        <div
            className={` border-[1px] border-[#00000033] p-3 overflow-hidden ${
                title ? "border-t-0 bg-none" : "bg-[#185D6D0D]"
            } ${start ? (title ? "border-l-0" : "rounded-l-md") : ""}${
                end ? (title ? "border-r-0" : "rounded-r-md") : ""
            }`}
            style={{ gridColumn: `span ${weight} / span ${weight}` }}
        >
            {display}
        </div>
    );
}

function StudentRow({ studentNum, firstName, lastName, grade, zipcode, school }) {
    return (
        <div className="flex flex-row items-center w-full my-5">
            <p className="w-9">{studentNum}</p>
            <div className="grid grid-cols-10 w-full">
                <InfoCards weight={2} start text={`${firstName}`} />
                <InfoCards weight={2} text={`${lastName}`} />
                <InfoCards weight={1} text={`${grade}`} />
                <InfoCards weight={2} text={`${zipcode}`} />
                <InfoCards weight={3} end text={`${school}`} />
            </div>
            <OptionsIcon className="ml-3 w-5" style={{ transform: "scale(0.8)" }} />
        </div>
    );
}

function PageSelector({ data, currentPage, setCurrentPage }) {
    const maxPages = Math.ceil(data.length / 8) + 1;

    const button1 = currentPage > 0 ? currentPage : currentPage + 1;
    const button2 = currentPage > 0 ? currentPage + 1 : currentPage + 2;
    const button3 =
        currentPage < maxPages - 1
            ? currentPage > 0
                ? currentPage + 2
                : currentPage + 3
            : "";

    console.log(currentPage);
    return (
        <div className="flex flex-row-reverse w-1/3">
            <span className="grow ml-3 whitespace-nowrap">{`out of ${maxPages}`}</span>
            <div className="flex flex-row justify-between grow w-full">
                <button onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}>
                    <ForwardArrow style={{ transform: "rotate(180deg)" }} />
                </button>
                <button
                    onClick={() => setCurrentPage(button1 - 1)}
                    className={`${currentPage === 0 ? "font-black text-gray-400" : ""} w-4`}
                >
                    {button1}
                </button>
                <button
                    className={`${
                        currentPage < maxPages && currentPage !== 0
                            ? "font-black text-gray-400"
                            : ""
                    } w-4`}
                    onClick={() => setCurrentPage(button2 - 1)}
                >
                    {button2}
                </button>
                <button onClick={() => setCurrentPage(button3 - 1)}>{button3}</button>
                <button
                    className="w-4"
                    onClick={() =>
                        currentPage < maxPages - 1 && setCurrentPage(currentPage + 1)
                    }
                >
                    <ForwardArrow />
                </button>
            </div>
        </div>
    );
}

function UserRows({ data, currentPage, filterFunction, search }) {
    const filtered = data.filter((item) => filterFunction(item, search));
    return filtered.slice(currentPage * 8, currentPage * 8 + 8).map((item, index) => {
        const u = item.data;
        return (
            <div key={u.id || index}>
                <StudentRow
                    studentNum={currentPage * 8 + index + 1}
                    firstName={u.firstName || ""}
                    lastName={u.lastName || ""}
                    grade={u.grade}
                    zipcode={Math.floor(u.zipcode)}
                    school={u.school || ""}
                />
            </div>
        );
    });
}

export default function AdminPage() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [grade, setGrade] = useState(null);
    const [zipcode, setZipcode] = useState(null);
    const [school, setSchool] = useState("");
    const [shown, setShown] = useState(false);

    useEffect(() => {
        getData("users").then(setData);
    }, []);

    // reset page when filters or search change
    useEffect(() => {
        setCurrentPage(0);
    }, [search, grade, zipcode, school]);

    function filterFunction(item, searchTerm) {
        const u = item.data;
        const fullName = `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();
        const matchesName = fullName.includes(searchTerm.toLowerCase());
        const matchesGrade = isGradeMatch(u.grade, grade);
        const matchesZip =
            zipcode != null ? Math.floor(u.zipcode).toString().includes(zipcode) : true;
        const matchesSchool = school
            ? u.school?.toLowerCase().includes(school.toLowerCase())
            : true;
        return matchesName && matchesGrade && matchesZip && matchesSchool;
    }

    function handleSearchChange(e) {
        setSearch(e.target.value);
    }

    return (
        <>
            <AdminNavbar />
            <div className="flex justify-center w-[100vw]">
                <div className="w-[70vw] p-10">
                    <div className="flex flex-row justify-between">
                        <div className="pb-5 flex flex-row items-center">
                            <div className="mr-3">
                                <EditSquareIcon style={{ transform: "scale(0.8)" }} />
                            </div>
                            <div>
                                <div className="text-3xl">Student Accounts</div>
                                <div className="text-l">
                                    Breakdown of student career quiz results
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between pb-3">
                        <div className="flex flex-row">
                            <CustomSearch
                                placeholder="Search..."
                                value={search}
                                onChange={handleSearchChange}
                            />
                            <div>
                                <FilterButton onClick={() => setShown(true)} />
                                <div>
                                    {shown && (
                                        <AdminFilterPopup
                                            currentGrade={grade}
                                            setGrade={setGrade}
                                            setZipcode={setZipcode}
                                            setSchool={setSchool}
                                            setShown={setShown}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <ExportButton
                                onClick={() => {
                                    console.log("HI");
                                }}
                            />
                        </div>
                    </div>
                    <div className="h-[38rem]">
                        <div className="flex">
                            <div className="w-9" />
                            <div className="grid grid-cols-10 w-full">
                                <InfoCards title weight={2} start text="First Name" />
                                <InfoCards title weight={2} text="Last Name" />
                                <InfoCards title weight={1} text="Grade" />
                                <InfoCards title weight={2} text="Zipcode" />
                                <InfoCards title weight={3} end text="School" />
                            </div>
                            <div className="w-5 ml-3" />
                        </div>
                        <UserRows
                            data={data}
                            currentPage={currentPage}
                            filterFunction={filterFunction}
                            search={search}
                        />
                    </div>
                    <div className="flex w-full justify-end py-5">
                        <PageSelector
                            data={data.filter((item) => filterFunction(item, search))}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
