import { useState } from "react";

import styles from "./Contact.module.css";

function Contact() {
	return (
		<main className={styles.main}>
			<div className={styles.formContainer}>
				<h1>Contact Us</h1>
				<form id="contactForm" className={styles.form}>
					<label htmlFor="firstName">First Name</label>
					<input type="text" id="firstName" name="firstName" required />

					<label htmlFor="lastName">Last Name</label>
					<input type="text" id="lastName" name="lastName" required />

					<label htmlFor="email">Email</label>
					<input type="email" id="email" name="email" required />

					<label htmlFor="phone">Phone (Optional)</label>
					<input type="tel" id="phone" name="phone" />

					<label htmlFor="message">Message</label>
					<textarea id="message" name="message" required></textarea>

					<button type="submit" className={styles.sendButton}>
						Send
					</button>
				</form>
				<div id="messageSent" className={styles.message}>
					Message sent. You will hear back from us soon.
				</div>
				<div id="messageError" className={styles.message}>
					Please fill in all required fields.
				</div>
			</div>
		</main>
	);
}

export default Contact;
