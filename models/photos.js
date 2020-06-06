const Sequelize = require('sequelize');

const sequelize = new Sequelize('guitar_shop', 'root', 'Tiboshi1423', {
  host: 'localhost',
  dialect: 'mysql'
});

const Model = Sequelize.Model;
class Photos extends Model { }
Photos.init({
  product_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'products',
      key: 'product_ID'
    }
  },
  path: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
}, {
  sequelize: sequelize,
  tableName: 'photos',
  timestamps: false,
});

module.exports = Photos;

