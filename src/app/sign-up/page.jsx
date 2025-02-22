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
        if (!email || !password || !school || !grade || !studentID) {
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
            }); alert("Data saved successfully");
            }
        catch (error) {
            console.log("Error saving data: ", error);
            alert("Error saving data");
        }
    }


    return (
        <>

            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen bg-[#E8F6FF]">
                <h1 className="text-4xl">Sign up</h1>
                <p>Email</p>
                <TextBox 
                    Placeholder={"Email"}
                />
                <p>Password</p>
                <TextBox 
                    Placeholder={"Password"}
                    
                />
                <p>School Information</p>
                <input 
                    type="text"
                    Placeholder="School"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsDropdownVisible(true)}
                    onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)} 
                    className=" text-left pl-3 w-full border-2 border-gray-300 rounded-lg p-3 bg-white"
                    style={{ textAlign: "left" }}                         
                    />

                    
                <TextBox Placeholder={"Student ID Number"}
                />
                <button>
                    Sign Up
                </button>
            </div>
        </>
    );
}

export default Page;
