import React from "react";

import YFIOBLogo from "../assets/YFIOBLogo.png";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="flex p-6 bg-white shadow-md font-lato">
			<div className="py-2 grow-[100]">
				<NavLink to={"/"}>
					<img width={170} src={YFIOBLogo} alt="YFIOB Logo" />
				</NavLink>
			</div>
			<div className="flex">
				<div className="flex-row content-center px-3 hover:text-[#4C78E7] py-1">
					<NavLink to={"/"}>Home</NavLink>
				</div>
				<div className="flex-row content-center px-3 hover:text-[#4C78E7] py-1">
					<NavLink to={"/take-quiz"}>Take Quiz!</NavLink>
				</div>
				<div className="flex-row content-center px-3 hover:text-[#4C78E7] py-1">
					<NavLink to={"/explore-careers"}>Explore Careers</NavLink>
				</div>
			</div>
			<div className="flex-row content-center px-8">
				<div className="bg-[#4C78E757] p-3 px-5 rounded-full hover:text-slate-100">
					<NavLink to={"/login"}>Log In</NavLink>
				</div>
			</div>
		</div>
	);
};
