const Sequelize = require('sequelize');

const sequelize = new Sequelize('guitar_shop', 'root', 'Tiboshi1423', {
  host: 'localhost',
  dialect: 'mysql'
});

const Model = Sequelize.Model;
class Orders extends Model { }
Orders.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true,
  },
  order_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  order_date: {
    type: Sequelize.DATEONLY,
    allowNull: true,
    defaultValue: Sequelize.fn('CURDATE')
  },
  user_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_ID'
    }
  },
  product_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'product_ID'
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  delivery_address: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
}, {
  sequelize: sequelize,
  tableName: 'orders',
  timestamps: false
});

module.exports = Orders;
