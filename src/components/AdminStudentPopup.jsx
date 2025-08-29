import { useState } from "react";
import deleteData from "../utils/deleteData";
import getData from "../utils/getData";
import ForwardArrow from "./ForwardArrow";
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
    LabelList,
    YAxis,
} from "recharts";

function BarCharts({ data }) {
    console.log(data);

    return (
        <div className="flex justify-center items-center w-full bg-white py-6 rounded-br-md">
            <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
                        barGap={20}
                        barCategoryGap={"30%"}
                    >
                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            domain={[0, 50]}
                            tick={false}
                        />
                        <YAxis
                            dataKey="name"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            width={0}
                            tick={false}
                        />
                        <Tooltip formatter={(val) => `${val}%`} cursor={false} />
                        <Bar
                            dataKey="value"
                            isAnimationActive={false}
                            barSize={40}
                            radius={[0, 6, 6, 0]}
                        >
                            {data.map((entry, idx) => (
                                <Cell key={idx} fill={entry.fill} />
                            ))}
                            <LabelList
                                dataKey="name"
                                position="insideLeft"
                                dx={10}
                                style={{
                                    fill: "#444",
                                    fontWeight: 700,
                                    fontSize: 18,
                                    textAnchor: "start",
                                }}
                            />
                            <LabelList
                                dataKey="value"
                                position="right"
                                formatter={(val) => `${val}%`}
                                style={{
                                    fill: "#444",
                                    fontWeight: 700,
                                    fontSize: 22,
                                }}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

function ContentRow({ title, content }) {
    return (
        <div className="m-2">
            <div className="grid grid-cols-5">
                <p className="col-span-1 ml-2">{title}</p>
                {content.map((data, idx) => (
                    <div
                        key={idx}
                        className={`col-span-${Math.floor(
                            4 / content.length
                        )} mx-1 py-1 px-2 bg-[#F0F0F0] rounded-md`}
                        style={{
                            gridColumn: `span ${Math.floor(
                                4 / content.length
                            )} / span ${Math.floor(4 / content.length)}`,
                        }}
                    >
                        {data}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function AdminStudentPopup({
    shown,
    setShown,
    studentData,
    setData,
    topIndustries,
}) {
    const [loading, setLoading] = useState(false);

    function Header({ name, id }) {
        return (
            <div>
                <div className="flex justify-between m-4 items-center">
                    <ForwardArrow style={{ transform: "rotate(180deg)" }} />
                    <div className="flex justify-between grow items-center">
                        <div className="ml-3">
                            <span className="font-black text-xl">{name}</span>
                            <p>ID {id}</p>
                        </div>
                        <div className="mx-3">
                            <button className="flex transition-all duration-100 border-[#E74C4C] border rounded-md p-2 hover:shadow-md">
                                <p
                                    className="text-[#E74C4C]"
                                    onClick={async () => {
                                        setLoading(true);
                                        await deleteData("users", id);
                                        await getData("users").then(setData);
                                        setShown(false);
                                        setLoading(false);
                                    }}
                                >
                                    Delete Account
                                </p>
                            </button>
                        </div>{" "}
                    </div>
                    <ForwardArrow />
                </div>
                <div className="h-[1px] w-full bg-black" />
            </div>
        );
    }

    if (!shown) return null;

    console.log(topIndustries);

    return (
        <>
            {loading ? (
                <div className="fixed top-0 left-0 h-screen w-screen z-50 bg-black/50">
                    <div className="w-full h-full flex justify-center items-center text-white text-3xl">
                        Deleting Doccument...
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div
                className="fixed top-0 left-0 w-screen h-screen z-40 backdrop-blur-md bg-black/50"
                onClick={(e) => {
                    if (e.target === e.currentTarget) setShown(false);
                }}
            >
                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 w-1/3 bg-white rounded-md">
                    <div className="flex flex-col">
                        <Header
                            name={`${studentData.firstName} ${studentData.lastName}`}
                            id={studentData.id}
                        />
                        <ContentRow
                            title={"Name"}
                            content={[
                                studentData.firstName ?? "None",
                                studentData.lastName ?? "None",
                            ]}
                        />
                        <ContentRow title={"Email"} content={[studentData.email ?? "None"]} />
                        <ContentRow
                            title={"School"}
                            content={[studentData.school ?? "None"]}
                        />
                        <ContentRow title={"Grade"} content={[studentData.grade ?? "None"]} />
                        <ContentRow
                            title={"Zipcode"}
                            content={[studentData.zipcode ?? "None"]}
                        />
                        <div className="flex">
                            <div className="flex justify-center items-center text-center">
                                Quiz Results
                            </div>
                            <BarCharts data={topIndustries} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
