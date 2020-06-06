const Sequelize = require('sequelize');

const sequelize = new Sequelize('guitar_shop', 'root', 'Tiboshi1423', {
  host: 'localhost',
  dialect: 'mysql'
});

const Model = Sequelize.Model;
class Products extends Model { }
Products.init({
  product_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  discount: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  sequelize: sequelize,
  tableName: 'products',
  timestamps: false,
});

module.exports = Products;
