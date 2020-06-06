const cart = JSON.parse(localStorage.getItem('cart'));

function limit(element, max_chars) {
    if (element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
}

const phone = document.getElementById('phone');
const email = document.getElementById('e-mail');
const delivery = document.getElementById('delivery');

function sendOrder() {
    if (phone.value != "" && email.value != "" && delivery.value != "" && cart != null) {
        const user = {
            phone: encodeURIComponent(phone.value),
            email: encodeURIComponent(email.value)
        }

        const orders = [];

        cart.forEach((e) => {
            const order = {
                product_ID: parseInt(e.product_ID),
                quantity: parseInt(e.quantity),
                delivery: encodeURIComponent(delivery.value)
            }

            orders.push(order);
        });

        const request = new XMLHttpRequest();
        request.open("POST", '/order');
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = function () {
            if (this.readyState === 4 || this.status === 200) {
                console.log(this.response);
            }
        }

        const message = {
            "user": user,
            "order": orders
        }
        
        request.send(JSON.stringify(message));

        localStorage.removeItem('cart');

        window.location.href = "/index.html";

    } else { console.log('Order details are empty!!') }
}