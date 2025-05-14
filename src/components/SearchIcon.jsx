import * as React from "react";
const SearchIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={33}
		height={33}
		fill="none"
		{...props}
	>
		<g clipPath="url(#searchIcon)">
			<path
				fill="#000"
				d="M24.218 21.335a13.406 13.406 0 1 0-2.881 2.883h-.003c.06.082.128.162.203.237l7.94 7.94a2.063 2.063 0 0 0 2.919-2.916l-7.941-7.94a2.041 2.041 0 0 0-.237-.204Zm.532-7.929a11.343 11.343 0 1 1-22.687 0 11.343 11.343 0 0 1 22.687 0Z"
			/>
		</g>
		<defs>
			<clipPath id="searchIcon">
				<path fill="#fff" d="M0 0h33v33H0z" />
			</clipPath>
		</defs>
	</svg>
);
export default SearchIcon;
