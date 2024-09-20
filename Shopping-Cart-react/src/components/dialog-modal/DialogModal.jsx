import React, { useEffect, useRef } from "react";
import styles from "./DialogModal.module.css";

const DialogModal = ({ heading, body, button, isOpen, onClose }) => {
	const dialogRef = useRef(null);

	useEffect(() => {
		const dialogElement = dialogRef.current;
		if (isOpen) {
			dialogElement.showModal();
		} else {
			dialogElement.close();
		}
	}, [isOpen]);

	const handleClose = () => {
		if (onClose) {
			onClose();
		}
	};

	return (
		<dialog ref={dialogRef} className={styles.modal} onClose={handleClose}>
			<h2 className={styles.modalHeading}>{heading}</h2>
			<div className={styles.modalBody}>{body}</div>
			<div className={styles.modalActions}>
				<button className={styles.modalButton} onClick={button.onClick}>
					{button.text}
				</button>
				<button className={styles.modalCloseButton} onClick={handleClose}>
					Close
				</button>
			</div>
		</dialog>
	);
};

export default DialogModal;
