import Link from "next/link";
import LockIcon from "../../components/LockIcon";
import Image from "next/image";

export default function AdminNavbar() {
	return (
		<>
			<div className="h-20 shadow-md flex flex-row justify-center items-center w-full">
				<div className="grow m-4">
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
				<div className="flex flex-row grow justify-center">
					<div className="flex flex-row">
						<Link href="/admin/insights">
							<button className="p-4">Insights</button>
						</Link>
						<button className="p-4">Quiz</button>
						<button className="p-4">Students</button>
					</div>
				</div>
				<div className="grow flex justify-end">
					<button className="m-4 px-4 py-2 bg-[#4C78E7] rounded-full text-white flex">
						Admin
						<LockIcon className="mx-2" style={{ transform: "scale(0.7)" }} />
					</button>
				</div>
			</div>
		</>
	);
}
