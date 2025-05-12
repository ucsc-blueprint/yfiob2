import Image from "next/image";
import React from "react";

const backgroundColor = {
    "elementary-school": "bg-[#2CA9F6]",
    "middle-school": "bg-[#75D122]",
    "high-school": "bg-[#FF9E1E]",
};

export const CareersCard = ({ title, description, grade, image }) => {
    return (
        <a href={`/careers/${grade}/${title}`}>
            <div
                className={`no-scrollbar overflow-y-hidden rounded-[10px] w-[317px] h-[366px] font-kumbh bg-white shadow-md`}
            >
                <header
                    className={`${backgroundColor[grade]} flex w-full py-2 justify-center text-[22px] font-semibold text-white h-[99px] items-center`}
                >
                    <div>{title}</div>
                </header>
                <div className="h-[150px] w-full relative my-[13px]">
                    <Image fill src={image} style={{ objectFit: "contain" }} alt={title} />
                </div>
                <div className="text-[14px] w-full px-[26px] pb-[13px]">
                    <p>{description}</p>
                </div>
            </div>
        </a>
    );
};

export default CareersCard;
