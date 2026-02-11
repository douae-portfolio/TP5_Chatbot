const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Message de bienvenue
addMessage("bot", "Bonjour ! Je suis ton assistant marketing. Pose-moi une question.");

// Quand on clique sur envoyer
sendBtn.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (message === "") return;

    addMessage("user", message);
    userInput.value = "";

    // Appel API gratuite chatbot
    fetch(`https://api.brainshop.ai/get?bid=178178&key=6WlA9WkqVnEJ0vXB&uid=1&msg=${encodeURIComponent(message)}`)
        .then(response => response.json())
        .then(data => {
            addMessage("bot", data.cnt);
        })
        .catch(() => {
            addMessage("bot", "Désolé, une erreur est survenue.");
        });
});
