const express = require("express");

const Users = require('./models/users.js');
const Orders = require('./models/orders.js');

async function findUserID(users) {
    const user = await Users.findOne({
        attributes: ['user_ID'],
        where: {
            email: users.user.email,
            phone: users.user.phone
        }
    });

    if (user === null) {
        return null;
    }

    return user.user_ID;
}

async function addOrders(uid, orders) {
    const lastOrderID = await Orders.findOne({
        limit: 1,
        order: [['id', 'DESC']]
    });

    let newOrderID;

    if (lastOrderID === null) {
        newOrderID = 1;
    } else { newOrderID = lastOrderID.order_ID + 1; }

    const orderArray = [];

    orders.order.forEach(element => {
        const obj = {
            order_ID: newOrderID,
            user_ID: uid,
            product_ID: element.product_ID,
            quantity: element.quantity,
            delivery_address: element.delivery
        }

        orderArray.push(obj);
    });

    await Orders.bulkCreate(orderArray);
}

const app = express();

app.use(express.static('public'));

app.post("/order", express.json(), async function (req, res) {
    const message = req.body;
    message.user.phone = decodeURIComponent(message.user.phone);
    message.user.email = decodeURIComponent(message.user.email);
    message.order.forEach(element => {
        element.delivery = decodeURIComponent(element.delivery);
    });

    let user_ID = await findUserID(message);

    if (user_ID === null) {
        await Users.create({
            email: message.user.email,
            phone: message.user.phone
        });

        user_ID = await findUserID(message);
    }

    await addOrders(user_ID, message);

    if (!req.body) return res.sendStatus(200);

    res.json('Order recieved!');
});

const port = process.env.PORT || 80

app.listen(port);