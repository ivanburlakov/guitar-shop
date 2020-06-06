let cart;

if (localStorage.getItem('cart') === null) {
    cart = [];
} else {
    cart = JSON.parse(localStorage.getItem('cart'));
}

let productsSection = document.querySelector('#products-section');

function loadProducts() {
    const request = new XMLHttpRequest();
    request.open('get', 'data/products.json');
    request.onload = () => {
        try {
            const json = JSON.parse(request.responseText);
            populateProducts(json);

        } catch (e) {
            console.warn('Could not load products');
        }
    }

    request.send();
}

function populateProducts(json) {
    productsSection.innerHTML = "";

    json.forEach((row) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.srcset = row.Photo.path;
        img.classList.add('card-img');
        card.appendChild(img);

        const h1 = document.createElement('h1');
        h1.classList.add('title');
        h1.textContent = row.title;
        card.appendChild(h1);

        const disc = document.createElement('p');
        disc.classList.add('disc_price');
        disc.textContent = parseInt(row.price * (1 - (row.discount / 100))) + '$';
        card.appendChild(disc);

        const p = document.createElement('p');
        p.classList.add('price');
        p.textContent = row.price + '$';
        card.appendChild(p);

        const buyDiv = document.createElement('div');
        buyDiv.classList.add('buy');
        buyDiv.onclick = () => {
            if (cart.filter(e => e.product_ID === row.product_ID).length > 0) { return }
            cart.push({product_ID: row.product_ID, quantity: 1});
            localStorage.setItem('cart', JSON.stringify(cart));
        };

        const buyText = document.createElement('p');
        buyText.classList.add('buy_text');
        buyText.textContent = 'Buy';
        buyDiv.appendChild(buyText);

        card.appendChild(buyDiv);

        productsSection.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => { loadProducts(); });