import React from "react";

import YFIOBLogo from "../assets/YFIOBLogo.png";

export const Navbar = () => {
	return (
		<div className="flex p-6 bg-white shadow-md font-lato">
			<div className="py-2 grow-[100]">
				<img width={170} src={YFIOBLogo} alt="YFIOB Logo" />
			</div>
			<div className="flex">
				<div className="flex-row content-center px-3 hover:text-[#4C78E7] py-1">
					<button>Home</button>
				</div>
				<div className="flex-row content-center px-3 hover:text-[#4C78E7] py-1">
					<button>Take Quiz!</button>
				</div>
				<div className="flex-row content-center px-3 hover:text-[#4C78E7] py-1">
					<button>Explore Careers</button>
				</div>
			</div>
			<div className="flex-row content-center px-8">
				<div className="bg-[#4C78E757] p-3 px-5 rounded-full hover:text-slate-100">
					<button>Log In</button>
				</div>
			</div>
		</div>
	);
};
