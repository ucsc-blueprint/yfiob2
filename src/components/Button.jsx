export const Button = ({ text, size, onClick }) => {
    // Button size is dependent on text-size
    if (size === "small") {
        return (
            <button
                className="text-white font-secondary font-normal text-[1.125rem] bg-[#4C78E7] w-max p-4 pl-8 pr-8 rounded-[30px]"
                onClick={onClick}
            >
                {text}
            </button>
        );

        // Button size is based on parent container
    } else if (size === "big") {
        return (
            <button
                className="text-white font-secondary text-center w-full font-normal text-[1.3rem] bg-[#4C78E7] p-4 pl-8 pr-8 rounded-[30px]"
                onClick={onClick}
            >
                {text}
            </button>
        );
    }
};

export default Button;
