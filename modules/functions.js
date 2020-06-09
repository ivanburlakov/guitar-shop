const Users = require('../models/users.js');
const Orders = require('../models/orders.js');

async function getUserID(user) {
    try {
        let uid = await Users.findOne({
            attributes: ['user_ID'],
            where: {
                email: user.email,
                phone: user.phone
            }
        });

        if (uid === null) {
            await Users.create({
                email: user.email,
                phone: user.phone
            });

            uid = await Users.findOne({
                attributes: ['user_ID'],
                where: {
                    email: user.email,
                    phone: user.phone
                }
            });
        }

        return uid.user_ID;
        
    } catch (err) {
        console.error('Unable to get user id: ', err);
    }
}

async function addOrders(uid, order) {
    try {
        const lastOrderID = await Orders.findOne({
            limit: 1,
            order: [['id', 'DESC']]
        });

        const newOrderID = (() => {
            if (lastOrderID === null) {
                return 1;
            } else {
                return lastOrderID.order_ID + 1;
            }
        })();

        const orderArray = [];

        order.forEach(element => {
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

    } catch (err) {
        console.error('Unable to add order: ', err);
    }
}

module.exports = {
    getUserID,
    addOrders
}