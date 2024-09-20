import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import LocationContext from "../../LocationContext";

function Header() {
	const { location, onLocationChange, locationNames } = useContext(LocationContext);

	const handleLocationChange = e => {
		onLocationChange(e.target.value);
	};

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.siteName}>
					<Link to="/">Evergreen Community Commons</Link>
				</div>
				<nav className={styles.nav}>
					<ul>
						<li>
							<Link to="/courses">Courses</Link>
						</li>
						<li>
							<Link to="/contact">Contact</Link>
						</li>
					</ul>
				</nav>
				<div className={styles.locationSelector}>
					<label htmlFor="location">Location: </label>
					<select id="location" name="location" value={location} onChange={handleLocationChange}>
						{Object.entries(locationNames).map(([value, name]) => (
							<option key={value} value={value}>
								{name}
							</option>
						))}
					</select>
				</div>
			</div>
		</header>
	);
}

export default Header;
