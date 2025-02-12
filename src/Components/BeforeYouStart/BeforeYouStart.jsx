"use client";
import { BrowserRouter } from "react-router-dom";
import ArrowIcon from '../../assets/Arrow.svg'; // Adjust the path as needed
export const BeforeYouStart = () => {
  // Create a style object that sets the background image to the imported ArrowIcon.
  const selectStyle = {
    backgroundImage: `url(${ArrowIcon})`,
  };
  return (
    <BrowserRouter>
      <div>
        {/* Background container with radial gradients */}
        <div
          className="[background:radial-gradient(circle_at_0%_90%,rgba(76,120,231,0.1)_0%,rgba(76,120,231,0)_100%),radial-gradient(circle_at_120%_18.89%,rgba(71,183,73,0.1)_0%,rgba(255,255,255,0)_80%] h-screen w-full"
        >
          {/* Header */}
          <div className="pt-[5%] font-lato text-[40px] font-normal leading-[48px] text-center [text-underline-position:from-font] [text-decoration-skip-ink:none]">
            Before You Start Answering
          </div>
          {/* Dropdown container */}
          <div className="pt-[10%]">
            <select
              name="School"
              id="School"
              style={selectStyle}
              className="
                appearance-none
                w-[502px]
                h-[61px]
                flex flex-col items-center gap-[15px]
                m-auto mb-[1%]
                font-lato text-[20px] italic font-normal leading-[24px] text-center
                p-[15px]
                text-[#898989]
                border-2 border-[#8989897D] rounded-[20px]
                bg-white
                bg-no-repeat
                [background-position:right_15px_center]
                [background-size:20px]
                [text-underline-position:from-font]
                [text-decoration-skip-ink:none]
              "
            >
              <option selected disabled>
                school
              </option>
              <option>School 1</option>
              <option>School 2</option>
              <option>School 3</option>
            </select>
            <select
              name="Grade"
              id="Grade"
              style={selectStyle}
              className="
                appearance-none
                w-[502px]
                h-[61px]
                flex flex-col items-center gap-[15px]
                m-auto mb-[1%]
                font-lato text-[20px] italic font-normal leading-[24px] text-center
                p-[15px]
                text-[#898989]
                border-2 border-[#8989897D] rounded-[20px]
                bg-white
                bg-no-repeat
                [background-position:right_15px_center]
                [background-size:20px]
                [text-underline-position:from-font]
                [text-decoration-skip-ink:none]
              "
            >
              <option selected disabled>
                grade
              </option>
              <option value="K-5">K-5</option>
              <option value="6-8">6-8</option>
              <option value="9-12">9-12</option>
            </select>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default BeforeYouStart;