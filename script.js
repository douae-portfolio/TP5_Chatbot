const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Fonction pour ajouter un message à l'écran
function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll automatique vers le bas
}

// Fonction pour appeler l'API
async function getBotResponse() {
    try {
        // Nous utilisons une API de conseils gratuite (No-Auth)
        const response = await fetch('https://api.adviceslip.com/advice');
        
        if (!response.ok) throw new Error("Erreur réseau");

        const data = await response.json();
        return data.slip.advice; // L'API renvoie { slip: { advice: "..." } }
        
    } catch (error) {
        console.error("Erreur API:", error);
        return "Désolé, je rencontre une erreur de connexion à l'API.";
    }
}

// Gestionnaire d'événement pour le bouton
sendBtn.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (message === "") return;

    // 1. Afficher le message de l'utilisateur
    appendMessage(message, 'user');
    userInput.value = "";

    // 2. Afficher un message de chargement
    appendMessage("En train de réfléchir...", 'bot');

    // 3. Récupérer la réponse de l'API
    const botReply = await getBotResponse();

    // 4. Remplacer le message de chargement par la vraie réponse
    chatBox.lastElementChild.innerText = botReply;
});

// Permettre d'envoyer avec la touche "Entrée"
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});
