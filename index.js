const express = require("express");

const functions = require("./modules/functions.js")

const app = express();

app.use(express.static('public'));

app.post("/order", express.json(), async function (req, res) {
    const message = req.body;
    message.user.phone = decodeURIComponent(message.user.phone);
    message.user.email = decodeURIComponent(message.user.email);
    message.order.forEach(element => {
        element.delivery = decodeURIComponent(element.delivery);
    });

    const userID = await functions.getUserID(message.user);

    await functions.addOrders(userID, message.order);

    if (!req.body) return res.sendStatus(400);

    res.json('Order recieved!');
});

const port = process.env.PORT || 80

app.listen(port);