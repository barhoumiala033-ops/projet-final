// 📦 Liste des Articles de l'Artisanat Tunisien (10 Produits HD)
const products = [
    { id: 1, name: "Margoum Traditionnel Kairouan", category: "tapis", price: 450, image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=600", desc: "Tapis en laine pure fait main aux motifs berbères authentiques." },
    { id: 2, name: "Vase en Céramique Bleue de Nabeul", category: "poterie", price: 65, image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=600", desc: "Peint à la main par des maîtres artisans potiers de Nabeul." },
    { id: 3, name: "Klim Moderne Laine et Coton", category: "tapis", price: 280, image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600", desc: "Mélange parfait entre tradition tunisienne et design épuré." },
    { id: 4, name: "Assiette Décorative en Terre Cuite", category: "poterie", price: 45, image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600", desc: "Idéal pour décorer vos murs ou vos tables de fête avec style." },
    { id: 5, name: "Coupe à Fruits Artisanale Sejnane", category: "poterie", price: 55, image: "https://images.unsplash.com/photo-1535401991746-da3d9055713e?q=80&w=600", desc: "Poterie unique inscrite au patrimoine culturel immatériel de l'UNESCO." },
    { id: 6, name: "Tapis Berbère Zanafi Noir & Blanc", category: "tapis", price: 520, image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?q=80&w=600", desc: "Tissage géométrique ultra tendance et extrêmement robuste." },
    { id: 7, name: "Service à Café Tunisien (6 Pers)", category: "poterie", price: 120, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600", desc: "Comprend 6 tasses et une cafetière artisanale finement ciselée." },
    { id: 8, name: "Grand Margoum en Soie Végétale", category: "tapis", price: 890, image: "https://images.unsplash.com/photo-1562575214-da9fcf59b907?q=80&w=600", desc: "Une pièce maîtresse d'une brillance et d'une douceur exceptionnelles." },
    { id: 9, name: "Tajine Verni de Nabeul", category: "poterie", price: 75, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600", desc: "Résistant au feu, idéal pour mijoter vos meilleurs plats traditionnels." },
    { id: 10, name: "Tapis de Couloir Hayek Brut", category: "tapis", price: 190, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600", desc: "Tissage sobre et minimaliste en pure laine de mouton non teinte." }
];

function displayProducts(productsList) {
    const grid = document.getElementById("products-grid");
    if (!grid) return;
    
    grid.innerHTML = "";
    
    if (productsList.length === 0) {
        grid.innerHTML = `<p class="no-products">Aucun article ne correspond à votre recherche 😔</p>`;
        return;
    }
    
    productsList.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-image-wrapper">
                <a href="product-details.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                </a>
            </div>
            <div class="product-info">
                <span class="product-cat-tag">${product.category === 'tapis' ? 'Tapis & Tissage' : 'Poterie & Déco'}</span>
                <h3 style="cursor:pointer;" onclick="window.location.href='product-details.html?id=${product.id}'">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-meta">
                    <span class="product-price">${product.price}.000 DT</span>
                    <button class="btn btn-add-cart" onclick="addToCart(${product.id})">Ajouter 🛒</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterProducts() {
    const searchVal = document.getElementById("search-input").value.toLowerCase();
    const catVal = document.getElementById("category-filter").value;
    
    const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchVal) || p.desc.toLowerCase().includes(searchVal);
        const matchesCat = (catVal === "all") || (p.category === catVal);
        return matchesSearch && matchesCat;
    });
    
    displayProducts(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
    displayProducts(products);
    
    const sInput = document.getElementById("search-input");
    const cFilter = document.getElementById("category-filter");
    if (sInput) sInput.addEventListener("input", filterProducts);
    if (cFilter) cFilter.addEventListener("change", filterProducts);
});