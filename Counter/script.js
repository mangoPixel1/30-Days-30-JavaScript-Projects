/*function resetCount() {
    count.textContent = 0;
}*/

document.querySelector('.resetBtn').addEventListener('click', () => {
    const count = document.getElementById('count');
    count.textContent = 0;
});

function decrement() {
    const count1 = document.getElementById('count');
    const newCount = parseInt(count1.textContent)-1;
    count1.textContent = newCount.toString();
}

function increment() {
    const count1 = document.getElementById('count');
    const newCount = parseInt(count1.textContent)+1;
    count1.textContent = newCount.toString();
}