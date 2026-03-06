const { Customer, CustomerGroup } = require('../models');

async function getAll() {
  return Customer.findAll({ include: [{ model: CustomerGroup, as: 'group' }] });
}

async function getById(id) {
  const customer = await Customer.findByPk(id, {
    include: [{ model: CustomerGroup, as: 'group' }],
  });
  if (!customer) throw new Error('Customer not found');
  return customer;
}

async function create(data) {
  return Customer.create(data);
}

async function update(id, data) {
  const customer = await Customer.findByPk(id);
  if (!customer) throw new Error('Customer not found');
  return customer.update(data);
}

async function remove(id) {
  const customer = await Customer.findByPk(id);
  if (!customer) throw new Error('Customer not found');
  await customer.destroy();
}

async function getAllGroups() {
  return CustomerGroup.findAll();
}

async function createGroup(data) {
  return CustomerGroup.create(data);
}

module.exports = { getAll, getById, create, update, remove, getAllGroups, createGroup };
