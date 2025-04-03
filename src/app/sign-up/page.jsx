"use client";
import { Navbar } from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import TextBox from "../../components/TextBox/TextBox.jsx";
import Button from "../../components/Button.jsx";
import addData from "../../utils/addData.js";
import schoolData from "./schools.json";
import gradeData from "./grades.json"; // Import grades.json
import DropDownArrow from "../../components/DropDownArrow.jsx";

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
            <div className="bg-[#E8F6FF] flex flex-col justify-center items-center">
                <div className = "space-y-4 w-[502px]">
                    <h1 className="text-4xl font-sofia font-medium text-[40px] mb-8 leading-[40px] tracking-normal text-center">
                        Sign up
                    </h1>

                    {/* Email Input */}
                    <p className="text-left w-[502px] font-lato font-normal text-[20px] leading-[20px] tracking-normal">
                        Email
                    </p>
                    <TextBox 
                            type = "text"
                            Placeholder = {"Email"}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            id="email"
                            onFocus={(e) => e.target.style.color = "black"}  // Change text color to black on focus
                            onBlur={(e) => e.target.style.color = "#898989"}
                    />

                    {/* Password Input */}
                    <p className="text-left w-[502px] font-lato font-normal text-[20px] leading-[20px] tracking-normal">
                        Password
                    </p>
                    <TextBox 
                            type="password"
                            Placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            id="password"
                            onFocus={(e) => e.target.style.color = "black"}  // Change text color to black on focus
                            onBlur={(e) => e.target.style.color = "#898989"}
                    />

                    <p className="text-left w-[502px] font-lato font-normal text-[20px] leading-[20px] tracking-normal">
                        School Information
                    </p>

                    {/* School Dropdown Input */}
                    <div className="relative">
                    <TextBox 
                                Placeholder="School"
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setSchool(e.target.value);
                                }}
                                value={searchTerm}
                                onFocus={(e) => {
                                    e.target.style.color = "black"; 
                                    setIsDropdownVisible(true);
                                }}
                                onBlur={(e) => {
                                    setTimeout(() => setIsDropdownVisible(false), 200);
                                    e.target.style.color = "#898989";
                                }}
                            />
                       
                       {/* Arrow SVG */}
                        <DropDownArrow/>

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
                    <div className="relative">
                    <TextBox 
                                Placeholder="Grade"
                                onChange={(e) => {
                                    setGradeSearchTerm(e.target.value);
                                    setGrade(e.target.value);
                                }}
                                value={gradeSearchTerm}
                                onFocus={() => setIsGradeDropdownVisible(true)}
                                onBlur={() => setTimeout(() => setIsGradeDropdownVisible(false), 200)}
                            />

                        {/* Arrow SVG */}
                        <DropDownArrow/>

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
                    <TextBox 
                            Placeholder="Student ID Number"
                            onChange={(e) => setStudentID(e.target.value)}
                            value={studentID}
                            onFocus={(e) => e.target.style.color = "black"}  // Change text color to black on focus
                            onBlur={(e) => e.target.style.color = "#898989"}
                        />
                    </div>

                    <div className="my-6 w-[502px]">
                        <Button
                            text = "Sign Up"
                            size = "big"
                            onClick = {handleSubmit}
                        />
                    </div>
            </div>
        </>
    );
};

export default Page;
