import * as React from "react";
const FileExportIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
        <mask
            id="a1234"
            width={24}
            height={24}
            x={0}
            y={0}
            maskUnits="userSpaceOnUse"
            style={{
                maskType: "alpha",
            }}
        >
            <path fill="#D9D9D9" d="M0 0h24v24H0z" />
        </mask>
        <g mask="url(#a1234)">
            <path
                fill="currentcolor"
                d="m5.05 22.375-1.4-1.425L6.6 18H4.35v-2H10v5.65H8v-2.225l-2.95 2.95ZM12 22v-2h6V9h-5V4H6v10H4V4c0-.55.196-1.02.587-1.413A1.926 1.926 0 0 1 6 2h8l6 6v12c0 .55-.196 1.02-.588 1.413A1.926 1.926 0 0 1 18 22h-6Z"
            />
        </g>
    </svg>
);
export default FileExportIcon;
