import XIcon from "./XIcon";

const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function CustomSearch(props) {
	return (
		<div className="w-full">
			<div className="flex flex-row">
				<input
					className="field-sizing-content outline-none min-w-1 grow mx-3"
					{...props}
				/>
			</div>
			<hr className="h-px w-full  my-0 border-0 bg-gray-700" />
		</div>
	);
}

export default function AdminFilterPopup({
	grade,
	setGrade,
	setZipcode,
	setSchool,
	setShown,
}) {
	function CircleButton({ grade, selected }) {
		return (
			<button
				onClick={() => {
					setGrade(grade);
				}}
				className={`rounded-full h-[2rem] w-[2rem] m-2 aspect-square ${
					!selected ? "bg-[#4C78E721]" : "bg-[#4c78e795]"
				}`}
			>
				{grade}
			</button>
		);
	}

	return (
		<div className="absolute top-0 left-0 w-full h-full backdrop-blur-md z-20">
			<div className="flex items-center justify-center w-full h-full">
				<div className="bg-white  rounded-lg shadow-md flex flex-col items-center">
					<button
						className="ml-auto"
						onClick={() => {
							setShown(false);
						}}
					>
						<XIcon className="m-3" style={{ transform: "scale(0.7)" }} />
					</button>
					<h1>Filter</h1>
					<div className="w-[80%] p-10">
						<div className="flex items-start">
							<h1 className="mx-1 p-2 rounded-sm bg-[#4C78E721] font-black">Grade</h1>
							<div className="flex flex-wrap">
								{grades.map((gradeNum, index) => (
									<CircleButton
										key={index}
										grade={gradeNum}
										selected={gradeNum === grade}
									/>
								))}
							</div>
						</div>
						<div className="flex flex-row items-end">
							<h1 className="mx-1 p-2 rounded-sm bg-[#4C78E721] font-black">
								Zipcode
							</h1>
							<div className="grow-[20]">
								<CustomSearch
									onChange={(e) => {
										setZipcode(e.target.value);
									}}
								/>
							</div>
						</div>
						<div className="flex flex-row items-end my-3">
							<h1 className="mx-1 p-2 rounded-sm bg-[#4C78E721] font-black">School</h1>
							<div className="grow-[20]">
								<CustomSearch
									onChange={(e) => {
										setSchool(e.target.value);
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
