"use client";
import { Navbar } from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import TextBox from "../../components/TextBox/TextBox.jsx";
import { useRouter } from "next/navigation";
import Button from "../../components/Button.jsx";
import { addData } from "../../utils/addData.js";
import schoolData from "./schools.json";
import gradeData from "./grades.json";
import DropDownArrow from "../../components/DropDownArrow.jsx";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation"; 

export const Page = () => {
  const router = useRouter(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [studentID, setStudentID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [filteredSchools, setFilteredSchools] = useState([]);

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

    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created successfully: ", user.uid);

      const userData = {
        uid: user.uid,
        email,
        school,
        grade,
        studentID,
      };

      await addData("users", userData);

      alert("User registered and data saved successfully");

      router.push("/"); 
    } catch (error) {
      console.error("Error during signup: ", error);
      alert("Error saving data: " + error.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#E8F6FF] overflow-hidden">
        <Navbar />

        <div className="flex-grow flex items-center justify-center">
          <div className="w-[502px] space-y-4">
            <h1 className="text-4xl font-lato font-bold text-[40px] m-8 text-center">
              Sign up
            </h1>

            {/* Email Input */}
            <p className="text-left font-lato text-[20px]">Email</p>
            <TextBox
              type="text"
              Placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              onFocus={(e) => (e.target.style.color = "black")}
              onBlur={(e) => (e.target.style.color = "#898989")}
            />

            {/* Password Input */}
            <p className="text-left font-lato text-[20px]">Password</p>
            <TextBox
              type="password"
              Placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              onFocus={(e) => (e.target.style.color = "black")}
              onBlur={(e) => (e.target.style.color = "#898989")}
            />

            {/* School Dropdown */}
            <p className="text-left font-lato text-[20px]">School Information</p>
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
              <DropDownArrow />
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

            {/* Grade Dropdown */}
            <div className="relative">
              <TextBox
                Placeholder="Grade"
                onChange={(e) => {
                  setGradeSearchTerm(e.target.value);
                  setGrade(e.target.value);
                }}
                value={gradeSearchTerm}
                onFocus={() => setIsGradeDropdownVisible(true)}
                onBlur={() =>
                  setTimeout(() => setIsGradeDropdownVisible(false), 200)
                }
              />
              <DropDownArrow />
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

            {/* Student ID */}
            <TextBox
              Placeholder="Student ID Number"
              onChange={(e) => setStudentID(e.target.value)}
              value={studentID}
              onFocus={(e) => (e.target.style.color = "black")}
              onBlur={(e) => (e.target.style.color = "#898989")}
            />

            {/* Sign Up Button */}
            <div className="my-6">
              <Button text="Sign Up" size="big" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
