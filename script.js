const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Bibliothèque de réponses marketing précises
const marketingLibrary = {
    "stratégie": "Une bonne stratégie marketing repose sur le mix-marketing (4P) : Produit, Prix, Place (Distribution) et Promotion.",
    "ventes": "L'augmentation des ventes passe par l'optimisation du tunnel de conversion (AIDA : Attention, Intérêt, Désir, Action).",
    "seo": "Le SEO (Search Engine Optimization) permet de positionner votre site en tête des résultats Google gratuitement.",
    "digital": "Le marketing digital regroupe toutes les pratiques marketing utilisées sur les supports et canaux numériques."
};

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(input) {
    const query = input.toLowerCase();

    // 1. Recherche par mot-clé dans notre bibliothèque
    for (let key in marketingLibrary) {
        if (query.includes(key)) return marketingLibrary[key];
    }

    // 2. Appel à l'API externe pour les autres termes
    try {
        const words = query.split(' ');
        const lastWord = words[words.length - 1];
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${lastWord}`);
        
        if (!response.ok) return "Je ne connais pas encore ce terme technique. Essayez 'SEO' ou 'Stratégie'.";

        const data = await response.json();
        return `[Définition] : ${data[0].meanings[0].definitions[0].definition}`;
        
    } catch (error) {
        return "Désolé, je rencontre une erreur de connexion à l'API.";
    }
}

sendBtn.addEventListener('click', async () => {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    userInput.value = "";

    // Affichage d'un indicateur de chargement
    appendMessage("...", 'bot');

    const reply = await getBotResponse(text);
    
    // Remplacement du dernier message (les points) par la vraie réponse
    chatBox.lastElementChild.innerText = reply;
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});
