import * as React from "react";
const FilterIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={33}
		height={34}
		fill="none"
		{...props}
	>
		<g fill="#000" clipPath="url(#filterIcon)">
			<path d="M16.5 31.438a14.438 14.438 0 1 1 0-28.876 14.438 14.438 0 0 1 0 28.875Zm0 2.062a16.5 16.5 0 1 0 0-33 16.5 16.5 0 0 0 0 33Z" />
			<path d="M14.438 24.219a1.031 1.031 0 0 1 1.03-1.032h2.063a1.031 1.031 0 1 1 0 2.063H15.47a1.031 1.031 0 0 1-1.031-1.031Zm-4.126-6.188A1.031 1.031 0 0 1 11.345 17h10.312a1.031 1.031 0 1 1 0 2.063H11.344a1.031 1.031 0 0 1-1.031-1.032Zm-4.124-6.187a1.031 1.031 0 0 1 1.03-1.031h18.563a1.031 1.031 0 1 1 0 2.062H7.22a1.031 1.031 0 0 1-1.032-1.031Z" />
		</g>
		<defs>
			<clipPath id="filterIcon">
				<path fill="#fff" d="M0 .5h33v33H0z" />
			</clipPath>
		</defs>
	</svg>
);
export default FilterIcon;
