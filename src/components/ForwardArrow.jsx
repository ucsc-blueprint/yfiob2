import * as React from "react";
const ForwardArrow = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={16}
		height={28}
		fill="none"
		{...props}
	>
		<path
			fill="#000000"
			fillRule="evenodd"
			d="M11.707 14 .51 2.804 2.75.565l12.315 12.316a1.583 1.583 0 0 1 0 2.238L2.75 27.435l-2.24-2.24L11.708 14Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default ForwardArrow;
