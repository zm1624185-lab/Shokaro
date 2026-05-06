let cart = JSON.parse(localStorage.getItem('webstoreCart')) || [];

function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').innerText = total;
    localStorage.setItem('webstoreCart', JSON.stringify(cart));
}

function addToCart(price, name) {
    cart.push({ id: Date.now(), name: name, price: price, quantity: 1 });
    updateCartCount();
    alert(`Added ${name} to cart! Total: ₹${cart.reduce((s,i)=>s+i.price*i.quantity,0)}`);
}

document.querySelectorAll('.buy').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const name = card.querySelector('h3').innerText;
        const price = parseInt(e.target.dataset.price);
        addToCart(price, name);
    });
});

function scrollToTemplates() {
    document.getElementById('templates').scrollIntoView({ behavior: 'smooth' });
}

// Load templates from API or local
const templates = [
    { name: 'Business Pro', category: 'business', price: 12999, image: '🏢' },
    { name: 'E-Shop', category: 'ecommerce', price: 24999, image: '🛍️' },
    { name: 'Portfolio', category: 'portfolio', price: 9999, image: '🎨' },
];

const grid = document.getElementById('templateGrid');
if(grid) {
    grid.innerHTML = templates.map(t => `
        <div class="card">
            <div style="font-size: 48px;">${t.image}</div>
            <h3>${t.name}</h3>
            <div class="price">₹${t.price}</div>
            <button class="buy" data-price="${t.price}">Buy Now</button>
        </div>
    `).join('');
}

updateCartCount();