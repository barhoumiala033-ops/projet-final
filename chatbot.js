/**
 * Artisanat TN - Chatbot IA (Gemini API & Fallback Intelligent)
 */

(function () {
    // Structure du catalogue de produits pour le chatbot
    const chatbotCatalogue = {
        "margoum": {
            id: 1,
            nom: "Margoum Tunisien Traditionnel",
            prix: "250 TND",
            numPrix: 250,
            image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=400",
            description: "Tapis 100% pure laine tissé à la main par nos artisanes de Kairouan."
        },
        "klim": {
            id: 2,
            nom: "Klim Nomade Traditionnel",
            prix: "210 TND",
            numPrix: 210,
            image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=400",
            description: "Klim en laine fine fait main, motifs ethniques élégants."
        },
        "couffin": {
            id: 5,
            nom: "Couffin en Osier Artisanal",
            prix: "45 TND",
            numPrix: 45,
            image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400",
            description: "Sac couffin tressé à la main avec finitions en cuir naturel."
        },
        "poterie": {
            id: 4,
            nom: "Service Poterie Bleu de Nabeul",
            prix: "120 TND",
            numPrix: 120,
            image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400",
            description: "Service complet en céramique peinte à la main avec motifs tradionnels."
        },
        "sejnane": {
            id: 3,
            nom: "Vase Rustique Poterie Sejnane",
            prix: "65 TND",
            numPrix: 65,
            image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=400",
            description: "Façonnée à la main par les femmes de Sejnane (Patrimoine UNESCO)."
        }
    };

    // Injecter HTML du chatbot automatiquement si pas présent
    function initChatbotUI() {
        if (document.getElementById("gemini-chatbot-container")) return;

        const container = document.createElement("div");
        container.id = "gemini-chatbot-container";
        container.innerHTML = `
            <button id="gemini-toggle-btn" onclick="window.toggleGeminiChat()" title="Discuter avec l'assistant IA">
                ✨
            </button>

            <div id="gemini-chat-box">
                <div class="gemini-header">
                    <div class="gemini-header-info">
                        <div class="gemini-avatar">🤖</div>
                        <div>
                            <div class="gemini-header-title">Assistant IA Shop</div>
                            <div class="gemini-header-subtitle">En ligne • Derja & Français</div>
                        </div>
                    </div>
                    <div class="gemini-header-actions">
                        <button class="gemini-header-btn" onclick="window.toggleGeminiSettings()" title="Configuration Clé API Gemini">⚙️</button>
                        <button class="gemini-header-btn" onclick="window.toggleGeminiChat()" title="Fermer">&times;</button>
                    </div>
                </div>

                <!-- Panneau de réglages API optionnel -->
                <div id="gemini-settings-panel">
                    <label style="font-weight:600; color:#334155;">Clé API Gemini (Optionnel):</label>
                    <input type="password" id="gemini-api-key-input" placeholder="AIzaSy..." value="${localStorage.getItem("GEMINI_API_KEY") || ""}">
                    <div style="display:flex; justify-between; gap:6px;">
                        <button onclick="window.saveGeminiApiKey()">Enregistrer</button>
                        <button onclick="window.clearGeminiApiKey()" style="background:#dc2626;">Effacer</button>
                    </div>
                </div>

                <div id="gemini-messages">
                    <div class="gemini-msg-bot">
                        Aslema! 👋 Mar7ba bik fi <b>Artisanat TN</b>.<br>
                        Eselni 3la ay article (Margoum, Couffin, Poterie...), la livraison, wala el carte des artisans! 🇹🇳✨
                    </div>
                </div>

                <div id="gemini-quick-chips">
                    <button class="gemini-chip" onclick="window.sendQuickMsg('Margoum')">🧶 Margoum</button>
                    <button class="gemini-chip" onclick="window.sendQuickMsg('Couffin')">🧺 Couffin</button>
                    <button class="gemini-chip" onclick="window.sendQuickMsg('Poterie')">🏺 Poterie</button>
                    <button class="gemini-chip" onclick="window.sendQuickMsg('Livraison')">🚚 Livraison</button>
                    <button class="gemini-chip" onclick="window.sendQuickMsg('Artisans')">📍 Artisans</button>
                </div>

                <div class="gemini-input-bar">
                    <input type="text" id="gemini-input" placeholder="Écrivez un message (Derja / Fr)..." onkeypress="if(event.key === 'Enter') window.askGemini()">
                    <button class="gemini-send-btn" onclick="window.askGemini()" title="Envoyer">➔</button>
                </div>
            </div>
        `;
        document.body.appendChild(container);
    }

    // Gestion de la visibilité
    window.toggleGeminiChat = function () {
        const box = document.getElementById("gemini-chat-box");
        if (!box) return;
        const isHidden = box.style.display === "none" || box.style.display === "";
        box.style.display = isHidden ? "flex" : "none";
        if (isHidden) {
            document.getElementById("gemini-input")?.focus();
        }
    };

    window.toggleGeminiSettings = function () {
        const panel = document.getElementById("gemini-settings-panel");
        if (!panel) return;
        panel.style.display = (panel.style.display === "none" || panel.style.display === "") ? "block" : "none";
    };

    window.saveGeminiApiKey = function () {
        const key = document.getElementById("gemini-api-key-input").value.trim();
        if (key) {
            localStorage.setItem("GEMINI_API_KEY", key);
            alert("Clé API Gemini enregistrée avec succès!");
        } else {
            localStorage.removeItem("GEMINI_API_KEY");
            alert("Clé API supprimée. Le mode IA locale sera utilisé.");
        }
        window.toggleGeminiSettings();
    };

    window.clearGeminiApiKey = function () {
        localStorage.removeItem("GEMINI_API_KEY");
        document.getElementById("gemini-api-key-input").value = "";
        alert("Clé API effacée.");
        window.toggleGeminiSettings();
    };

    // Envoyer via les chips d'action rapide
    window.sendQuickMsg = function (txt) {
        const input = document.getElementById("gemini-input");
        if (!input) return;
        input.value = txt;
        window.askGemini();
    };

    // Ajout direct au panier depuis le chatbot
    window.addChatProductToCart = function (key) {
        const item = chatbotCatalogue[key];
        if (!item) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let existing = cart.find(p => p.id === item.id || p.name === item.nom);
        if (existing) {
            existing.qty = (existing.qty || 1) + 1;
        } else {
            cart.push({
                id: item.id,
                name: item.nom,
                price: item.numPrix,
                qty: 1,
                img: item.image
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));

        // Mettre à jour les badges de panier sur la page si la fonction existe
        if (typeof updateCartBadge === "function") updateCartBadge();
        if (typeof updateCartCount === "function") updateCartCount();

        alert(`✅ ${item.nom} a été ajouté à votre panier!`);
    };

    // Générateur HTML Carte Produit
    function generateProductCardHTML(key, item) {
        return `
            <div class="gemini-product-card">
                <img src="${item.image}" alt="${item.nom}">
                <div class="gemini-product-card-body">
                    <h4 class="gemini-product-title">${item.nom}</h4>
                    <p class="gemini-product-desc">${item.description}</p>
                    <div class="gemini-product-footer">
                        <span class="gemini-product-price">${item.prix}</span>
                        <button class="gemini-product-add-btn" onclick="window.addChatProductToCart('${key}')">🛒 Ajouter</button>
                    </div>
                </div>
            </div>`;
    }

    // Traitement du message
    window.askGemini = async function () {
        const input = document.getElementById("gemini-input");
        const userText = input.value.trim();
        if (!userText) return;

        const messagesContainer = document.getElementById("gemini-messages");

        // Message Utilisateur
        const userDiv = document.createElement("div");
        userDiv.className = "gemini-msg-user";
        userDiv.textContent = userText;
        messagesContainer.appendChild(userDiv);

        input.value = "";
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Indicateur de chargement
        const loadingDiv = document.createElement("div");
        loadingDiv.className = "gemini-msg-bot";
        loadingDiv.id = "gemini-loading-" + Date.now();
        loadingDiv.innerHTML = `
            <div class="gemini-typing-dots">
                <span></span><span></span><span></span>
            </div>`;
        messagesContainer.appendChild(loadingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        let cleanText = userText.toLowerCase();
        let aiReply = "";
        let productCardHTML = "";
        let usedGeminiAPI = false;

        const apiKey = localStorage.getItem("GEMINI_API_KEY");

        // 1. Essayer l'API Gemini si une clé valide est stockée
        if (apiKey && apiKey.startsWith("AIzaSy")) {
            try {
                const systemPrompt = "Tu es un assistant virtuel aimable pour 'Artisanat TN', une boutique en ligne d'artisanat tunisien (Margoum, Poterie de Nabeul et Sejnane, Couffins en osier, Klims). Tu réponds courtoisement en Derja tunisienne ou en Français de façon concise.";
                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: systemPrompt + "\nUtilisateur: " + userText }] }]
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                        aiReply = data.candidates[0].content.parts[0].text;
                        usedGeminiAPI = true;
                    }
                }
            } catch (err) {
                console.warn("Erreur API Gemini, basculement sur l'IA locale:", err);
            }
        }

        // 2. Moteur IA Locale Intelligente (Si Gemini indisponible ou sans clé)
        if (!usedGeminiAPI) {
            if (cleanText.includes("margoum") || cleanText.includes("tapis")) {
                aiReply = "Voici notre **Margoum Tunisien Traditionnel** 100% pure laine fait main à Kairouan! Une pièce maîtresse pour décorer votre intérieur avec élégance.";
                productCardHTML = generateProductCardHTML("margoum", chatbotCatalogue["margoum"]);
            } else if (cleanText.includes("klim")) {
                aiReply = "Découvrez notre **Klim Nomade Traditionnel**, tissé main avec des couleurs chaudes et des motifs authentiques.";
                productCardHTML = generateProductCardHTML("klim", chatbotCatalogue["klim"]);
            } else if (cleanText.includes("couffin") || cleanText.includes("sac") || cleanText.includes("osier")) {
                aiReply = "Voici notre **Couffin en Osier Artisanal**, tressé à la main avec finitions en cuir naturel. Idéal pour vos sorties et le marché!";
                productCardHTML = generateProductCardHTML("couffin", chatbotCatalogue["couffin"]);
            } else if (cleanText.includes("poterie") || cleanText.includes("nabeul") || cleanText.includes("assiette") || cleanText.includes("service")) {
                aiReply = "Découvrez notre magnifique **Service Poterie de Nabeul** peinte à la main selon des méthodes séculaires!";
                productCardHTML = generateProductCardHTML("poterie", chatbotCatalogue["poterie"]);
            } else if (cleanText.includes("sejnane") || cleanText.includes("vase")) {
                aiReply = "Voici le **Vase Rustique de Sejnane**, façonné à la main par les femmes artisanes. Un savoir-faire unique classé au patrimoine mondial de l'UNESCO!";
                productCardHTML = generateProductCardHTML("sejnane", chatbotCatalogue["sejnane"]);
            } else if (cleanText.includes("livraison") || cleanText.includes("tous توصيل") || cleanText.includes("délai") || cleanText.includes("transporter")) {
                aiReply = "🚚 **Livraison rapide partout en Tunisie** sous 24h à 48h! Le paiement s'effectue à la livraison (Cash on Delivery).";
            } else if (cleanText.includes("artisan") || cleanText.includes("carte") || cleanText.includes("region") || cleanText.includes("origine")) {
                aiReply = "📍 Nos produits proviennent des meilleures régions artisanales de Tunisie: Kairouan (Margoum), Nabeul & Sejnane (Poterie), Djerba & Gabès (Tissage). Consultez notre page **Carte des Régions** pour en savoir plus!";
            } else if (cleanText.includes("prix") || cleanText.includes("somme") || cleanText.includes("combien") || cleanText.includes("tarif")) {
                aiReply = "💰 Nos prix varient de **45 TND** (Couffin en osier) à **380 TND** (Tapis Margoum haute qualité). Quel article vous intéresse?";
            } else if (cleanText.includes("salem") || cleanText.includes("aslema") || cleanText.includes("bonjour") || cleanText.includes("hi") || cleanText.includes("coucou") || cleanText.includes("ahla")) {
                aiReply = "Aslema khouya / khti! 😊 Mar7ba bik fi Artisanat TN. Chnouwa t7eb nwarrik men les articles mta3na (Margoum, Poterie, Couffin...)?";
            } else if (cleanText.includes("merci") || cleanText.includes("cbon") || cleanText.includes("chokran")) {
                aiReply = "Avec grand plaisir! 🇹🇳 N'hésitez pas si vous avez d'autres questions.";
            } else {
                aiReply = "Aslema! Ena l'assistant mta3 Artisanat TN. T7eb nwarrik el **Margoum**, **Couffin**, **Poterie de Nabeul** wala na3tik ma3loumat 3la el **livraison**?";
            }
        }

        // Supprimer le loader et ajouter la réponse
        const currentLoader = document.getElementById(loadingDiv.id);
        if (currentLoader) currentLoader.remove();

        const botDiv = document.createElement("div");
        botDiv.className = "gemini-msg-bot";
        botDiv.innerHTML = `
            <div>${aiReply.replace(/\n/g, '<br>')}</div>
            ${productCardHTML}
        `;
        messagesContainer.appendChild(botDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    // Initialiser au chargement de la page
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initChatbotUI);
    } else {
        initChatbotUI();
    }
})();
