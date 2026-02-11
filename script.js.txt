const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Ajouter message dans le chat
function addMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = sender + ": " + message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Quand on clique sur envoyer
sendBtn.addEventListener("click", () => {
    const message = userInput.value;

    if (message.trim() === "") return;

    addMessage("Vous", message);

    // Réponse simple (simulation API pour tester)
    setTimeout(() => {
        addMessage("Bot", "Tu as dit : " + message);
    }, 500);

    userInput.value = "";
});
