import React from "react";
import styles from "./Header.module.css";

function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.siteName}>
					<a>Evergreen Community Commons</a>
				</div>
				<nav className={styles.nav}>
					<ul>
						<li>
							<a>Home</a>
						</li>
						<li>
							<a>Courses</a>
						</li>
						<li>
							<a>About</a>
						</li>
						<li>
							<a>Contact</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header;
