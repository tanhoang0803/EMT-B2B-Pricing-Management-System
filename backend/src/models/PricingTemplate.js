const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PRICE_TYPES = [
  'meal_package',
  'government',
  'enterprise',
  'individual',
  'customer_group',
  'custom',
];

const PricingTemplate = sequelize.define('PricingTemplate', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  template_name: { type: DataTypes.STRING, allowNull: false },
  price_type: { type: DataTypes.ENUM(...PRICE_TYPES), allowNull: false },
  description: { type: DataTypes.TEXT },
}, { tableName: 'pricing_templates', timestamps: true });

PricingTemplate.PRICE_TYPES = PRICE_TYPES;

module.exports = PricingTemplate;
