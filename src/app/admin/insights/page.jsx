"use client";
import { useEffect, useState } from "react";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import getData from "../../../utils/getData";
import { getAllIndustries } from "../../../../backend/adminFuncs/adminUtils.js";

export default function AdminInsights() {
  // TODO: fetch these from Firebase
  
  // const [assesmentsTaken, setAssesmentsTaken] = useState(0);
  // const [last7DaysGrowth, setLast7DaysGrowth] = useState(0);
  const [industriesRecommended, setIndustriesRecommended] = useState([]);

  const gradeColor = {
    0: "border-t-[20px] border-[#90BD00]",
    1: "border-t-[20px] border-[#BDBD00]",
    2: "border-t-[20px] border-[#BD7800]",
    3: "border-t-[20px] border-[#BD4500]",
  };

  
  useEffect(()=> {
    const getData = async () => {
      getAllIndustries().then((data)=>{
        setIndustriesRecommended(data);
      });
    }
    getData();
  }, [])

  let last7DaysGrowth = 0;
  let readyForCollegePercent = 0;
  const mostClickedCareer = "Agricultural Engineer";

  let assessmentsTaken = 0;
  const [users, getUsers] = useState([]);
  const [submissions, getSubmissions] = useState([]);
  const schools = {};
  let topTrendingSchool = "Unknown";
  
  useEffect(() => {
    const getNewData = async () => {
      const users = await getData("users");
      const submissions = await getData("submissions");
      getUsers(users);
      getSubmissions(submissions);
    };
    getNewData();
  }, []);

  try {
    // users = await getData("users");
    console.log("Users: ", users);

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (!user.data.school) {
        continue;
      }
      const school = user.data.school;
      if (schools[school]) {
        schools[school] += 1;
      } else {
        schools[school] = 1;
      }
    }

    if (Object.keys(schools).length > 0) {
      topTrendingSchool = Object.keys(schools).reduce((a, b) => 
        schools[a] > schools[b] ? a : b
      );
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }



  //   const fetchSubmissions = async () => { 
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "submissions"));
  //     } catch (error) {
  //       console.error("Error fetching submissions:", error);
  //     }
  //   }
  //   fetchSubmissions();


  // const handleSubmissionAdd = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, "submissions"), {
  //       __userID: "Aviel'sFakeID",
  //       readyForCollege: true,
  //       timestamp: new Date(),
  //     });
  //     assessmentsTaken + 1;
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (error) {
  //     console.error("Error adding document: ", error);
  //   }
  // }

  // submissions = await getData("submissions")
  try {
      console.log("You submitted your Quiz", submissions);
      assessmentsTaken = submissions.length;
  } catch (error) {
      console.error("Error fetching submission data:", error);
  }
  try {
    const currentDate = new Date();
    // Calculate date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    last7DaysGrowth = submissions.filter((submission) => {
      // Check if submission and timestamp exist
      if (!submission || !submission.data || !submission.data.timestamp) {
        return false;
      }
      
      // Handle Firestore timestamp conversion
      let submissionDate;
      if (submission.data.timestamp && typeof submission.data.timestamp.toDate === 'function') {
        // Firebase Timestamp object (use toDate() method)
        submissionDate = submission.data.timestamp.toDate();
      } else if (submission.data.timestamp && submission.data.timestamp.seconds) {
        // Firebase timestamp stored as seconds/nanoseconds
        submissionDate = new Date(submission.data.timestamp.seconds * 1000);
      } else if (submission.data.timestamp instanceof Date) {
        // Already a JavaScript Date
        submissionDate = submission.data.timestamp;
      } else if (typeof submission.data.timestamp === 'string') {
        // String timestamp
        submissionDate = new Date(submission.data.timestamp);
      } else {
        // Unable to parse timestamp
        console.log("Unparseable timestamp:", submission.data.timestamp);
        return false;
      }
      
      // Compare to see if it's within the last 7 days
      return submissionDate >= sevenDaysAgo && submissionDate <= currentDate;
    }).length;
    
    console.log("Last 7 days growth:", last7DaysGrowth);
  } catch (error) {
    console.error("Error calculating last 7 days growth:", error);
  }

  try {
    readyForCollegePercent = (submissions.filter((submission) => {
      return submission.data.readyForCollege === true && submission.data.grade === "high-school";
    }).length / (submissions.filter((submission) => {
      return submission.data.grade === "high-school";
    }).length)) * 100;
  } catch (error) {
    console.error("Error calculating ready for college percent:", error);
  }

  // TODO: fetch sectors array from Firebase, with percent & a color code
  const sectors = [
    { percent: 25, label: "Agricultural and Engineering", color: "border-green-500" },
    { percent: 25, label: "Agricultural and Engineering", color: "border-green-500" },
    { percent: 25, label: "Agricultural and Engineering", color: "border-green-500" },
    { percent: 25, label: "Agricultural and Engineering", color: "border-green-500" },
    { percent: 25, label: "Agricultural and Engineering", color: "border-yellow-500" },
    { percent: 25, label: "Agricultural and Engineering", color: "border-yellow-500" },
    { percent: 25, label: "Agricultural and Engineering", color: "border-orange-500" },
    { percent: 25, label: "Agricultural and Engineering", color: "border-orange-500" },
    { percent: 25, label: "Agricultural and Engineering", color: "border-red-500" },
  ];

  const getColor = (percentage) => {
    switch (percentage) {
      case percentage > 15:
        return "border-green-500";
      case percentage > 10:
        return "border-yellow-500";
      case percentage > 5:
        return "border-orange-500";
      case percentage > 0:
        return "border-red-500";
      default:
        return "border-gray-300";
    }
  }

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
        <div className="w-[850px] space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-1">Insights</h1>
            <p className="text-gray-700">How many users are active on the site?</p>
          </div>

          {/* Main metric card */}
          <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
            <div>
              <p className="text-5xl font-bold">{assessmentsTaken}</p>
              <p className="text-gray-500">assessments taken</p>
            </div>
            <div className="flex items-center">
              {/* up-arrow icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a1 1 0 011-1h3V4a1 1 0 112 0v5h3a1 1 0 110 2H6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="ml-1 text-lg font-bold text-green-500">
                +{last7DaysGrowth}
              </p>
              <p className="ml-2 text-gray-500">last 7 days</p>
            </div>
          </div>

          {/* <div className="grid grid-cols-2 gap-4">
            <button onClick={handleSubmissionAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Submission
            </button>
            <button onClick={handleSubmissionAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add ReadyForCollege
            </button>
          </div> */}

          {/* Three summary cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-2xl font-bold">{mostClickedCareer}</p>
              <p className="text-gray-500 text-sm">
                most clicked on career
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-3xl font-bold">
                {readyForCollegePercent.toFixed(2)}%
              </p>
              <p className="text-gray-500 text-sm">
                responded “ready for college”
              </p>
            </div>

          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-2xl font-bold">{topTrendingSchool}</p>
              <p className="text-gray-500 text-sm">
                top trending school
              </p>
            </div>

          {/* Sectors section */}
          <div className="space-y-4">
            <div className="flex items-center">
              {/* folder icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7a2 2 0 012-2h7l2 2h7a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                />
              </svg>
              <p className="text-gray-700">
                What sectors have users been recommended?
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
  {industriesRecommended.map(([industryName, percentage], idx) => (
    <div
      key={idx}
      className="bg-white rounded-lg shadow overflow-hidden"
    >
                <div
                  className={`h-6 ${
                    getColor(percentage)
                  }`}
                />
                <div className="p-6 text-center">
                  <p className="text-4xl font-bold">{percentage}%</p>
                  <p className="mt-2 text-gray-600">{industryName}</p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
