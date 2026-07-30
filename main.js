
const staticProducts = [
    { id: 1, name: "Tapis Margoum Kairouan El-Kahla", price: 380, category: "tapis", img: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=400", desc: "Veritable Margoum tissé main avec de la pure laine naturelle de Kairouan. Motifs géométriques berbères complexes." },
    { id: 2, name: "Klim Nomade Traditionnel", price: 210, category: "tapis", img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=400", desc: "Klim en laine fine fait main, idéal pour apporter une touche ethnique chaleureuse à votre salon." },
    { id: 3, name: "Vase Rustique Poterie Sejnane", price: 65, category: "poterie", img: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=400", desc: "Poterie faite par les femmes de Sejnane, façonnée à la main et cuite à ciel ouvert. Pièce unique classée à l'UNESCO." },
    { id: 4, name: "Service Céramique Bleu de Nabeul", price: 120, category: "poterie", img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400", desc: "Service complet artisanal comprenant 6 tasses et une cafetière au design arabesque traditionnel bleu nabeul." }
];

function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countElement = document.getElementById('cart-count');
    if(countElement) {
        countElement.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
    }
}
document.addEventListener("DOMContentLoaded", updateCartBadge);