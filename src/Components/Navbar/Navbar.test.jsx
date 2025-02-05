import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar.jsx";

test("Navbar rendered", async () => {
	render(<Navbar />);

	screen.getAllByText("Home");
	screen.getAllByText("Take Quiz!");
	screen.getAllByText("Explore Careers");
	screen.getAllByText("Log In");
});
