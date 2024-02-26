function decrement() {
    let count = document.getElementById('count');
    let newCount = parseInt(count.textContent)-1;
    count.textContent = newCount.toString();
}

const resetCount = () => count.textContent = 0;

function increment() {
    let count = document.getElementById('count');
    let newCount = parseInt(count.textContent)+1;
    count.textContent = newCount.toString();
}