const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PricingTable = sequelize.define('PricingTable', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  template_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'pricing_templates', key: 'id' },
  },
  customer_group_id: {
    type: DataTypes.INTEGER,
    references: { model: 'customer_groups', key: 'id' },
  },
  product_name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { tableName: 'pricing_table', timestamps: true });

module.exports = PricingTable;
