import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar.jsx";

jest.mock("next/navigation", () => ({
	useRouter() {
	  return {
		prefetch: () => null,
		push: jest.fn()
	  };
	}
})); 

jest.mock("next/link", () => {
	return ({ children, href, ...props }) => {
		return <a href={href} {...props}>{children}</a>;
	};
});

jest.mock("next/image", () => {
	return ({ src, alt, ...props }) => {
		return <img src={src} alt={alt} {...props} />;
	};
});

jest.mock("../../utils/firebase", () => ({
	auth: {},
	db: {},
	app: {}
}));

jest.mock("../../components/BoxButton.jsx", () => {
	return {
		__esModule: true,
		default: ({ text, onClick }) => <button onClick={onClick}>{text}</button>
	};
});

jest.mock("../../../backend/adminFuncs/adminUtils.js", () => ({
	checkIsAdmin: jest.fn(() => Promise.resolve(false))
}));

jest.mock("firebase/auth", () => ({
	signOut: jest.fn(() => Promise.resolve()),
	onAuthStateChanged: jest.fn((auth, callback) => {
		callback(null);
		return jest.fn(); 
	}),
	getAuth: jest.fn(() => ({}))
}));

test("Navbar rendered", async () => {
	render(<Navbar />);

	// Check for navigation links that are always present
	expect(screen.getByText("Home")).toBeInTheDocument();
	expect(screen.getByText("Take Quiz!")).toBeInTheDocument();
	expect(screen.getByText("Explore Careers")).toBeInTheDocument();
	expect(screen.getByText("Login")).toBeInTheDocument();
	
	// Check for logo
	expect(screen.getByAltText("YFIOB Logo")).toBeInTheDocument();
});
