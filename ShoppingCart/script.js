const coursesData = [
	{
		id: 1,
		name: "Cooking Basics",
		description: "Learn the fundamentals of cooking, including knife skills, basic recipes, and kitchen safety.",
		schedule: {
			days: ["Monday", "Wednesday"],
			time: "10:00 AM - 12:00 PM",
			start_date: "2024-09-10",
			end_date: "2024-10-15"
		},
		cost: 100.0,
		length_of_course: "6 weeks",
		slots_available: 12,
		instructor: "Chef Emily White"
	},
	{
		id: 2,
		name: "Watercolor Painting",
		description: "Explore the art of watercolor painting, from basic techniques to creating your own masterpieces.",
		schedule: {
			days: ["Tuesday", "Thursday"],
			time: "1:00 PM - 3:00 PM",
			start_date: "2024-09-12",
			end_date: "2024-10-24"
		},
		cost: 120.0,
		length_of_course: "7 weeks",
		slots_available: 15,
		instructor: "Jane Doe"
	},
	{
		id: 3,
		name: "Beginner Yoga",
		description: "A gentle introduction to yoga, focusing on flexibility, balance, and relaxation.",
		schedule: {
			days: ["Monday", "Wednesday", "Friday"],
			time: "8:00 AM - 9:00 AM",
			start_date: "2024-09-09",
			end_date: "2024-10-18"
		},
		cost: 80.0,
		length_of_course: "6 weeks",
		slots_available: 20,
		instructor: "Yogi Raj Patel"
	},
	{
		id: 4,
		name: "Digital Photography",
		description: "Learn the basics of digital photography, including camera settings, composition, and post-processing.",
		schedule: {
			days: ["Saturday"],
			time: "9:00 AM - 12:00 PM",
			start_date: "2024-09-14",
			end_date: "2024-11-02"
		},
		cost: 150.0,
		length_of_course: "8 weeks",
		slots_available: 10,
		instructor: "John Smith"
	},
	{
		id: 5,
		name: "Creative Writing",
		description: "Develop your writing skills and explore various forms of creative writing, including fiction, poetry, and memoir.",
		schedule: {
			days: ["Tuesday"],
			time: "6:00 PM - 8:00 PM",
			start_date: "2024-09-17",
			end_date: "2024-11-05"
		},
		cost: 90.0,
		length_of_course: "8 weeks",
		slots_available: 18,
		instructor: "Laura Brown"
	},
	{
		id: 6,
		name: "Introduction to Gardening",
		description: "Learn the basics of gardening, including soil preparation, planting, and maintaining a healthy garden.",
		schedule: {
			days: ["Thursday"],
			time: "4:00 PM - 6:00 PM",
			start_date: "2024-09-19",
			end_date: "2024-10-31"
		},
		cost: 70.0,
		length_of_course: "7 weeks",
		slots_available: 25,
		instructor: "Sarah Green"
	}
];

let cart = [];

function formatDate(dateString) {
	const date = new Date(dateString);
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const month = monthNames[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();
	return `${month} ${day}, ${year}`;
}

function renderCourseCard(course) {
	return `
				<div class="course-name">${course.name}</div>
				<div class="course-description">${course.description}</div>
				<div class="course-details">
						<p><strong>Schedule:</strong> ${course.schedule.days.join(", ")} ${course.schedule.time}</p>
						<p><strong>Dates:</strong> ${formatDate(course.schedule.start_date)} to ${formatDate(course.schedule.end_date)}</p>
						<p><strong>Length:</strong> ${course.length_of_course}</p>
						<p><strong>Available Slots:</strong> <span class="slots-available">${course.slots_available}</span></p>
						<p class="course-instructor"><strong>Instructor:</strong> ${course.instructor}</p>
				</div>
				<div class="enroll-container">
						<strong>Cost: $${course.cost.toFixed(2)}</strong>
						<button class="add-to-cart-button" data-course-id="${course.id}">Add to Cart</button>
				</div>
		`;
}

function renderCourseGrid() {
	const gridContainer = document.getElementById("courseGrid");
	gridContainer.innerHTML = "";
	coursesData.forEach(course => {
		const courseCard = document.createElement("div");
		courseCard.className = "course-card";
		courseCard.id = `course-${course.id}`;
		courseCard.innerHTML = renderCourseCard(course);
		gridContainer.appendChild(courseCard);
	});
}

function renderCartItems() {
	const cartItemsContainer = document.getElementById("cartItems");
	cartItemsContainer.innerHTML = "";

	const groupedCart = cart.reduce((acc, course) => {
		if (!acc[course.id]) {
			acc[course.id] = { ...course, quantity: 1 };
		} else {
			acc[course.id].quantity += 1;
		}
		return acc;
	}, {});

	Object.values(groupedCart).forEach(course => {
		const cartItem = document.createElement("div");
		cartItem.className = "cart-item";
		cartItem.innerHTML = `
						<div class="cart-item-name">${course.name}</div>
						<div class="cart-item-quantity">
								<button class="decrement-quantity" data-course-id="${course.id}">-</button>
								<span>${course.quantity}</span>
								<button class="increment-quantity" data-course-id="${course.id}">+</button>
						</div>
						<div class="cart-item-price">$${(course.cost * course.quantity).toFixed(2)}</div>
						<button class="remove-from-cart-button" data-course-id="${course.id}">❌</button>
				`;
		cartItemsContainer.appendChild(cartItem);
	});

	const subtotal = Object.values(groupedCart).reduce((total, course) => total + course.cost * course.quantity, 0);
	const cartSubtotal = document.getElementById("cartSubtotal");
	cartSubtotal.textContent = `Subtotal: $${subtotal.toFixed(2)}`;

	saveCartToLocalStorage();
}

function handleAddToCart(event) {
	if (event.target.classList.contains("add-to-cart-button")) {
		const courseId = parseInt(event.target.getAttribute("data-course-id"));
		const course = coursesData.find(c => c.id === courseId);

		if (course) {
			cart.push(course);
			renderCartItems();
		}
	}
}

function handleRemoveFromCart(event) {
	if (event.target.classList.contains("remove-from-cart-button")) {
		const courseId = parseInt(event.target.getAttribute("data-course-id"));
		cart = cart.filter(course => course.id !== courseId);
		renderCartItems();
	}
}

function handleQuantityChange(event) {
	if (event.target.classList.contains("increment-quantity") || event.target.classList.contains("decrement-quantity")) {
		const courseId = parseInt(event.target.getAttribute("data-course-id"));
		const increment = event.target.classList.contains("increment-quantity");

		if (increment) {
			cart.push(cart.find(course => course.id === courseId));
		} else {
			const index = cart.findIndex(course => course.id === courseId);
			if (index !== -1) {
				cart.splice(index, 1);
			}
		}

		renderCartItems();
	}
}

function saveCartToLocalStorage() {
	localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
	const savedCart = localStorage.getItem("cart");
	if (savedCart) {
		cart = JSON.parse(savedCart);
		renderCartItems();
	}
}

document.addEventListener("DOMContentLoaded", () => {
	renderCourseGrid();
	loadCartFromLocalStorage();
	document.getElementById("courseGrid").addEventListener("click", handleAddToCart);
	document.getElementById("cartItems").addEventListener("click", event => {
		handleRemoveFromCart(event);
		handleQuantityChange(event);
	});
});
