// VS Code: How to sort files by date created in Explorer
// How accurate is 
// How to add leading zeros
// Get AM and PM and display in 12 hour format
// Create button for toggling between 12/24 hour format
// Light/Dark mode toggle
// How to prevent theme from flashing 

updateClock = () => {
    let date = new Date();
    h = date.getHours().toString().padStart(2, 0);
    m = date.getMinutes().toString().padStart(2, 0);
    s = date.getSeconds().toString().padStart(2, 0);

    d = date.getDay();
    mn = date.getMonth();
    dn = date.getDate();
    document.querySelector('.day').textContent = days[d];
    document.querySelector('.month').textContent = months[mn];
    document.querySelector('.dayNum').textContent = dn;

    timeStr = `${h}:${m}:${s}`;
    document.getElementById('clock-time').textContent = timeStr;

    setTimeout(updateClock, 1000);
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

updateClock();