import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExploreCareers from "./pages/ExploreCareers";
import TakeQuiz from "./pages/TakeQuiz";
import Login from "./pages/Login";
import CareerSummaryCards from "./pages/CareerSummaryCards";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/career-summary-cards" element={<CareerSummaryCards />} />
				<Route path="/explore-careers" element={<ExploreCareers />} />
				<Route path="/take-quiz" element={<TakeQuiz />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
