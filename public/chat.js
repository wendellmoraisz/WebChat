const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("inputMessage");
const messages = document.querySelector(".messages");
const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("nickname");

form.addEventListener("submit", e => {
    e.preventDefault();
    if (input.value) {
        socket.emit("chat message", { username: username, content: input.value });
        input.value = "";
    }
});

socket.on("chat message", msg => {
    const item = document.createElement("p");
    const userNameSpan = document.createElement("span");

    userNameSpan.classList.add("username");
    userNameSpan.textContent = msg.username;

    item.appendChild(userNameSpan);
    item.innerHTML += msg.content;

    messages.appendChild(item);
});