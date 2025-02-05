import { useState } from "react";
import YFIOBLogo from "../../assets/YFIOBLogo.png";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="bg-white shadow-md font-lato">
			<div className="flex items-center justify-between p-6  md:h-auto">
				{/* Logo */}
				<div className="py-2 grow-[100] z-30">
					<NavLink to={"/"}>
						<img width={170} src={YFIOBLogo} alt="YFIOB Logo" />
					</NavLink>
				</div>

				{/* Hamburger Menu */}
				<button
					className="w-12 h-16 flex items-center justify-center md:hidden"
					onClick={() => setIsOpen(!isOpen)}
				>
					<div className="space-y-2">
						<span
							className={`block h-0.5 bg-black rounded-full transition-all duration-300 ${
								isOpen ? "w-8 rotate-45 translate-y-2.5" : "w-8"
							}`}
						/>
						<span
							className={`block h-0.5 bg-black rounded-full transition-all duration-300 ${
								isOpen ? "opacity-0" : "opacity-100"
							}`}
						/>
						<span
							className={`block h-0.5 bg-black rounded-full transition-all duration-300 ${
								isOpen ? "w-8 -rotate-45 -translate-y-2.5" : "w-8"
							}`}
						/>
					</div>
				</button>

				{/* Navigation Links - Desktop */}
				<div className="hidden md:flex space-x-6">
					<NavLink to="/" className="px-3 hover:text-[#4C78E7] py-1">
						Home
					</NavLink>
					<NavLink to="/take-quiz" className="px-3 hover:text-[#4C78E7] py-1">
						Take Quiz!
					</NavLink>
					<NavLink to="/explore-careers" className="px-3 hover:text-[#4C78E7] py-1">
						Explore Careers
					</NavLink>
				</div>

				{/* Log In Button - Desktop */}
				<div className="hidden md:flex px-8">
					<div className="bg-[#4C78E757] p-3 px-5 rounded-full hover:text-slate-100">
						<NavLink to="/login">Log In</NavLink>
					</div>
				</div>
			</div>

			{/* Navigation Links - Mobile */}

			<div
				className={`absolute border-t top-20 z-0 left-0 w-full bg-white shadow-md flex flex-col items-center  transition-transform duration-300 md:hidden p-6 ${
					isOpen ? "translate-y-8" : "-translate-y-[200%]"
				}`}
			>
				<NavLink
					to="/"
					onClick={() => setIsOpen(false)}
					className="text-lg text-black hover:text-blue-600 z-0 p-2"
				>
					Home
				</NavLink>
				<NavLink
					to="/take-quiz"
					onClick={() => setIsOpen(false)}
					className="text-lg text-black hover:text-blue-600 z-10 p-2"
				>
					Take Quiz!
				</NavLink>
				<NavLink
					to="/explore-careers"
					onClick={() => setIsOpen(false)}
					className="text-lg text-black hover:text-blue-600 z-10 p-2"
				>
					Explore Careers
				</NavLink>
				<NavLink
					to="/login"
					onClick={() => setIsOpen(false)}
					className="text-lg text-black bg-[#4C78E757] px-5 py-2 rounded-full hover:text-white z-10 m-2"
				>
					Log In
				</NavLink>
			</div>
		</div>
	);
};
