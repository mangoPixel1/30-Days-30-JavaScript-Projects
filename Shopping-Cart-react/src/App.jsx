import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Courses from "./components/courses/Courses";
import Contact from "./components/contact/Contact";
import DialogModal from "./components/dialog-modal/DialogModal";

// Context
import LocationContext from "./LocationContext";

// Location name mapping
export const locationNames = {
	"cedar-grove": "Cedar Grove",
	"sagebrush-hills": "Sagebrush Hills",
	"maplewood-park": "Maplewood Park",
	"evergreen-ridge": "Evergreen Ridge"
};

function Home() {
	return <h1>Home</h1>;
}

function App() {
	const [location, setLocation] = useState(() => {
		return localStorage.getItem("location") || "cedar-grove";
	});

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newLocation, setNewLocation] = useState("");

	useEffect(() => {
		localStorage.setItem("location", location);
		document.body.className = location;
	}, [location]);

	const handleLocationChange = selectedLocation => {
		if (selectedLocation !== location) {
			setNewLocation(selectedLocation);
			setIsModalOpen(true);
		}
	};

	const confirmLocationChange = () => {
		setLocation(newLocation);
		setIsModalOpen(false);
	};

	const cancelLocationChange = () => {
		setIsModalOpen(false);
	};

	return (
		<LocationContext.Provider value={{ location, onLocationChange: handleLocationChange, locationNames }}>
			<BrowserRouter>
				<Header />
				<DialogModal
					isOpen={isModalOpen}
					onClose={cancelLocationChange}
					heading="Change Location"
					body={`Are you sure you want to change the location to ${locationNames[newLocation]}?`}
					button={{
						text: "Confirm",
						onClick: confirmLocationChange
					}}
				/>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/courses" element={<Courses />} />
					<Route path="/contact" element={<Contact />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</LocationContext.Provider>
	);
}

export default App;
