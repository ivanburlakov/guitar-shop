let cart = JSON.parse(localStorage.getItem('cart'));

function limit(element, max_chars) {
    if (element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
}

let phone = document.getElementById('phone');
let email = document.getElementById('e-mail');
let delivery = document.getElementById('delivery');

function sendOrder() {
    if (phone.value != "" && email.value != "" && delivery.value != "" && cart != null) {
        const user = {
            phone: encodeURIComponent(phone.value),
            email: encodeURIComponent(email.value)
        }

        let orders = [];

        cart.forEach((e) => {
            let order = {
                product_ID: parseInt(e.product_ID),
                quantity: parseInt(e.quantity),
                delivery: encodeURIComponent(delivery.value)
            }

            orders.push(order);
        });

        const request = new XMLHttpRequest();
        request.open("POST", "./data/order.php");
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.onreadystatechange = function () {
            if (this.readyState === 4 || this.status === 200) {
                console.log(this.response);
            }
        };

        request.send("userData=" + JSON.stringify(user) + "&orderData=" + JSON.stringify(orders));

        localStorage.removeItem('cart');

        window.location.href = "/guitar_shop/index.html";

    } else { console.log('Order details are empty!!') }
}