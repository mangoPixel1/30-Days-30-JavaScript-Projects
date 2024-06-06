const events = [
	{
		eventName: "Tech Conference 2024",
		description: "Join us for Tech Conference 2024, featuring a captivating keynote speech and an insightful panel discussion on the latest trends and innovations in technology.",
		date: "2024-07-20",
		location: {
			venue: "Convention Center",
			city: "New York",
			country: "USA"
		},
		attendees: ["Alice", "Bob", "Charlie", "Mary"],
		schedule: [
			{
				time: "10:00 AM",
				activity: "Keynote Speech"
			},
			{
				time: "11:00 AM",
				activity: "Panel Discussion"
			}
		]
	},
	{
		eventName: "Web Development Workshop",
		description: "Dive into the world of web development with our hands-on workshop. Learn the fundamentals of HTML, discover CSS best practices, and get started with JavaScript programming.",
		date: "2024-10-15",
		location: {
			venue: "Tech Hub",
			city: "San Francisco",
			country: "USA"
		},
		attendees: ["David", "Emma", "Frank", "Joseph", "Anthony"],
		schedule: [
			{
				time: "09:00 AM",
				activity: "Introduction to HTML"
			},
			{
				time: "10:30 AM",
				activity: "CSS Best Practices"
			},
			{
				time: "01:00 PM",
				activity: "JavaScript Basics"
			}
		]
	},
	{
		eventName: "AI & Machine Learning Summit",
		description: "Explore the exciting field of AI and machine learning at our summit. Learn about cutting-edge machine learning algorithms and discover how AI is revolutionizing the healthcare industry.",
		date: "2024-08-10",
		location: {
			venue: "Innovation Hall",
			city: "Boston",
			country: "USA"
		},
		attendees: ["Grace", "Henry", "Isabella"],
		schedule: [
			{
				time: "10:00 AM",
				activity: "Opening Remarks"
			},
			{
				time: "11:00 AM",
				activity: "Machine Learning Algorithms"
			},
			{
				time: "02:00 PM",
				activity: "AI in Healthcare"
			}
		]
	},
	{
		eventName: "Startup Pitch Event",
		description: "Witness the future of entrepreneurship at our Startup Pitch Event. Network with like-minded individuals and watch aspiring entrepreneurs pitch their innovative ideas to potential investors.",
		date: "2024-10-05",
		location: {
			venue: "Startup Arena",
			city: "Los Angeles",
			country: "USA"
		},
		attendees: ["Jack", "Katherine", "Liam"],
		schedule: [
			{
				time: "09:00 AM",
				activity: "Welcome and Networking"
			},
			{
				time: "10:00 AM",
				activity: "Pitch Session 1"
			},
			{
				time: "01:00 PM",
				activity: "Pitch Session 2"
			}
		]
	},
	{
		eventName: "Cybersecurity Conference",
		description: "Stay ahead of the curve in the world of cybersecurity. Get an overview of the latest cyber threats, learn strategies for protecting data privacy, and glimpse into the future of cybersecurity.",
		date: "2024-10-12",
		location: {
			venue: "Security Hall",
			city: "Chicago",
			country: "USA"
		},
		attendees: ["Mia", "Noah", "Olivia"],
		schedule: [
			{
				time: "09:30 AM",
				activity: "Cyber Threats Overview"
			},
			{
				time: "11:00 AM",
				activity: "Protecting Data Privacy"
			},
			{
				time: "02:00 PM",
				activity: "Future of Cybersecurity"
			}
		]
	},
	{
		eventName: "Blockchain Expo",
		description: "Discover the future of blockchain technology at our Blockchain Expo. Engage with industry leaders and learn about the latest advancements and applications in blockchain.",
		date: "2024-11-22",
		location: {
			venue: "Expo Center",
			city: "Miami",
			country: "USA"
		},
		attendees: ["Natalie", "Oscar", "Paul"],
		schedule: [
			{
				time: "10:00 AM",
				activity: "Opening Keynote"
			},
			{
				time: "11:30 AM",
				activity: "Blockchain in Finance"
			},
			{
				time: "01:00 PM",
				activity: "Networking Lunch"
			},
			{
				time: "02:00 PM",
				activity: "Future of Blockchain"
			}
		]
	},
	{
		eventName: "Green Energy Summit",
		description: "Join the conversation on sustainable energy at our Green Energy Summit. Hear from experts on renewable energy sources and the latest in green technology innovations.",
		date: "2024-09-18",
		location: {
			venue: "Eco Center",
			city: "Denver",
			country: "USA"
		},
		attendees: ["Quincy", "Rachel", "Steven"],
		schedule: [
			{
				time: "09:00 AM",
				activity: "Welcome and Introductions"
			},
			{
				time: "10:00 AM",
				activity: "Renewable Energy Trends"
			},
			{
				time: "12:00 PM",
				activity: "Sustainable Technology"
			},
			{
				time: "02:00 PM",
				activity: "Green Innovations"
			}
		]
	}
];

// Render events in a grid
const eventsGrid = document.getElementById("events-grid");

events.forEach(event => {
	const eventDiv = document.createElement("div");
	eventDiv.classList.add("event");

	const eventDate = new Date(event.date);
	const formattedDate = `${getMonthName(eventDate.getMonth())}, ${eventDate.getDate()}, ${eventDate.getFullYear()}`;

	const eventName = document.createElement("h3");
	eventName.classList.add("event-name");
	eventName.textContent = `${event.eventName} - ${formattedDate} - ${event.location.city}`;

	const eventDescription = document.createElement("p");
	eventDescription.classList.add("event-description");
	eventDescription.textContent = event.description;

	const attendees = document.createElement("p");
	attendees.classList.add("attendees");
	attendees.textContent = `${event.attendees.length} people attending`;

	eventDiv.appendChild(eventName);
	eventDiv.appendChild(eventDescription);
	eventDiv.appendChild(attendees);

	eventsGrid.appendChild(eventDiv);
});

function getMonthName(monthIndex) {
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return monthNames[monthIndex];
}
