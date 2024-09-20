import React, { useContext } from "react";
import styles from "./Courses.module.css";
import LocationContext from "../../LocationContext";

const CourseCard = ({ course }) => {
	const { location } = useContext(LocationContext);

	const getLocationClasses = () => {
		switch (location) {
			case "evergreen-ridge":
				return {
					card: styles.evergreenCard,
					button: `${styles.addToCartButton} ${styles.evergreenSendButton}`,
					price: styles.evergreenPrice
				};
			case "cedar-grove":
				return {
					card: styles.cedarGroveCard,
					button: `${styles.addToCartButton} ${styles.cedarGroveSendButton}`,
					price: styles.cedarGrovePrice
				};
			case "sagebrush-hills":
				return {
					card: styles.sagebrushHillsCard,
					button: `${styles.addToCartButton} ${styles.sagebrushHillsSendButton}`,
					price: styles.sagebrushHillsPrice
				};
			case "maplewood-park":
				return {
					card: styles.maplewoodParkCard,
					button: `${styles.addToCartButton} ${styles.maplewoodParkSendButton}`,
					price: styles.maplewoodParkPrice
				};
			default:
				return {
					card: styles.courseCard,
					button: styles.addToCartButton,
					price: styles.coursePrice
				};
		}
	};

	const locationClasses = getLocationClasses();

	return (
		<div className={`${styles.courseCard} ${locationClasses.card}`}>
			<h2 className={styles.courseName}>{course.course_name}</h2>
			<p className={styles.courseDescription}>{course.description}</p>
			<div className={styles.courseSchedule}>
				<span className={styles.scheduleIcon}>🕒</span>
				<span>{course.schedule}</span>
			</div>
			<div className={styles.courseFooter}>
				<div className={`${styles.coursePrice} ${locationClasses.price}`}>
					<span className={styles.priceIcon}>💲</span>
					<span>{course.price.toFixed(2)}</span>
				</div>
				<button className={locationClasses.button}>Add to Cart</button>
			</div>
		</div>
	);
};

export default CourseCard;
