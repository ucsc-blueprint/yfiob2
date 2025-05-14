import * as React from "react";
const SortIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={33}
		height={34}
		fill="none"
		{...props}
	>
		<g fill="#000" clipPath="url(#sortIcon)">
			<path
				fillRule="evenodd"
				d="m20.794 12.109-.862 2.828h-2.199l3.69-10.998h2.545l3.674 10.998h-2.31l-.864-2.828h-3.674Zm3.238-1.619-1.345-4.449h-.096l-1.345 4.449h2.786Z"
				clipRule="evenodd"
			/>
			<path d="M26.73 29.375h-8.11V27.95l5.32-7.673v-.111h-5.175v-1.788h7.806v1.425l-5.294 7.672v.112h5.455l-.002 1.788ZM9.281 5.656a1.031 1.031 0 0 0-2.062 0v20.198L4.855 23.49a1.032 1.032 0 0 0-1.46 1.46l4.125 4.123.014.014a1.025 1.025 0 0 0 1.444-.012l4.125-4.125a1.032 1.032 0 1 0-1.458-1.46l-2.364 2.365V5.656Z" />
		</g>
		<defs>
			<clipPath id="sortIcon">
				<path fill="#fff" d="M0 .5h33v33H0z" />
			</clipPath>
		</defs>
	</svg>
);
export default SortIcon;
