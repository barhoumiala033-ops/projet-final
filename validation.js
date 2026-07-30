const cForm = document.getElementById('checkout-form');
if(cForm) {
    cForm.addEventListener('submit', function(e) {
        e.preventDefault();
        document.querySelectorAll('.error-msg').forEach(s => s.innerText = "");
        
        const name = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        let ok = true;

        if(name.length < 5) { document.getElementById('error-name').innerText = "Veuillez saisir votre nom complet (min 5 caractères)."; ok = false; }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById('error-email').innerText = "Adresse électronique incorrecte."; ok = false; }
        if(!/^[2459][0-9]{7}$/.test(phone)) { document.getElementById('error-phone').innerText = "Le numéro doit être composé de genau 8 chiffres (Tunisie)."; ok = false; }
        if(address.length < 10) { document.getElementById('error-address').innerText = "Veuillez fournir une adresse postale exacte et détaillée."; ok = false; }

        if(ok) {
            alert("Excellent ! Votre commande tunisienne a été validée. Le panier va se vider.");
            localStorage.removeItem('cart');
            localStorage.removeItem('cart_items');
            window.location.href = "confirmation.html";
        }
    });
}