import { Navbar } from "../Navbar"
import { CareersCardExpanded } from "./PageComponents/CareersCardExpanded";

// import { CareersCard } from "./components/CareersCard";
// import { CareersCardExpanded } from "./components/CareersCardExpanded"

export const CareersExpandedPage = ({educationLevel, nextJob}) => {

  const backgroundColors = {
    "elementary-school": "#FFC273",
    "middle-school": "#9AD7F8",
    "high-school": "#B9E98E",
  };

  const headerColors = {
    "elementary-school": "#FFE0B8",
    "middle-school": "#EEEEEE",
    "high-school": "#EEEEEE",
  };

  const headerTextColors = {
    "elementary-school": "#FF7022",
    "middle-school": "#3FA1D9",
    "high-school": "#47B748",
  };

  return (
    <div className="h-[100vh] flex flex-col" style={{ backgroundColor: backgroundColors[educationLevel] }}>
      <Navbar />

      <div className="flex gap-3 justify-center items-center m-10">
        <img src='./back-arrow.svg'/>
        <p>Click to Go back</p>

        <h2
        className="p-3 mx-8 font-semibold px-10 rounded-2xl text-[25px]"
          style={{
            backgroundColor: headerColors[educationLevel],
            color: headerTextColors[educationLevel], // Add text color here
          }}
        >Agricultural Architect </h2>

        <p>{nextJob}</p>
        <img src='./front-arrow.svg'/>
      </div>

      <CareersCardExpanded
		 		educationLevel={educationLevel}
		 		category={'Agriculture and Natural Resources'}
		 		careerName={'Agricultural Architect'}
		 		title={"Agricultural Architect"} 
		 		description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
		 		salary={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
		 		skills={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
		 		colleges={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
		 		majors={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
		 		careerImages={['https://placehold.co/200x200', 'https://placehold.co/200x200', 'https://placehold.co/200x200','https://placehold.co/200x200', 'https://placehold.co/200x200', 'https://placehold.co/200x200' ]}
		 	/>
    </div>
  );
}