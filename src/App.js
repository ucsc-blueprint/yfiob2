import { CareerSummaryCards } from "./pages/CareerSummaryCards";

const fakeData = [
	{
		title: "Something 1",
		description:
			"someting like a description wow so cool, this is what would be written",
		headerColor: "#EACAA5",
		isElementary: false,
		careerImage:
			"https://images.unsplash.com/photo-1732439857681-ece7fe1ff7eb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "Something 2",
		description:
			"someting like a description wow so cool, this is what would be written",
		headerColor: "#00FF00",
		isElementary: false,
		careerImage:
			"https://images.unsplash.com/photo-1732461048142-c320071e0f57?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "Something 3",
		description:
			"someting like a description wow so cool, this is what would be written",
		headerColor: "#0000FF",
		isElementary: false,
		careerImage:
			"https://plus.unsplash.com/premium_photo-1681691911660-a40d4163ed9f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW5naW5lZXJ8ZW58MHx8MHx8fDA%3D",
	},
	{
		title: "Something 3",
		description:
			"someting like a description wow so cool, this is what would be written",
		headerColor: "#0000FF",
		isElementary: false,
		careerImage:
			"https://plus.unsplash.com/premium_photo-1681691911660-a40d4163ed9f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW5naW5lZXJ8ZW58MHx8MHx8fDA%3D",
	},
	{
		title: "Something 3",
		description:
			"someting like a description wow so cool, this is what would be written",
		headerColor: "#0000FF",
		isElementary: false,
		careerImage:
			"https://plus.unsplash.com/premium_photo-1681691911660-a40d4163ed9f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW5naW5lZXJ8ZW58MHx8MHx8fDA%3D",
	},
	{
		title: "Something 3",
		description:
			"someting like a description wow so cool, this is what would be written",
		headerColor: "#0000FF",
		isElementary: false,
		careerImage:
			"https://plus.unsplash.com/premium_photo-1681691911660-a40d4163ed9f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW5naW5lZXJ8ZW58MHx8MHx8fDA%3D",
	},
	{
		title: "Something 3",
		description:
			"someting like a description wow so cool, this is what would be written",
		headerColor: "#0000FF",
		isElementary: false,
		careerImage:
			"https://plus.unsplash.com/premium_photo-1681691911660-a40d4163ed9f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW5naW5lZXJ8ZW58MHx8MHx8fDA%3D",
	},
];

function App() {
	return <CareerSummaryCards CardData={fakeData} Level={"middle"} />;
}

export default App;
