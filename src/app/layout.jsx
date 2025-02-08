import "./global.css";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link
					href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
					rel="stylesheet"
				/>
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
