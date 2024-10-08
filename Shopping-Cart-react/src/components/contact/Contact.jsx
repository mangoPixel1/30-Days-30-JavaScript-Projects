import React, { useState, useContext } from "react";
import styles from "./Contact.module.css";
import LocationContext from "../../LocationContext";

function Contact() {
	const { location } = useContext(LocationContext);

	const getSendButtonColor = () => {
		switch (location) {
			case "evergreen":
				return styles.evergreenSendButton;
			case "cedar-grove":
				return styles.cedarGroveSendButton;
			case "sagebrush-hills":
				return styles.sagebrushHillsSendButton;
			case "maplewood-park":
				return styles.maplewoodParkSendButton;
			default:
				return styles.sendButton;
		}
	};

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		message: ""
	});
	const [errors, setErrors] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prevData => ({
			...prevData,
			[name]: value
		}));
	};

	const validateForm = () => {
		const newErrors = {};
		if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
		if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
		if (!formData.email.trim()) newErrors.email = "Email is required";
		if (!formData.message.trim()) newErrors.message = "Message is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (validateForm()) {
			// Form is valid, submit the data here (e.g., send it to a server)
			console.log("Form submitted:", formData);
			setIsSubmitted(true);

			// Reset form fields
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				phone: "",
				message: ""
			});
		}
	};

	return (
		<main className={styles.main}>
			<div className={styles.formContainer}>
				<h1>Contact Us</h1>
				<form id="contactForm" className={styles.form} onSubmit={handleSubmit} noValidate>
					<label htmlFor="firstName">First Name</label>
					<input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
					{errors.firstName && <span className={styles.error}>{errors.firstName}</span>}

					<label htmlFor="lastName">Last Name</label>
					<input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
					{errors.lastName && <span className={styles.error}>{errors.lastName}</span>}

					<label htmlFor="email">Email</label>
					<input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
					{errors.email && <span className={styles.error}>{errors.email}</span>}

					<label htmlFor="phone">Phone (Optional)</label>
					<input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />

					<label htmlFor="message">Message</label>
					<textarea id="message" name="message" value={formData.message} onChange={handleChange}></textarea>
					{errors.message && <span className={styles.error}>{errors.message}</span>}

					<button type="submit" className={`${styles.sendButton} ${getSendButtonColor()}`}>
						Send
					</button>
				</form>
				{isSubmitted && <div className={`${styles.message} ${styles.messageSent}`}>Message sent. You will hear back from us soon.</div>}
				{Object.keys(errors).length > 0 && <div className={`${styles.message} ${styles.messageError}`}>Please fill in all required fields.</div>}
			</div>
		</main>
	);
}

export default Contact;
