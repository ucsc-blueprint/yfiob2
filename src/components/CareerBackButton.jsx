import BackArrow from "./BackArrow";

function CareerBackButton({ children, src }) {
    return (
        <div className="absolute top-28 left-[64px]">
            <button className="shadow-md flex items-center gap-2 px-2 py-3 h-[41px] bg-[#4C78E7] rounded-lg border-2 border-[#516FBE] text-white font-bold transition-all duration-200 hover:bg-blue-500">
                <a href={src}>
                    <span className="flex items-center">
                        <div style={{ transform: "scale(0.9)" }}>
                            <BackArrow />
                        </div>
                        <div className="pl-2">{children}</div>
                    </span>
                </a>
            </button>
        </div>
    );
}

export default CareerBackButton;
