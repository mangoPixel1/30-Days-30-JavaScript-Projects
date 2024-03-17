// VS Code: How to sort files by date created in Explorer

/*window.onload = () => {
    updateClock();
};*/


updateClock = () => {
    let date = new Date();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();

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