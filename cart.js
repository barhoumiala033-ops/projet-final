// 🛒 Gestionnaire du Panier pour Artisanat TN

function syncCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || JSON.parse(localStorage.getItem('cart_items')) || [];
    
    // 1. Mise à jour de la vue Liste/Cards (#cart-items-list)
    const listContainer = document.getElementById("cart-items-list");
    const totalSpan = document.getElementById("cart-total-price");
    
    if (listContainer) {
        listContainer.innerHTML = "";
        let sum = 0;

        if (cart.length === 0) {
            listContainer.innerHTML = `<p style="text-align:center; color:#64748b; padding: 30px; font-size: 15px;">Votre panier d'achat est actuellement vide... 🛒</p>`;
            if (totalSpan) totalSpan.textContent = "0";
        } else {
            cart.forEach((item, index) => {
                let qty = parseFloat(item.qty || item.quantity) || 1;
                let price = parseFloat(item.price) || 0;
                let itemTotal = price * qty;
                sum += itemTotal;

                const div = document.createElement("div");
                div.className = "cart-item";
                div.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #e2e8f0; background: #ffffff; margin-bottom: 10px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);";
                div.innerHTML = `
                    <div style="display:flex; align-items:center; gap:14px;">
                        ${item.img ? `<img src="${item.img}" style="width:55px; height:55px; object-fit:cover; border-radius:10px;">` : ''}
                        <div>
                            <strong style="font-size:15px; color:#1e293b; display:block;">${item.name}</strong>
                            <div style="color:#64748b; font-size:13px; margin-top:2px;">${price}.000 DT / unité</div>
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:18px;">
                        <div style="display:flex; align-items:center; gap:6px; background:#f1f5f9; padding:4px 10px; border-radius:20px;">
                            <button style="border:none; background:transparent; font-weight:bold; cursor:pointer; font-size:16px;" onclick="window.updateCartQty(${index}, -1)">-</button>
                            <span style="font-weight:bold; min-width:18px; text-align:center;">${qty}</span>
                            <button style="border:none; background:transparent; font-weight:bold; cursor:pointer; font-size:16px;" onclick="window.updateCartQty(${index}, 1)">+</button>
                        </div>
                        <span style="font-weight:800; color:#1a73e8; font-size:15px; min-width:80px; text-align:right;">${itemTotal}.000 DT</span>
                        <button style="background:#ef4444; color:white; border:none; padding:6px 12px; border-radius:8px; font-size:12px; cursor:pointer;" onclick="window.dropItem(${index})">Supprimer 🗑️</button>
                    </div>
                `;
                listContainer.appendChild(div);
            });
            if (totalSpan) totalSpan.textContent = sum;
        }
    }

    // 2. Mise à jour de la vue Tableau (#cart-items-body) s'il existe
    const tbody = document.getElementById('cart-items-body');
    if (tbody) {
        tbody.innerHTML = "";
        let sum = 0;
        if (cart.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:30px; color:#7f8c8d;">Votre panier est actuellement vide.</td></tr>`;
        } else {
            cart.forEach((c, idx) => {
                let qty = parseFloat(c.qty || c.quantity) || 1;
                let price = parseFloat(c.price) || 0;
                let lineTotal = price * qty;
                sum += lineTotal;

                tbody.innerHTML += `
                    <tr>
                        <td style="display:flex; align-items:center; gap:12px;">
                            ${c.img ? `<img src="${c.img}" style="width:40px; height:40px; object-fit:cover; border-radius:6px;">` : ''}
                            <b>${c.name}</b>
                        </td>
                        <td>${price}.000 DT</td>
                        <td>
                            <div style="display:flex; align-items:center; gap:6px;">
                                <button style="padding:2px 8px; border:none; background:#e2e8f0; border-radius:4px; font-weight:bold; cursor:pointer;" onclick="window.updateCartQty(${idx}, -1)">-</button>
                                <span>${qty}</span>
                                <button style="padding:2px 8px; border:none; background:#e2e8f0; border-radius:4px; font-weight:bold; cursor:pointer;" onclick="window.updateCartQty(${idx}, 1)">+</button>
                            </div>
                        </td>
                        <td><b>${lineTotal}.000 DT</b></td>
                        <td><button style="background:#d63031; color:white; border:none; padding:6px 12px; border-radius:6px; font-size:12px; cursor:pointer;" onclick="window.dropItem(${idx})">Enlever 🗑️</button></td>
                    </tr>
                `;
            });
        }
        if (totalSpan) totalSpan.textContent = sum;
    }

    if (typeof updateCartBadge === "function") updateCartBadge();
}

window.updateCartQty = function (i, delta) {
    let cart = JSON.parse(localStorage.getItem('cart')) || JSON.parse(localStorage.getItem('cart_items')) || [];
    if (cart[i]) {
        let currentQty = parseFloat(cart[i].qty || cart[i].quantity) || 1;
        let newQty = currentQty + delta;
        if (newQty <= 0) {
            cart.splice(i, 1);
        } else {
            cart[i].qty = newQty;
            cart[i].quantity = newQty;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cart_items', JSON.stringify(cart));
        syncCart();
    }
};

window.dropItem = function (i) {
    let cart = JSON.parse(localStorage.getItem('cart')) || JSON.parse(localStorage.getItem('cart_items')) || [];
    cart.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cart_items', JSON.stringify(cart));
    syncCart();
};

window.goToConfirmation = function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || JSON.parse(localStorage.getItem('cart_items')) || [];
    if (cart.length === 0) {
        alert("Votre panier est actuellement vide ! 🛒");
        return;
    }
    window.location.href = "checkout.html";
};

document.addEventListener("DOMContentLoaded", syncCart);