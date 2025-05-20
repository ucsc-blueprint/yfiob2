// app/quiz-results/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "../../components/Navbar/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import CareersCard from "../../components/Careers_Card/CareersCard";
import {
  ChevronDownIcon,
  RefreshIcon,
  ShareIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { getTopKIndustries, getCareersForIndustry } from "../../../backend/matchingAlgorithm/matchingAlgo";


export default function QuizResultsPage() {
  const [industries, setIndustries] = useState([]);
  const [careers, setCareers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      getTopKIndustries("Akshay").then((industries) => {
        console.log("Top K Industries:", industries);
        setIndustries(industries);
        
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCareers = async () => {
      if (industries.length > 0) {
        const topIndustry = industries[industries.length - 1][0];
        getCareersForIndustry(topIndustry).then((careers) => {
          console.log("Careers for Top Industry:", careers);
          setCareers(careers);
        });
      }
    }
    if (industries.length > 0) {
      fetchCareers();
    }

  }, [industries]);

  
  // Static data
  console.log("Industries:", industries);

  const colors = ["#C8E6C9", "#A5D6A7", "#4CAF50"];
  const chartData = industries.map((industry, index) => ({
    name: industry[0],
    value: industry[1],
    fill: colors[index % colors.length],
  })
  );
  
  

  const topJobs = [
    { title: "Agricultural Architect", description: "Design sustainable farm layouts and eco-friendly irrigation systems.", imageUrl: "/jigna-small.svg" },
    { title: "Farm Manager", description: "Oversee daily operations, budgeting, and crop planning on a commercial farm.", imageUrl: "/jigna-small.svg" },
    { title: "Soil Conservationist", description: "Work with landowners to protect soil health and prevent erosion.", imageUrl: "/jigna-small.svg" },
    { title: "Agricultural Engineer", description: "Develop agricultural machinery and automation solutions.", imageUrl: "/jigna-small.svg" },
  ];

  const otherJobsTitles = [
    "Environmental Scientist","Hydrologist","Food Scientist","Landscape Designer",
    "Wildlife Biologist","Agricultural Economist","Conservation Officer","Forestry Technician"
  ];
  const otherJobs = otherJobsTitles.map(title => ({
    title,
    description: "",
    imageUrl: "/jigna-small.svg",
  }));

  const [shareEmail, setShareEmail] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareModalEmail, setShareModalEmail] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Top controls */}
      <div className="flex items-center justify-between px-4 py-6">
        <button
          className="flex items-center text-blue-600 border border-blue-600 rounded px-4 py-2 hover:bg-blue-50 transition"
        >
          Quiz results on 10/9/2025
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </button>
        <div className="flex space-x-2">
          <Link
            href="/take-quiz"
            className="flex items-center border border-blue-600 text-blue-600 rounded px-4 py-2 hover:bg-blue-50 transition"
          >
            <RefreshIcon className="mr-2 h-4 w-4" />
            Retake Quiz
          </Link>
          <button
            className="flex items-center border border-blue-600 text-blue-600 rounded px-4 py-2 hover:bg-blue-50 transition"
            onClick={() => setShowShareModal(true)}
          >
            <ShareIcon className="mr-2 h-4 w-4" />
            Share
          </button>
        </div>
      </div>

      {/* Full-screen hero */}
      <section className="flex flex-col items-center justify-center bg-white min-h-[calc(100vh-80px)] px-4">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold">Your Most Ideal Career Pathway Is:</h2>
            <h1 className="mt-4 text-5xl font-bold">{industries.length > 0 && industries[industries.length - 1][0]}</h1>
          </div>
          <img
            src="/assets/ResultsPuzzlePiece.svg"
            alt="Puzzle piece"
            className="w-40 h-auto mt-6 md:mt-0 md:ml-8"
          />
        </div>
        <div className="w-full max-w-4xl h-80 mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 0, left: 0, bottom: 60 }}
              barGap={0}
              barCategoryGap="-20%"
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                interval={0}
                height={60}
                tick={{ fill: "#555", fontSize: 16 }}
              />
              <Tooltip formatter={val => `${val}%`} cursor={false} />
              <Bar dataKey="value" isAnimationActive={false} barSize={140}>
                {chartData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.fill} />
                ))}
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={val => `${val}%`}
                  style={{ fill: "#333", fontWeight: 700, fontSize: 18 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <h3 className="text-center text-2xl font-bold">
            Your top job recommendations for{" "}
            <span className="font-extrabold text-green-700">
          {industries.length > 0 && industries[industries.length - 1][0]}
            </span>
          </h3>
      </section>


        {/* Green cards section */}
      <section className="bg-green-50 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {careers.map((job, i) => (
            <CareersCard key={i} title={job} description={""} educationLevel={""}/>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center px-4">
          <div>
            <p className="italic mb-2">Interested in gaining experience?</p>
            <p className="mb-4 text-gray-700">
              Visit the YFIOB page for info on Work Based Learning Events!
            </p>
            <Link
              href="https://yfiob.example.com"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
            >
              YFIOB Page
            </Link>
          </div>
          <div>
            <p className="italic mb-2">Share your results!</p>
            <div className="flex justify-center mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded-l px-4 py-2 w-64 focus:outline-none"
                value={shareEmail}
                onChange={e => setShareEmail(e.target.value)}
              />
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-r-full hover:bg-blue-700 transition"
                onClick={() => console.log("Send to:", shareEmail)}
              >
                Send &rarr;
              </button>
            </div>
          </div>
          <div>
            <p className="italic mb-2">Not Happy with your Results?</p>
            <p className="mb-4 text-gray-700">Take the quiz again here!</p>
            <Link
              href="/take-quiz"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
            >
              Retake Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* White heading for other recs */}
      <section className="bg-white pb-8">
        <h4 className="text-center text-2xl font-semibold">
          Your other career recommendations
        </h4>
      </section>

      {/* Gray grid section with extra top padding */}
      <section className="bg-gray-100 pt-16 px-4 pb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        </div>
      </section>

      {/* Modal for sharing results */}
      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
            <h2 className="text-2xl font-semibold mb-4 italic">Share your results!</h2>
            <input
              type="email"
              placeholder="Enter your email"
              className="border-2 border-blue-400 rounded-lg px-4 py-3 w-full mb-6 focus:outline-none focus:border-blue-600 text-lg"
              value={shareModalEmail}
              onChange={e => setShareModalEmail(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="flex-1 border-2 border-red-400 text-red-500 rounded-full py-2 mr-2 text-lg font-semibold hover:bg-red-50 transition"
                onClick={() => setShowShareModal(false)}
              >
                Cancel <span className="ml-1">✗</span>
              </button>
              <button
                className="flex-1 bg-blue-600 text-white rounded-full py-2 ml-2 text-lg font-semibold flex items-center justify-center hover:bg-blue-700 transition"
                onClick={() => {
                  // handle send logic here
                  setShowShareModal(false);
                }}
              >
                Send <PaperAirplaneIcon className="ml-2 mb-1 h-4 w-4 rotate-45" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
