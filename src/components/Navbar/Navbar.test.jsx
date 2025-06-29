import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar.jsx";

// Mock Firebase Auth - simple and straightforward
jest.mock("firebase/auth", () => ({
	signOut: jest.fn().mockResolvedValue(undefined),
	onAuthStateChanged: jest.fn().mockReturnValue(() => {}),
	getAuth: jest.fn().mockReturnValue({ uid: 'mock-uid' })
}));

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
	return ({ src, alt, priority, ...props }) => {
		// Filter out Next.js specific props that aren't valid HTML attributes
		const { width, height, ...validProps } = props;
		return <img src={src} alt={alt} {...validProps} />;
	};
});

jest.mock("../../utils/firebase", () => ({
	auth: { uid: 'mock-uid' },
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
	checkIsAdmin: jest.fn().mockResolvedValue(false)
}));

// Clear mock call history before each test
beforeEach(() => {
	// Don't clear all mocks as it might reset our implementations
	// Just clear call history for specific mocks if needed
});

test("Navbar rendered", async () => {
	render(<Navbar />);

	// Check for navigation links that are always present using more specific queries
	// Use getAllByText for elements that appear multiple times (desktop and mobile nav)
	const homeLinks = screen.getAllByText("Home");
	expect(homeLinks).toHaveLength(2); // Desktop and mobile versions
	
	const takeQuizLinks = screen.getAllByText("Take Quiz!");
	expect(takeQuizLinks).toHaveLength(2); // Desktop and mobile versions
	
	const exploreCareersLinks = screen.getAllByText("Explore Careers");
	expect(exploreCareersLinks).toHaveLength(2); // Desktop and mobile versions
	
	// Check for login buttons (desktop shows "Login", mobile shows "Log In")
	expect(screen.getByText("Login")).toBeInTheDocument(); // Desktop version
	expect(screen.getByText("Log In")).toBeInTheDocument(); // Mobile version
	
	// Check for logo
	expect(screen.getByAltText("YFIOB Logo")).toBeInTheDocument();
});
