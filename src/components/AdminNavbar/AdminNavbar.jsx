import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, getAuth } from "firebase/auth";
import Image from "next/image";

export default function AdminNavbar({page}) {
	const [isOpen, setIsOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const router = useRouter();
	const authInstance = getAuth();

	const handleLogout = async () => {
			try {
				await signOut(authInstance);
				alert("Logout successful!");
				router.push("/login");
			} catch (error) {
				alert("Logout failed: " + error.message);
			}
		};
	

	return (
		<>
			<div className="px-6 h-20 shadow-md flex flex-row justify-between items-center w-full">
				<div className="font-bold py-2 z-30">
					<Link href={"/"}>
						<Image
							width={170}
							height={20}
							priority
							src="/assets/YFIOBLogo.png"
							alt="YFIOB Logo"
							aria-label="Logo"
						/>
					</Link>
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
                <div className="font-secondary flex gap-30 text-[1.1em] p-0">
                    <Link href={"/admin/insights"} className={`px-3 py-2 mx-1 w-[180px] ${(page == 'insights') ? 'text-[#1A6567] border-b border-[#1A6567] text-center font-bold' : 'border-transparent hover:text-[#1A6567] border-b hover:border-[#1A6567] text-center'}`}>
                        Insights
                    </Link>
                    <Link
                        href={"/admin/jobs"} className={`px-3 py-2 mx-1 w-[180px] ${(page == 'jobs') ? 'text-[#1A6567] border-b border-[#1A6567] text-center font-bold' : 'border-transparent hover:text-[#1A6567] border-b hover:border-[#1A6567] text-center'}`}
                    >
                        Jobs
                    </Link>
                    <Link
                        href={"/admin/students"} className={`px-3 py-2 mx-1 w-[180px] ${(page == 'students') ? 'text-[#1A6567] border-b border-[#1A6567] text-center font-bold' : 'border-transparent hover:text-[#1A6567] border-b hover:border-[#1A6567] text-center'}`}
                    >
                        Students
                    </Link>
                </div>
				<div className="flex hidden md:flex px-6 relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`flex items-center justify-center w-[180px] h-[62px] text-[20px] font-semibold font-primary ${
                                isDropdownOpen
                                    ? "bg-[#1A6567] text-white rounded-t-[10px] rounded-b-none"
                                    : "bg-[#1A6567] text-white rounded-[10px]"
                            } shadow-md transition-all`}
                        >
                            <span className="font-primary">Admin</span>
                            <span className="ml-2">
                                {isDropdownOpen ? (
                                    <svg
                                        width="36"
                                        height="36"
                                        viewBox="0 0 36 36"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <mask
                                            id="mask0_3691_9458"
                                            style={{ maskType: "alpha" }}
                                            maskUnits="userSpaceOnUse"
                                            x="0"
                                            y="0"
                                            width="36"
                                            height="36"
                                        >
                                            <rect width="36" height="36" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_3691_9458)">
                                            <path
                                                d="M18 16.2L11.1 23.1L9 21L18 12L27 21L24.9 23.1L18 16.2Z"
                                                fill="white"
                                            />
                                        </g>
                                    </svg>
                                ) : (
                                    <svg
                                        width="36"
                                        height="36"
                                        viewBox="0 0 36 36"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <mask
                                            id="mask0_3691_9458"
                                            style={{ maskType: "alpha" }}
                                            maskUnits="userSpaceOnUse"
                                            x="0"
                                            y="0"
                                            width="36"
                                            height="36"
                                        >
                                            <rect width="36" height="36" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_3691_9458)">
                                            <path
                                                d="M18 19.8L24.9 12.9L27 15L18 24L9 15L11.1 12.9L18 19.8Z"
                                                fill="white"
                                            />
                                        </g>
                                    </svg>
                                )}
                            </span>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute left-6 top-[100%] -mt-[1px] w-[180px] bg-white border border-[#1A6567] rounded-b-[10px] shadow-md">
                                {/* Header */}

                                <div className="flex flex-col">
                                    <button
                                        className="flex items-center text-[#EB5757] text-[18px] p-4 hover:bg-gray-100"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="ml-auto"
                                        >
                                            <path
                                                d="M2 18C1.45 18 0.979333 17.8043 0.588 17.413C0.196667 17.0217 0.000666667 16.5507 0 16V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H9V2H2V16H9V18H2ZM13 14L11.625 12.55L14.175 10H6V8H14.175L11.625 5.45L13 4L18 9L13 14Z"
                                                fill="#E74C4C"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
					
			{/* Mobile Menu */}
            <div
                className={`absolute z-0 left-0 w-full bg-white shadow-md flex flex-col items-center transition-transform duration-300 md:hidden p-6 ${
                    isOpen ? "translate-y-40" : "-translate-y-[200%]"
                }`}
            >
                <Link
                    href={"/admin/insights"}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-black hover:text-[#1A6567] p-2"
                >
                    Insights
                </Link>
                <Link
                    href={"/admin/jobs"}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-black hover:text-[#1A6567] p-2"
                >
                    Jobs
                </Link>
				<Link
                    href={"/admin/students"}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-black hover:text-[#1A6567] p-2"
                >
                    Students
                </Link>
                    <Link
                        href="/admin/insights" //Can create a dropdown menu here
                        onClick={() => setIsOpen(false)}
                        className="text-lg text-white bg-[#1A6567] px-5 py-2 rounded-[10px] m-2"
                    >
                        Admin
                    </Link>
			</div>
			</div>
		</>
	);
}
