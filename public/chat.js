const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("inputMessage");
const messages = document.getElementById("messages");

form.addEventListener("submit", e => {
    e.preventDefault();
    if (input.value) {
        socket.emit("chat message", input.value);
        input.value = "";
    }
});

socket.on("chat message", msg => {
    const item = document.createElement("p");
    item.textContent = msg;
    messages.appendChild(item);
});