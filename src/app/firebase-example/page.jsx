"use client";

import { useState } from "react";
import addData from "../../utils/addData";
import getData from "../../utils/getData";

export default function Page() {
	const [userName, setUserName] = useState("");

	return (
		<div className="w-[100vw] h-[100vh] bg-neutral-800">
			<input
				value={userName}
				onChange={(e) => {
					setUserName(e.target.value);
				}}
			/>
			<button
				className="bg-white m-2"
				onClick={() => addData("users", { name: userName })}
			>
				Upload Data
			</button>
			<button
				className="bg-white m-2"
				onClick={() => console.log(getData("users"))}
			>
				Get Data
			</button>
		</div>
	);
}
