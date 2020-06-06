let cart;

if (localStorage.getItem('cart') === null) {
    cart = [];
} else {
    cart = JSON.parse(localStorage.getItem('cart'));
}

let cartSection = document.querySelector('#cart-section');
let buttonsContainer = document.querySelector('#cart-buttons');

function arrayRemove(array, key, value) {
    const index = array.findIndex(obj => obj[key] === value);
    return index >= 0 ? [
        ...array.slice(0, index),
        ...array.slice(index + 1)
    ] : array;
}

function clearCart() {
    localStorage.removeItem('cart');
    cart = [];
    loadCart();
}

function loadCart() {
    const request = new XMLHttpRequest();
    request.open('get', 'data/products.json');
    request.onload = () => {
        try {
            const json = JSON.parse(request.responseText);
            populateCart(json);

        } catch (e) {
            console.warn('Could not load products');
        }
    }

    request.send();
}

function populateCart(json) {
    let cartExists = false;
    cartSection.innerHTML = "";
    buttonsContainer.innerHTML = "";

    json.forEach((row) => {
        if (cart.filter(e => e.product_ID === row.product_ID).length > 0) {
            cartExists = true;

            const objIndex = cart.findIndex((e => e.product_ID === row.product_ID));

            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.srcset = row.path;
            img.classList.add('card-img');
            card.appendChild(img);

            const info = document.createElement('div');
            info.classList.add('info');

            const h1 = document.createElement('h1');
            h1.classList.add('title');
            h1.textContent = row.title;
            info.appendChild(h1);

            const disc = document.createElement('p');
            disc.classList.add('disc_price');
            disc.textContent = parseInt(row.price * (1 - (row.discount / 100))) + '$';
            info.appendChild(disc);

            const input = document.createElement('input');
            input.type = 'number';
            input.value = cart[objIndex].quantity;
            input.id = row.product_ID;
            input.inputmode = 'numeric';
            input.min = '1';
            input.max = '100';
            input.oninput = function () {
                if (parseInt(this.value) > parseInt(this.max)) {
                    this.value = this.max;
                }
                else if (parseInt(this.value) < parseInt(this.min)) {
                    this.value = this.min;
                }
                else if (this.value === "") { this.value = this.min; }

                cart[objIndex].quantity = this.value;
                localStorage.setItem('cart', JSON.stringify(cart));
            };

            info.appendChild(input);

            card.appendChild(info);

            const remove = document.createElement('div');
            remove.classList.add('remove');

            const icon = document.createElement('i');
            icon.classList.add('material-icons');
            icon.textContent = 'remove_circle_outline';
            icon.onclick = function () {
                const newCart = arrayRemove(cart, "product_ID", row.product_ID);
                cart = newCart;
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCart();
            };
            remove.appendChild(icon);
            card.appendChild(remove);

            cartSection.appendChild(card);
        }
    });

    if (cartExists === true) {
        const clearButton = document.createElement('div');
        clearButton.classList.add('button');
        clearButton.onclick = () => { clearCart(); }

        const clearButtonText = document.createElement('p');
        clearButtonText.classList.add('button_text');
        clearButtonText.textContent = 'Clear Cart';
        clearButton.appendChild(clearButtonText);

        buttonsContainer.appendChild(clearButton);

        const a = document.createElement('a');
        a.href = "checkout.html"

        const checkoutButton = document.createElement('div');
        checkoutButton.classList.add('button');

        const checkoutButtonText = document.createElement('p');
        checkoutButtonText.classList.add('button_text');
        checkoutButtonText.textContent = 'Checkout';
        checkoutButton.appendChild(checkoutButtonText);

        a.appendChild(checkoutButton);
        buttonsContainer.appendChild(a);
    };
}

document.addEventListener('DOMContentLoaded', () => { loadCart(); });