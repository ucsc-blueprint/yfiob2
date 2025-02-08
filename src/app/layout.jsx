import "./global.css";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<link rel="icon" href="../assets/YFIOBLogo.png" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>YFIOB</title>
				<meta name="description" content="Web site created..." />
			</head>
			<body>
				<div id="root">{children}</div>
			</body>
		</html>
	);
}
