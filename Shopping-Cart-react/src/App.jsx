import { useState } from "react";
import "./App.css";

// Components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Contact from "./components/contact/Contact";

function App() {
	return (
		<>
			<Header />
			<Contact />
			<Footer />
		</>
	);
}

export default App;

/* 
<main>
				<h1>Welcome!</h1>
			</main>
*/
