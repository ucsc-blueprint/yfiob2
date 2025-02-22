"use client";
import { Navbar } from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import TextBox from "../../components/TextBox/TextBox.jsx";
import Button from "../../components/Button.jsx";
import addData from "../../utils/addData.js";
import schoolData from "./schools.json";   


export const Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [school, setSchool] = useState("");
    const [grade, setGrade] = useState("");
    const [studentID, setStudentID] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [filteredSchools, setFilteredSchools] = useState([]);
    
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
            <div className="flex flex-col items-center justify-center h-screen bg-[#E8F6FF]">
                
                <h1 className="text-4xl">Sign up</h1>

                {/* Email Input */}                
                <p className="text-left m-2">Email</p>
                <input 
                    Placeholder={"Email"}
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                {/* Password Input */}
                <p className="m-2 text-left">Password</p>   
                <input 
                    Placeholder={"Password"} 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                

                <p className="w-full indent-2 text-center m-2">School Information</p>
                
                {/* School Input Dropdown */}
                <div className="relative w-[502px] m-2">
                    <input
                        type="text"
                        placeholder="School"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setSchool(e.target.value);
                        }}
                        onFocus={() => setIsDropdownVisible(true)}
                        onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
                        className="dropdown text-left pl-3 w-full border-2 border-gray-300 rounded-lg p-3 bg-white"
                        style={{ textAlign: "left" }}
                    />
                    {isDropdownVisible && (
                        <ul
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg max-h-40 shadow-md z-10 overflow-y-auto"
                        >
    
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
                <div className="relative w-[502px] m-2">
                <select
                    name="Grade"
                    id="Grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="text-left pl-3 pr-8 w-full border-2 border-gray-300 rounded-lg p-3 bg-white appearance-none focus:outline-none"
                >
                    <option value="" disabled hidden>Grade</option>
                    <option value="K-5">K-5</option>
                    <option value="6-8">6-8</option>
                    <option value="9-12">9-12</option>
                </select>

                {/* Arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">

                    <svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.21183 12.1522L0.864005 4.80435C-0.0309225 3.90942 -0.230632 2.88543 0.264875 1.73239C0.758498 0.577464 1.64118 0 2.91292 0H17.4673C18.739 0 19.6217 0.577464 20.1153 1.73239C20.6108 2.88543 20.4111 3.90942 19.5162 4.80435L12.1684 12.1522C11.8857 12.4348 11.5796 12.6467 11.2499 12.788C10.9202 12.9293 10.5669 13 10.1901 13C9.81328 13 9.46002 12.9293 9.13031 12.788C8.8006 12.6467 8.49444 12.4348 8.21183 12.1522Z" fill="#4C78E7" fill-opacity="0.5"/>
                    </svg>
                </div>
                </div>
                

                    
                {/* Student ID Input */}
                <input 
                    Placeholder={"Student ID Number"}
                    value={studentID}
                    onChange={(e) => setStudentID(e.target.value)}
                />
                <button
              onClick={handleSubmit}
              className="w-[502px] h-[58px] gap-[10px] rounded-[30px] px-[213px] py-[17px] bg-[#4C78E7] text-white flex items-center justify-center mt-9"
                >
                Sign Up
                </button>
               
            </div>
        </>
    );
}

export default Page;
