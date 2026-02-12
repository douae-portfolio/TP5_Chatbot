const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const marketingLibrary = {
    "stratégie": "Une bonne stratégie marketing repose sur le mix-marketing (4P) : Produit, Prix, Place (Distribution) et Promotion.",
    "vente": "L'augmentation des ventes passe par l'optimisation du tunnel de conversion (AIDA : Attention, Intérêt, Désir, Action).",
    "seo": "Le SEO (Search Engine Optimization) permet de positionner votre site en tête des résultats Google gratuitement.",
    "roi": "Le ROI (Retour sur Investissement) se calcule ainsi : (Gain - Coût) / Coût. C'est l'indicateur clé du marketing."
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

    // 1. Vérifier si c'est un mot-clé de notre bibliothèque locale
    for (let key in marketingLibrary) {
        if (query.includes(key)) return marketingLibrary[key];
    }

    // 2. Sinon, interroger l'API Dictionnaire pour définir le mot
    try {
        const word = query.split(' ').pop(); // Prend le dernier mot
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        
        if (!response.ok) return "Je ne connais pas encore ce terme technique. Essayez 'SEO' ou 'Stratégie'.";

        const data = await response.json();
        const definition = data[0].meanings[0].definitions[0].definition;
        return `[Définition Expert] : ${definition} (Traduit de l'anglais)`;
        
    } catch (error) {
        return "Erreur de connexion. Vérifiez votre accès internet.";
    }
}

sendBtn.addEventListener('click', async () => {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    userInput.value = "";

    // Simulation de réflexion
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'bot');
    typingDiv.innerText = "...";
    chatBox.appendChild(typingDiv);

    const reply = await getBotResponse(text);
    typingDiv.innerText = reply;
    chatBox.scrollTop = chatBox.scrollHeight;
});
