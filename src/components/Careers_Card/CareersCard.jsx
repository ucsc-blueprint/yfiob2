import Image from "next/image";
import React from "react";

const backgroundColor = {
    "elementary-school": "bg-[#2CA9F6]",
    "middle-school": "bg-[#75D122]",
    "high-school": "bg-[#FF9E1E]",
};

const jignaHue = {
    "elementary-school": "hue-rotate(20deg)",
    "middle-school": "hue-rotate(270deg)",
    "high-school": "hue-rotate(200deg)",
};

export const CareersCard = ({
    title,
    description,
    grade,
    image = "/characters/Template.svg",
    href,
}) => {
    return (
        <a href={href}>
            <div
                className={`no-scrollbar overflow-y-hidden rounded-[10px] w-[317px] h-[366px] bg-white shadow-md`}
            >
                <header
                    className={`${backgroundColor[grade]} flex w-full py-2 justify-center text-[22px] font-semibold text-white h-[99px] items-center text-center font-primary`}
                >
                    <div>{title}</div>
                </header>
                <div className="h-[150px] w-full relative my-[13px]">
                    <Image
                        fill
                        src={image ?? "/assets/jigna.svg"}
                        style={{ objectFit: "contain", filter: jignaHue[grade] }}
                        alt={title}
                    />
                </div>
                <div className="text-[14px] w-full px-[26px] pb-[13px] font-secondary">
                    <p>
                        {description ??
                            "Consectetur esse non ipsum irure elit elit officia nisi cillum non cupidatat. "}
                    </p>
                </div>
            </div>
        </a>
    );
};

export default CareersCard;
