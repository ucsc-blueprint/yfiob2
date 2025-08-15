const Assessment_pg = () => {
    return (
        <div className="flex flex-col items-center w-[90%] ml-[5%] mt-[10%] h-[53%] bg-white relative font-secondary rounded-3xl shadow-2xl">
            <div className="flex flex-col items-center space-y-9 p-8 mt-[3%]">
                <h1 className="text-3xl">
                    Let us show how your interests connect different career fields!
                </h1>
                <p className="text-[21.94px]">
                    Take this quiz to get ideads and inspiration for your career path.
                </p>
            </div>

            <button className="bg-[#47B749] bg-opacity-[.34] rounded-full w-[28.6%] h-[14.3%] text-[21px]">
                Quick Quiz
            </button>
            <div className="relative w-full">
                <img
                    src="jignaSmall.png"
                    className="absolute left-0 ml-4 w-[10%]"
                    alt="jigna small"
                />
                <div className="flex items"></div>
            </div>

            <p className="mt-auto bottom-0 mb-[3.6%] italic text-[19px]">
                This quiz consists of 6 questions, but will not necessarily represent who you
                are in the future.
            </p>
        </div>
    );
};

export default Assessment_pg;
