const sequelize = require('../config/database');
const User = require('./User');
const CustomerGroup = require('./CustomerGroup');
const Customer = require('./Customer');
const PricingTemplate = require('./PricingTemplate');
const PricingTable = require('./PricingTable');
const Order = require('./Order');

// Associations
CustomerGroup.hasMany(Customer, { foreignKey: 'group_id', as: 'customers' });
Customer.belongsTo(CustomerGroup, { foreignKey: 'group_id', as: 'group' });

PricingTemplate.hasMany(PricingTable, { foreignKey: 'template_id', as: 'entries' });
PricingTable.belongsTo(PricingTemplate, { foreignKey: 'template_id', as: 'template' });

CustomerGroup.hasMany(PricingTable, { foreignKey: 'customer_group_id', as: 'pricingEntries' });
PricingTable.belongsTo(CustomerGroup, { foreignKey: 'customer_group_id', as: 'customerGroup' });

Customer.hasMany(Order, { foreignKey: 'customer_id', as: 'orders' });
Order.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });

module.exports = {
  sequelize,
  User,
  CustomerGroup,
  Customer,
  PricingTemplate,
  PricingTable,
  Order,
};
