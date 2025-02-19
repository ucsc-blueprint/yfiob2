import * as React from "react";
const BackArrow = (props) => (
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
			d="m4.294 14 11.195 11.195-2.239 2.24L.935 15.118a1.583 1.583 0 0 1 0-2.239L13.25.565l2.24 2.239L4.293 13.999Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default BackArrow;
