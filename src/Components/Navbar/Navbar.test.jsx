import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "./Navbar.jsx";

test("Navbar rendered", async () => {
	render(
		<MemoryRouter>
			<Navbar />
		</MemoryRouter>
	);

	screen.getAllByText("Home");
	screen.getAllByText("Take Quiz!");
	screen.getAllByText("Explore Careers");
	screen.getAllByText("Login");

	fireEvent.click(screen.getByText("Home"));
	fireEvent.click(screen.getByText("Take Quiz!"));
	fireEvent.click(screen.getByText("Explore Careers"));
	fireEvent.click(screen.getByText("Login"));
});
