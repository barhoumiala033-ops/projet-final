const tbody = document.getElementById('cart-items-body');
const totalSpan = document.getElementById('cart-total-price');

function syncCart() {
    if(!tbody) return;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    tbody.innerHTML = "";
    let sum = 0;

    if(cart.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:30px; color:#7f8c8d;">Votre panier d'achat est actuellement vide.</td></tr>`;
        totalSpan.innerText = "0";
        return;
    }

    cart.forEach((c, idx) => {
        sum += (c.price * c.qty);
        tbody.innerHTML += `
            <tr>
                <td><b>${c.name}</b></td>
                <td>${c.price}.000 DT</td>
                <td>${c.qty}</td>
                <td>${c.price * c.qty}.000 DT</td>
                <td><button class="btn" style="background:#d63031;" onclick="dropItem(${idx})">Enlever</button></td>
            </tr>
        `;
    });
    totalSpan.innerText = sum;
}

window.dropItem = function(i) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    syncCart();
    updateCartBadge();
};
document.addEventListener("DOMContentLoaded", syncCart);