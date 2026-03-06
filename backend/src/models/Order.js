const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'customers', key: 'id' },
  },
  total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    defaultValue: 'pending',
  },
  notes: { type: DataTypes.TEXT },
}, { tableName: 'orders', timestamps: true });

module.exports = Order;
