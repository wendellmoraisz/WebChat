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
    socket.emit("user_typing", false);
});

input.addEventListener("keyup", e => {
    const hasMessage = e.target.value !== "";
    socket.emit("user_typing", hasMessage, username, socket.id);
});

const isTypingSpan = document.createElement("span");
isTypingSpan.classList.add("is-typing");
isTypingSpan.style.display = "none";
messages.appendChild(isTypingSpan);

socket.on("user_typing", ({ isTyping, userName, userId }) => {
    if (userId !== socket.id) {
        isTypingSpan.innerHTML = `${userName} está digitando...`;
        isTypingSpan.style.display = isTyping ? "block" : "none";
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