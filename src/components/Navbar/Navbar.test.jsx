import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar.jsx";

jest.mock("next/navigation", () => ({
	useRouter() {
	  return {
		prefetch: () => null
	  };
	}
  })); 

jest.mock("../../utils/firebase", () => ({
	auth: {},
	db: {},
	app: {}
}));

jest.mock("firebase/auth", () => ({
	signOut: jest.fn(() => Promise.resolve()),
	onAuthStateChanged: jest.fn((auth, callback) => {
		callback(null);
		return jest.fn(); 
	})
}));

test("Navbar rendered", async () => {
	render(<Navbar />);

	screen.getAllByText("Home");
	screen.getAllByText("Take Quiz!");
	screen.getAllByText("Explore Careers");
	screen.getAllByText("Login");
});
