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
      <hr className="h-px w-full my-0 border-0 bg-gray-700" />
    </div>
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

function InfoCards({ text, weight }) {
  const display = text?.length > clipLength ? text.slice(0, clipLength) + "..." : text;
  return (
    <div
      className="bg-[#4C78E721] rounded-md mx-1.5 p-2 overflow-hidden"
      style={{ gridColumn: `span ${weight} / span ${weight}` }}
    >
      {display}
    </div>
  );
}

function StudentRow({ studentNum, firstName, lastName, grade, zipcode, school }) {
  return (
    <div className="flex flex-row items-center w-full my-3">
      <p className="w-5">{studentNum}</p>
      <div className="grid grid-cols-12 w-full">
        <InfoCards weight={4} text={`${firstName} ${lastName}`} />
        <InfoCards weight={2} text={`Grade: ${grade}`} />
        <InfoCards weight={2} text={`Zipcode: ${zipcode}`} />
        <InfoCards weight={4} text={`School: ${school}`} />
      </div>
      <OptionsIcon style={{ transform: "scale(0.8)" }} />
    </div>
  );
}

function PageSelector({ data, currentPage, setCurrentPage }) {
  const maxPages = Math.ceil(data.length / 10);
  return (
    <div className="flex flex-row w-1/3">
      <div className="flex flex-row justify-between grow-[6]">
        <button onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}>
          <BackArrow />
        </button>
        <button>{currentPage + 1}</button>
        <button onClick={() => setCurrentPage(currentPage + 1)}>
          {currentPage + 2 <= maxPages ? currentPage + 2 : ""}
        </button>
        <button onClick={() => setCurrentPage(currentPage + 2)}>
          {currentPage + 3 <= maxPages ? currentPage + 3 : ""}
        </button>
        <button onClick={() => currentPage < maxPages - 1 && setCurrentPage(currentPage + 1)}>
          <ForwardArrow />
        </button>
      </div>
      <div className="grow px-3">
        <p>{`out of ${maxPages}`}</p>
      </div>
    </div>
  );
}

function UserRows({ data, currentPage, filterFunction, search }) {
  const filtered = data.filter(item => filterFunction(item, search));
  return (
    filtered.slice(currentPage * 10, currentPage * 10 + 10).map((item, index) => {
      const u = item.data;
      return (
        <div key={u.id || index}>
          <StudentRow
            studentNum={currentPage * 10 + index + 1}
            firstName={u.firstName || ""}
            lastName={u.lastName || ""}
            grade={u.grade}
            zipcode={Math.floor(u.zipcode)}
            school={u.school || ""}
          />
        </div>
      );
    })
  );
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
    const matchesZip = zipcode != null
      ? Math.floor(u.zipcode).toString().includes(zipcode)
      : true;
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
      {shown && (
        <AdminFilterPopup
          currentGrade={grade}
          setGrade={setGrade}
          setZipcode={setZipcode}
          setSchool={setSchool}
          setShown={setShown}
        />
      )}
      <AdminNavbar />
      <div className="flex justify-center w-[100vw]">
        <div className="w-[80vw] h-[80vh] p-10">
          <div className="flex flex-row justify-between">
            <div className="pb-5">
              <div className="text-3xl">Student Accounts</div>
              <div className="text-l">Breakdown of student career quiz results</div>
            </div>
            <div className="flex flex-row items-center">
              <BoxArrowUpIcon />
              <p>Export Student Data</p>
            </div>
          </div>
          <div className="flex flex-row justify-between pb-3">
            <CustomSearch
              placeholder="Type the name of student"
              value={search}
              onChange={handleSearchChange}
            />
            <div className="flex flex-row">
              <button onClick={() => setShown(true)}>
                <FilterIcon className="mx-3" style={{ transform: "scale(0.8)" }} />
              </button>
              <SortIcon style={{ transform: "scale(0.8)" }} />
            </div>
          </div>
          <UserRows
            data={data}
            currentPage={currentPage}
            filterFunction={filterFunction}
            search={search}
          />
          <div className="flex w-full justify-end py-5">
            <PageSelector
              data={data.filter(item => filterFunction(item, search))}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
