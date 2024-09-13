import React from "react";
import styles from "./Footer.module.css";

function Footer() {
	return (
		<footer className={styles.footer}>
			<p className={styles.content}>Contact Page &copy; {new Date().getFullYear()} Evergreen Community Commons</p>
		</footer>
	);
}

export default Footer;
