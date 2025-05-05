import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import getData from "../../../utils/getData";

export default async function AdminInsights() {
  // TODO: fetch these from Firebase
  const assessmentsTaken = 481;
  const last7DaysGrowth = 220;
  const mostClickedCareer = "Agricultural Engineer";

  let users = [];
  const schools = {};
  let topTrendingSchool = "Unknown";
  
  try {
    users = await getData("users");
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

    console.log("Schools: ", schools);

    if (Object.keys(schools).length > 0) {
      topTrendingSchool = Object.keys(schools).reduce((a, b) => 
        schools[a] > schools[b] ? a : b
      );
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  const readyForCollegePercent = 75;

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
                {readyForCollegePercent}%
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

            <div className="grid grid-cols-3 gap-4">
              {sectors.map((sector, i) => (
                <div
                  key={i}
                  className={`border-t-4 ${sector.color} bg-white rounded-lg p-4`}
                >
                  <p className="text-2xl font-bold">{sector.percent}%</p>
                  <p className="text-gray-500 text-sm">{sector.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
