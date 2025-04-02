"use client";
import { Navbar } from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import addData from "../../utils/addData.js";
import schoolData from "./schools.json";
import gradeData from "./grades.json"; // Import grades.json
import ArrowSVG from "../../assets/arrow.svg";

export const Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [school, setSchool] = useState("");
    const [grade, setGrade] = useState("");
    const [studentID, setStudentID] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [filteredSchools, setFilteredSchools] = useState([]);
    
    // State for grade dropdown
    const [gradeSearchTerm, setGradeSearchTerm] = useState("");
    const [isGradeDropdownVisible, setIsGradeDropdownVisible] = useState(false);
    const [filteredGrades, setFilteredGrades] = useState([]);

    useEffect(() => {
        if (isDropdownVisible) {
            if (searchTerm.trim() === "") {
                setFilteredSchools(schoolData);
            } else {
                setFilteredSchools(
                    schoolData.filter((s) =>
                        s.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                );
            }
        }
    }, [searchTerm, isDropdownVisible]);

    useEffect(() => {
        if (isGradeDropdownVisible) {
            if (gradeSearchTerm.trim() === "") {
                setFilteredGrades(gradeData);
            } else {
                setFilteredGrades(
                    gradeData.filter((g) =>
                        g.toLowerCase().includes(gradeSearchTerm.toLowerCase())
                    )
                );
            }
        }
    }, [gradeSearchTerm, isGradeDropdownVisible]);

    const handleSubmit = async () => {
        console.log("Submitting data: ", { email, password, school, grade, studentID });
        if (
            email.trim() === "" ||
            password.trim() === "" ||
            school.trim() === "" ||
            grade.trim() === "" ||
            studentID.trim() === ""
        ) {
            alert("Please fill out all fields");
            return;
        }

        try {
            await addData("users", {
                email: email,
                password: password,
                school: school,
                grade: grade,
                studentID: studentID,
            });
            alert("Data saved successfully");
        } catch (error) {
            console.log("Error saving data: ", error);
            alert("Error saving data");
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-[#E8F6FF] min-h-[calc(100vh-64px)] flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-sofia font-medium text-[40px] mb-8 leading-[40px] tracking-normal text-center">
                        Sign up
                    </h1>

                    {/* Email Input */}
                    <p className="text-left m-3 w-[502px] font-lato font-normal text-[20px] leading-[20px] tracking-normal">
                        Email
                    </p>
                    <input
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        id="email"
                        onFocus={(e) => e.target.style.color = "black"}  // Change text color to black on focus
                        onBlur={(e) => e.target.style.color = "#898989"}
                        className="w-full h-[61px] placeholder-gray-400 text-gray-900 focus:text-black focus:outline-none"
                        style={{width: "502px",
                          height: "61px",
                          borderRadius: "10px",
                          textIndent: '30px',
                          fontFamily: "Lato",
                          color: "#898989",
                          fontWeight: 400,
                          lineHeight: '20px',
                          fontSize: '20px',
                              }}
                    />

                    {/* Password Input */}
                    <p className="text-left m-3 w-[502px] font-lato font-normal text-[20px] leading-[20px] tracking-normal">
                        Password
                    </p>
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        id="password"
                        onFocus={(e) => e.target.style.color = "black"}  // Change text color to black on focus
                        onBlur={(e) => e.target.style.color = "#898989"}
                        className="focus:outline-none"
                        style={{width: "502px",
                            height: "61px",
                            borderRadius: "10px",
                            textIndent: '30px',
                            fontFamily: "Lato",
                            color: "#898989",
                            fontWeight: 400,
                            lineHeight: '20px',
                            fontSize: '20px',
                              }}
                    />

                    <p className="text-left mt-3 w-[502px] font-lato font-normal text-[20px] leading-[20px] tracking-normal">
                        School Information
                    </p>

                    {/* //TODO Add the arrows to the dropdowns */}
                    {/* School Dropdown Input */}
                    <div className="relative w-[502px] m-3">
                        <input
                            type="text"
                            placeholder="School"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setSchool(e.target.value);
                            }}
                            onFocus={(e) => {
                              e.target.style.color = "black"; 
                              setIsDropdownVisible(true);
                            }}
                            onBlur={(e) => {
                              setTimeout(() => setIsDropdownVisible(false), 200);
                              e.target.style.color = "#898989";
                          }}
                            className="dropdown text-left w-full h-[61px] rounded-lg bg-white focus:outline-none"
                            style={{
                                textAlign: "left",
                                textIndent: "30px",
                                fontFamily: "Lato",
                                color: "#898989",
                                fontWeight: 400,
                                lineHeight: "20px",
                                fontSize: "20px",
                            }}
                        />
                       
                       {/* Arrow SVG */}
                        <svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-3 top-1/2 w-6 h-6 -translate-y-1/2 pointer-events-none">
                        <path d="M8.21183 12.1522L0.864005 4.80435C-0.0309225 3.90942 -0.230632 2.88543 0.264875 1.73239C0.758498 0.577464 1.64118 0 2.91292 0H17.4673C18.739 0 19.6217 0.577464 20.1153 1.73239C20.6108 2.88543 20.4111 3.90942 19.5162 4.80435L12.1684 12.1522C11.8857 12.4348 11.5796 12.6467 11.2499 12.788C10.9202 12.9293 10.5669 13 10.1901 13C9.81328 13 9.46002 12.9293 9.13031 12.788C8.8006 12.6467 8.49444 12.4348 8.21183 12.1522Z" fill="#4C78E7" fill-opacity="0.5"/>
                        </svg>

                        {/* Dropdown List */}
                        {isDropdownVisible && (
                            <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg max-h-40 shadow-md z-10 overflow-y-auto">
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

                    {/* Grade Dropdown Input */}
                    <div className="relative w-[502px] mb-3">
                        <input
                            type="text"
                            placeholder="Grade"
                            value={gradeSearchTerm}
                            onChange={(e) => {
                                setGradeSearchTerm(e.target.value);
                                setGrade(e.target.value);
                            }}
                            onFocus={() => setIsGradeDropdownVisible(true)}
                            onBlur={() => setTimeout(() => setIsGradeDropdownVisible(false), 200)}
                            className="dropdown text-left w-full h-[61px] rounded-lg bg-white"
                            style={{
                                textAlign: "left",
                                textIndent: "30px",
                                fontFamily: "Lato",
                                color: "#898989",
                                fontWeight: 400,
                                lineHeight: "20px",
                                fontSize: "20px",
                            }}
                        />

                        {/* Arrow SVG */}
                        <svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-3 top-1/2 w-6 h-6 -translate-y-1/2 pointer-events-none">
                        <path d="M8.21183 12.1522L0.864005 4.80435C-0.0309225 3.90942 -0.230632 2.88543 0.264875 1.73239C0.758498 0.577464 1.64118 0 2.91292 0H17.4673C18.739 0 19.6217 0.577464 20.1153 1.73239C20.6108 2.88543 20.4111 3.90942 19.5162 4.80435L12.1684 12.1522C11.8857 12.4348 11.5796 12.6467 11.2499 12.788C10.9202 12.9293 10.5669 13 10.1901 13C9.81328 13 9.46002 12.9293 9.13031 12.788C8.8006 12.6467 8.49444 12.4348 8.21183 12.1522Z" fill="#4C78E7" fill-opacity="0.5"/>
                        </svg>

                        {/* Dropdown List */}
                        {isGradeDropdownVisible && (
                            <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg max-h-40 shadow-md z-10 overflow-y-auto">
                                {filteredGrades.length > 0 ? (
                                    filteredGrades.map((g, index) => (
                                        <li
                                            key={index}
                                            onMouseDown={() => {
                                                setGrade(g);
                                                setGradeSearchTerm(g);
                                                setIsGradeDropdownVisible(false);
                                            }}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {g}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500 p-2">No results found</li>
                                )}
                            </ul>
                        )}
                    </div>

                    {/* Student ID Input */}
                        <input
                            placeholder="Student ID Number"
                            onChange={(e) => setStudentID(e.target.value)}
                            value={studentID}

                            style={{width: "502px",
                                height: "61px",
                                borderRadius: "10px",
                                textIndent: '30px',
                                fontFamily: "Lato",
                                color: "#898989",
                                fontWeight: 400,
                                lineHeight: '20px',
                                fontSize: '20px',
                                }}
                        />

                    <button
                        onClick={handleSubmit}
                        className="w-[502px] h-[58px] gap-[10px] rounded-[30px] px-[213px] py-[17px] bg-[#4C78E7] text-white flex items-center justify-center mt-9"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </>
    );
};

export default Page;
