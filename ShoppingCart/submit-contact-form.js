const myform = document.getElementById("contact-form");
myform.noValidate = true;

document.getElementById("contact-form").addEventListener("submit", function (e) {
	e.preventDefault();

	const form = this;
	const requiredFields = form.querySelectorAll("[required]");
	const messageSent = document.getElementById("message-sent");
	const messageError = document.getElementById("message-error");

	let isValid = true;
	requiredFields.forEach(function (field) {
		if (!field.value.trim()) {
			isValid = false;
		}
	});

	if (isValid) {
		// Here you would typically send the form data to a server
		// For this example, we'll just show the success message
		messageSent.style.display = "block";
		messageError.style.display = "none";

		setTimeout(function () {
			messageSent.style.opacity = "0";
		}, 3500);

		setTimeout(function () {
			messageSent.style.display = "none";
			messageSent.style.opacity = "1";
		}, 4000);

		// Clear form fields
		form.reset();
	} else {
		messageError.style.display = "block";
		messageSent.style.display = "none";

		setTimeout(function () {
			messageError.style.opacity = "0";
		}, 3500);

		setTimeout(function () {
			messageError.style.display = "none";
			messageError.style.opacity = "1";
		}, 4000);
	}
});

function updateCartCount() {
	const savedCart = localStorage.getItem("cart");
	const cartLinkCount = document.getElementById("cartLinkCount");
	if (savedCart) {
		const cart = JSON.parse(savedCart);
		const cartCount = cart.length;
		if (cartCount > 0) {
			cartLinkCount.textContent = cartCount;
			cartLinkCount.style.display = "inline";
		} else {
			cartLinkCount.style.display = "none";
		}
	} else {
		cartLinkCount.style.display = "none";
	}
}

window.addEventListener("load", function () {
	updateCartCount();
	setInterval(updateCartCount, 10000); // Check every 10 seconds
});
