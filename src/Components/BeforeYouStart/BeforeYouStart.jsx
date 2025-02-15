"use client";
import { BrowserRouter } from "react-router-dom";
import './BeforeYouStart.css';
import { useState, useEffect } from "react";
import addData from "../../utils/addData"; 
import schoolData from "./schools.json"; 

export const BeforeYouStart = () => {
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    if (isDropdownVisible) {
      if (searchTerm.trim() === "") {
        setFilteredSchools(schoolData); // Show full list when input is empty
      } else {
        setFilteredSchools(
          schoolData.filter((s) =>
            s.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
    }
  }, [searchTerm, isDropdownVisible]);

  const handleSubmit = async () => {
    if (!school || !grade) {
      alert("Please fill out all fields");
      return;
    }

    try {
      await addData("anonymousUsers", {
        school: school,
        grade: grade,
        timestamp: new Date(),
      });
      alert("Data added successfully!");
    } catch (error) {
      console.error("Error saving data: ", error);
      alert("Error saving data.");
    }
  };
  
  return (
    <BrowserRouter>
      <div>
        <div className="background">
          <div className="header">
            Before You Start Answering
          </div>

          <div className="pt-[10%]">
            {/* Searchable School Dropdown */}
            <div className="relative w-[502px] m-auto">
              <input
                type="text"
                placeholder="school"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsDropdownVisible(true)}
                onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)} 
                className="dropdown text-left pl-3 w-full border-2 border-gray-300 rounded-lg p-3 bg-white"
                style={{ textAlign: "left" }} 
              />
              {isDropdownVisible && (
                <ul className="absolute bg-white border border-gray-300 rounded-lg max-h-40 overflow-y-auto mt-1 shadow-md z-10 w-[502px]">
                  {filteredSchools.length > 0 ? (
                    filteredSchools.map((s, index) => (
                      <li
                        key={index}
                        onMouseDown={() => {
                          setSchool(s);
                          setSearchTerm(s);
                          setIsDropdownVisible(false);
                        }}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {s}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 p-2">No results found</li>
                  )}
                </ul>
              )}
            </div>

            <div className="relative w-[502px] m-auto mt-4">
              <select
                name="Grade"
                id="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="dropdown text-left pl-3 w-full border-2 border-gray-300 rounded-lg p-3 bg-white appearance-none"
              >
                <option value="" selected disabled>
                  grade
                </option>
                <option value="K-5">K-5</option>
                <option value="6-8">6-8</option>
                <option value="9-12">9-12</option>
              </select>
            </div>

            <button
              onClick={handleSubmit}
              className="mt-4 w-[200px] h-[50px] bg-blue-500 text-white font-bold rounded-[10px] m-auto block"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default BeforeYouStart;