const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('Customer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  customer_type: {
    type: DataTypes.ENUM('Individual', 'Organization'),
    allowNull: false,
    defaultValue: 'Individual',
  },
  group_id: { type: DataTypes.INTEGER, references: { model: 'customer_groups', key: 'id' } },
}, { tableName: 'customers', timestamps: true });

module.exports = Customer;
