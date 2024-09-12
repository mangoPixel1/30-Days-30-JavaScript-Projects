updateClock = () => {
	let date = new Date();
	h = date.getHours().toString().padStart(2, 0);
	m = date.getMinutes().toString().padStart(2, 0);
	s = date.getSeconds().toString().padStart(2, 0);

	d = date.getDay();
	mn = date.getMonth();
	dn = date.getDate();
	document.querySelector(".day").textContent = days[d];
	document.querySelector(".month").textContent = months[mn];
	document.querySelector(".dayNum").textContent = dn;

	timeStr = `${h}:${m}:${s}`;
	document.getElementById("clock-time").textContent = timeStr;

	setTimeout(updateClock, 1000);
};

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

updateClock();
// I was trying to guide the chatbot to figure out that the code it gave me does not display all of the laps as I stated in the requirement. It only displayed the three most recent. I used the word "unlimited" in my initial prompt to mean that all of the laps should be displayed but only the three most recent should be saved to local storage.
