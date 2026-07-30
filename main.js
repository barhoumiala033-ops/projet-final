// 📦 Catalogue principal et fonctions globales de panier pour Artisanat TN

const staticProducts = [
    { id: 1, name: "Tapis Margoum Kairouan El-Kahla", price: 380, category: "tapis", image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=400", desc: "Véritable Margoum tissé main avec de la pure laine naturelle de Kairouan." },
    { id: 2, name: "Klim Nomade Traditionnel", price: 210, category: "tapis", image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=400", desc: "Klim en laine fine fait main, idéal pour apporter une touche ethnique chaleureuse." },
    { id: 3, name: "Vase Rustique Poterie Sejnane", price: 65, category: "poterie", image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=400", desc: "Façonné à la main par les femmes de Sejnane (Patrimoine UNESCO)." },
    { id: 4, name: "Service Céramique Bleu de Nabeul", price: 120, category: "poterie", image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400", desc: "Service complet artisanal comprenant tasses et cafetière au design arabesque." }
];

// Mise à jour de tous les badges du panier sur la page
function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || JSON.parse(localStorage.getItem('cart_items')) || [];
    const countElements = document.querySelectorAll('#cart-count');
    const totalCount = cart.reduce((sum, item) => sum + (parseFloat(item.qty || item.quantity) || 1), 0);
    countElements.forEach(el => el.innerText = totalCount);
}

// Notification Toast moderne lors de l'ajout d'un produit
function showCartToast(message) {
    let toast = document.getElementById("cart-toast-notification");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "cart-toast-notification";
        toast.style.cssText = "position: fixed; top: 20px; right: 20px; z-index: 10000; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 12px 22px; border-radius: 30px; font-weight: bold; box-shadow: 0 8px 25px rgba(16, 185, 129, 0.35); font-family: 'Segoe UI', system-ui, sans-serif; font-size: 14px; opacity: 0; transform: translateY(-20px); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none;";
        document.body.appendChild(toast);
    }
    toast.innerHTML = message;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    if (window.toastTimeout) clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-20px)";
    }, 2800);
}

// Fonction universelle d'ajout au panier
window.addToCart = function(arg1, arg2, arg3) {
    let cart = JSON.parse(localStorage.getItem('cart')) || JSON.parse(localStorage.getItem('cart_items')) || [];
    let productToAdd = null;

    // Cas 1: ID numérique passé (ex: addToCart(1))
    if (typeof arg1 === 'number' || (typeof arg1 === 'string' && !isNaN(arg1) && arg2 === undefined)) {
        const idNum = Number(arg1);
        let found = (typeof products !== 'undefined' ? products.find(p => p.id === idNum) : null) ||
                    staticProducts.find(p => p.id === idNum);
        if (found) {
            productToAdd = {
                id: found.id,
                name: found.name,
                price: parseFloat(found.price),
                img: found.image || found.img || "",
                qty: 1,
                quantity: 1
            };
        } else {
            productToAdd = {
                id: idNum,
                name: "Article #" + idNum,
                price: 50,
                img: "",
                qty: 1,
                quantity: 1
            };
        }
    }
    // Cas 2: Libellé + prix passés (ex: addToCart('Vase Bleu', 45, 'img_url'))
    else if (typeof arg1 === 'string') {
        productToAdd = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            name: arg1,
            price: parseFloat(arg2) || 0,
            img: arg3 || "",
            qty: 1,
            quantity: 1
        };
    }
    // Cas 3: Objet complet passé
    else if (typeof arg1 === 'object' && arg1 !== null) {
        const q = parseFloat(arg1.qty || arg1.quantity) || 1;
        productToAdd = {
            id: arg1.id || Date.now(),
            name: arg1.name || "Article",
            price: parseFloat(arg1.price) || 0,
            img: arg1.img || arg1.image || "",
            qty: q,
            quantity: q
        };
    }

    if (!productToAdd) return;

    // Rechercher si l'article existe déjà
    let existing = cart.find(item => item.name === productToAdd.name || (item.id && item.id === productToAdd.id));
    if (existing) {
        const newQty = (parseFloat(existing.qty || existing.quantity) || 1) + (productToAdd.qty || 1);
        existing.qty = newQty;
        existing.quantity = newQty;
    } else {
        cart.push(productToAdd);
    }

    // Synchronisation sur les 2 clés du localStorage pour compatibilité totale
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cart_items', JSON.stringify(cart));

    updateCartBadge();
    showCartToast(`✅ "${productToAdd.name}" a été ajouté au panier ! 🛒`);
};

// Initialiser la page Détails du Produit si présente
function initProductDetailsPage() {
    const addBtn = document.getElementById("add-to-cart-btn");
    if (!addBtn) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = Number(urlParams.get("id")) || 1;
    
    let p = (typeof products !== "undefined" ? products.find(item => item.id === productId) : null) ||
            staticProducts.find(item => item.id === productId) ||
            staticProducts[0];

    if (p) {
        const imgEl = document.getElementById("main-product-img");
        const titleEl = document.getElementById("product-title");
        const priceEl = document.getElementById("product-price");
        const descEl = document.getElementById("product-desc");

        if (imgEl) imgEl.src = p.image || p.img || "";
        if (titleEl) titleEl.textContent = p.name;
        if (priceEl) priceEl.textContent = `${p.price}.000 DT`;
        if (descEl) descEl.textContent = p.desc || p.description || "";

        addBtn.onclick = function() {
            const qtyInput = document.getElementById("product-qty");
            const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;
            window.addToCart({
                id: p.id,
                name: p.name,
                price: p.price,
                img: p.image || p.img,
                qty: qty
            });
        };
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
    initProductDetailsPage();
});