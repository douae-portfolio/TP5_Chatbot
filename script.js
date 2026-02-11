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

// message de bienvenue
addMessage("bot", "Bonjour ! Je suis ton assistant marketing. Pose-moi une question.");

// quand on clique sur envoyer
sendBtn.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (message === "") return;

    addMessage("user", message);
    userInput.value = "";

    // appel à l'API
    fetch("https://api.brainshop.ai/get?bid=178178&key=6WlA9WkqVnEJ0vXB&uid=1&msg=" + encodeURIComponent(message))
        .then(response => response.json())
        .then(data => {
            addMessage("bot", data.cnt);
        })
        .catch(error => {
            addMessage("bot", "Erreur de connexion à l’API.");
        });
});
