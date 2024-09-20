import React from "react";
import styles from "./Courses.module.css";
import CourseCard from "./CourseCard";

const courses = [
	{
		course_id: 201,
		course_name: "Beginner Yoga",
		description: "A relaxing introduction to basic yoga poses and techniques.",
		schedule: "Mondays, 8:00 AM - 9:00 AM",
		price: 15.0
	},
	{
		course_id: 202,
		course_name: "Painting for Beginners",
		description: "Learn the basics of painting with various mediums in this hands-on class.",
		schedule: "Tuesdays, 5:00 PM - 7:00 PM",
		price: 20.0
	},
	{
		course_id: 203,
		course_name: "Cooking 101: Easy Meals",
		description: "Discover simple, healthy meals you can make at home.",
		schedule: "Wednesdays, 6:00 PM - 8:00 PM",
		price: 25.0
	},
	{
		course_id: 204,
		course_name: "Creative Writing",
		description: "Develop your storytelling skills in this interactive writing class.",
		schedule: "Thursdays, 4:00 PM - 6:00 PM",
		price: 18.0
	},
	{
		course_id: 205,
		course_name: "Photography Basics",
		description: "Explore the fundamentals of photography, including camera settings and composition.",
		schedule: "Saturdays, 10:00 AM - 12:00 PM",
		price: 30.0
	}
];

function Courses() {
	return (
		<main className={styles.coursesContainer}>
			<h1 className={styles.pageTitle}>Available Courses</h1>
			<div className={styles.courseGrid} id="courseGrid">
				{courses.map(course => (
					<CourseCard key={course.course_id} course={course} />
				))}
			</div>
			<div className={styles.cartSection} id="cartSection">
				<h2 className={styles.cartTitle}>Cart</h2>
				<div id="cartItems"></div>
				<div className={styles.cartSubtotal} id="cartSubtotal">
					Subtotal: $0.00
				</div>
			</div>
		</main>
	);
}

export default Courses;
