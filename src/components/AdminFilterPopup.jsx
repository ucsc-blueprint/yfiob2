import { useState, useEffect } from "react";
import XIcon from "./XIcon";

const grades = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

function CustomSearch(props) {
  return (
    <div className="w-full">
      <div className="flex flex-row">
        <input
          className="field-sizing-content outline-none min-w-1 grow mx-3"
          {...props}
        />
      </div>
      <hr className="h-px w-full my-0 border-0 bg-gray-700" />
    </div>
  );
}

export default function AdminFilterPopup({
  currentGrade,
  setGrade,
  setZipcode,
  setSchool,
  setShown,
}) {
  const [tempGrade, setTempGrade] = useState(
    currentGrade != null ? currentGrade : []
  );
  const [tempZip, setTempZip] = useState("");
  const [tempSchool, setTempSchool] = useState("");

  // Disable body scrolling when popup is shown
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  function search() {
    setZipcode(tempZip.trim() || null);
    setGrade(tempGrade.length > 0 ? tempGrade : null);
    setSchool(tempSchool.trim() || null);
    setShown(false);
  }

  function reset() {
    setTempGrade([]);
    setTempZip("");
    setTempSchool("");
    setZipcode(null);
    setGrade(null);
    setSchool(null);
    setShown(false);
  }

  function CircleButton({ grade, selected }) {
    return (
      <button
        onClick={() =>
          setTempGrade((prev) =>
            selected ? prev.filter((g) => g !== grade) : [...prev, grade]
          )
        }
        className={`rounded-full h-[2rem] w-[2rem] m-2 flex items-center justify-center text-sm font-bold ${
          !selected ? "bg-[#4C78E721]" : "bg-[#4C78E795]"
        }`}
      >
        {grade}
      </button>
    );
  }

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen backdrop-blur-md z-50"
      onClick={(e) => e.target.id === "close" && setShown(false)}
    >
      <div className="flex items-center justify-center w-full h-full" id="close">
        <div className="bg-white rounded-lg shadow-md flex flex-col items-center">
          <button className="ml-auto p-2" onClick={() => setShown(false)}>
            <XIcon style={{ transform: "scale(0.7)" }} /> </button>
          <h1 className="text-xl font-semibold mb-4">Filter</h1>
          <div className="w-[80%] p-6">
            <div className="mb-4">
              <h2 className="inline-block px-2 py-1 bg-[#4C78E721] font-black">
                Grade
              </h2>
              <div className="flex flex-wrap mt-2">
                {grades.map((g) => (
                  <CircleButton key={g} grade={g} selected={tempGrade.includes(g)} />
                ))}
              </div>
            </div>

            <div className="mb-4 flex items-end">
              <h2 className="px-2 py-1 bg-[#4C78E721] font-black mr-2">
                Zipcode
              </h2>
              <CustomSearch
                placeholder="Enter zipcode"
                value={tempZip}
                onChange={(e) => setTempZip(e.target.value)}
              />
            </div>

            <div className="mb-4 flex items-end">
              <h2 className="px-2 py-1 bg-[#4C78E721] font-black mr-2">
                School
              </h2>
              <CustomSearch
                placeholder="Enter school name"
                value={tempSchool}
                onChange={(e) => setTempSchool(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                className="bg-[#4C78E780] px-4 py-2 rounded"
                onClick={search}
              >
                Search
              </button>
              <button
                className="bg-[#4C78E780] px-4 py-2 rounded"
                onClick={reset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
