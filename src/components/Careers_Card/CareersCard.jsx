import Image from "next/image";
import React from "react";

const backgroundColor = {
    "elementary-school": "darkBlue",
    "middle-school": "darkGreen",
    "high-school": "darkOrange",
};

const jignaColor = {
  "elementary-school": {
    "#A8E6F1": "#A8E6F1", // example alt light color
    "#185D6D": "#185D6D", // example alt dark color
  },
  "middle-school": {
    "#A8E6F1": "#D8EF88", // light blue → yellow
    "#185D6D": "#4F5C25", // dark blue → brown
  },
  "high-school": {
    "#A8E6F1": "#FFD969", // light blue → lavender
    "#185D6D": "#824014", // dark blue → deep purple
  },
};

const jignaHue = {
    "elementary-school": "hue-rotate(20deg)",
    "middle-school": "hue-rotate(270deg)",
    "high-school": "hue-rotate(200deg)",
};

export const CareersCard = ({
    title,
    description,
    grade="default",
    image = "/characters/Template.svg",
    href,
}) => {

    return (
        <a href={href}>
            <div
                className={`border-2 border-${backgroundColor[grade]} no-scrollbar overflow-y-hidden rounded-[10px] w-[317px] h-[366px] font-primary bg-white shadow-md`}
            >
                <header
                    className={`bg-${backgroundColor[grade]} flex w-full py-2 justify-center text-[22px] font-semibold text-white h-[99px] items-center text-center font-primary`}
                >
                    <div> {title} </div>
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
