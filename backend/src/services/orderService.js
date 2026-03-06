const { Order, Customer, CustomerGroup } = require('../models');

async function getAll() {
  return Order.findAll({
    include: [{ model: Customer, as: 'customer', include: [{ model: CustomerGroup, as: 'group' }] }],
    order: [['createdAt', 'DESC']],
  });
}

async function getById(id) {
  const order = await Order.findByPk(id, {
    include: [{ model: Customer, as: 'customer' }],
  });
  if (!order) throw new Error('Order not found');
  return order;
}

async function create(data) {
  const customer = await Customer.findByPk(data.customer_id);
  if (!customer) throw new Error('Customer not found');
  return Order.create(data);
}

async function update(id, data) {
  const order = await Order.findByPk(id);
  if (!order) throw new Error('Order not found');
  return order.update(data);
}

async function remove(id) {
  const order = await Order.findByPk(id);
  if (!order) throw new Error('Order not found');
  await order.destroy();
}

module.exports = { getAll, getById, create, update, remove };
