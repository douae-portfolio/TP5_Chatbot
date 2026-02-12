const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// 1. Fonction pour afficher les messages
function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// 2. Fonction pour communiquer avec l'API
async function fetchBotResponse() {
    try {
        // Utilisation d'une API de conseils (gratuite et sans clé)
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        return data.slip.advice; // On extrait la réponse
    } catch (error) {
        return "Erreur : Impossible de contacter l'API.";
    }
}

// 3. Gestion de l'envoi
sendBtn.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage(message, 'user'); // Affiche le message utilisateur
    userInput.value = "";

    const response = await fetchBotResponse(); // Envoie/Reçoit de l'API
    appendMessage(response, 'bot'); // Affiche la réponse API
});
