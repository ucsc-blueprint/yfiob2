"use client";
import { Navbar } from "../../components/Navbar/Navbar";
import React, { useState } from "react";
import { CareerSummaryCards } from "../../pages/CareerSummaryCards";
import { link } from "next/link";

// Components
const BackButton = () => (
  <button
    className="flex items-center gap-2 px-6 py-3 min-w-[164px] h-[41px] bg-blue-600 rounded-lg border-2 border-blue-700 text-white font-bold transition-all duration-200 hover:bg-blue-500"
  >
    <a href="/choose-grade-level">
      <span>Back to Grade Levels</span>
    </a>
  </button>
);

const HeaderSection = ({ title = "Explore Careers", subtitle = "Choose a career area to begin!" }) => (
  <div className="flex flex-col items-center justify-center w-full max-w-xl min-w-[320px] p-5 mx-auto bg-orange-300">
    <h1 className="font-medium text-4xl text-black text-center">{title}</h1>
    <h2 className="font-medium text-2xl text-black text-center mt-5">{subtitle}</h2>
  </div>
);

export default function ChooseCareers() {
  const [index, setIndex] = useState(0);

  const cardData = [
    {
      title: "Building and Construction Trades",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al",
      isElementary: false,
      careerImage: "/images/construction.jpg",
    },
    {
      title: "Arts, Media, and Entertainment",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al",
      isElementary: false,
      careerImage: "/images/arts.jpg",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="w-full bg-orange-300 flex flex-col items-center">
        <BackButton />
        <HeaderSection title="Grades 9 -12" subtitle="Explore Careers" />
        <a href ="/explore-careers">
        <CareerSummaryCards
          Industry="Career Areas"
          CardData={cardData}
          Level="high"
          Index={index}
          SetIndex={setIndex}
          TotalIndustries={cardData.length}
        />
        </a>
      </div>
    </div>
  );
}
