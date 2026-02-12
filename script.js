const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Base de connaissances locale pour simuler l'intelligence marketing
const marketingResponses = {
    "vente": "Pour augmenter les ventes, concentrez-vous sur la fidélisation client et l'optimisation de votre tunnel de conversion.",
    "marketing": "Le marketing digital repose sur quatre piliers : le SEO, le contenu, les réseaux sociaux et l'analyse de données.",
    "stratégie": "Une bonne stratégie commence par une analyse SWOT (Forces, Faiblesses, Opportunités, Menaces).",
    "publicité": "La publicité efficace doit cibler une audience précise avec un message clair et un appel à l'action (CTA)."
};

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(userText) {
    const textLower = userText.toLowerCase();
    
    // 1. Vérification de mots-clés "Marketing" (Logique locale)
    for (let key in marketingResponses) {
        if (textLower.includes(key)) {
            return marketingResponses[key];
        }
    }

    // 2. Si aucun mot-clé, appel à l'API (Conseil général)
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        return "Je n'ai pas de réponse spécifique, mais voici un conseil : " + data.slip.advice;
    } catch (error) {
        return "Désolé, je rencontre une petite erreur technique.";
    }
}

sendBtn.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (message === "") return;

    appendMessage(message, 'user');
    userInput.value = "";

    appendMessage("Analyse en cours...", 'bot');

    const botReply = await getBotResponse(message);
    chatBox.lastElementChild.innerText = botReply;
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});
