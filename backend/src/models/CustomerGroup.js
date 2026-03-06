const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CustomerGroup = sequelize.define('CustomerGroup', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT },
}, { tableName: 'customer_groups', timestamps: true });

module.exports = CustomerGroup;
