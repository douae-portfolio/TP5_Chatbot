const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(message) {
    // Exemple d'appel API (ici on utilise un dictionnaire gratuit pour tester)
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${message.trim()}`);
        const data = await response.json();

        if (data.title === "No Definitions Found") {
            return "Désolé, je suis un chatbot en apprentissage. Essayez de me donner un mot en anglais pour voir ma puissance !";
        }
        
        // On récupère la définition si elle existe
        return "Définition : " + data[0].meanings[0].definitions[0].definition;
    } catch (error) {
        return "Oups, j'ai un petit problème de connexion. Réessayez ?";
    }
}

async function handleSend() {
    const text = userInput.value;
    if (!text) return;

    addMessage(text, 'user');
    userInput.value = '';

    // Petit délai pour simuler la réflexion
    setTimeout(async () => {
        const botReply = await getBotResponse(text);
        addMessage(botReply, 'bot');
    }, 1000);
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});
