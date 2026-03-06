const { PricingTemplate, PricingTable, CustomerGroup } = require('../models');

async function getTemplates() {
  return PricingTemplate.findAll({ include: [{ model: PricingTable, as: 'entries' }] });
}

async function getTemplateById(id) {
  const template = await PricingTemplate.findByPk(id, {
    include: [{ model: PricingTable, as: 'entries', include: [{ model: CustomerGroup, as: 'customerGroup' }] }],
  });
  if (!template) throw new Error('Template not found');
  return template;
}

async function createTemplate(data) {
  return PricingTemplate.create(data);
}

async function updateTemplate(id, data) {
  const template = await PricingTemplate.findByPk(id);
  if (!template) throw new Error('Template not found');
  return template.update(data);
}

async function deleteTemplate(id) {
  const template = await PricingTemplate.findByPk(id);
  if (!template) throw new Error('Template not found');
  await template.destroy();
}

// Auto-generate pricing table entries for a template + group
async function generatePricingTable({ template_id, customer_group_id, products }) {
  const template = await PricingTemplate.findByPk(template_id);
  if (!template) throw new Error('Template not found');

  const entries = products.map((p) => ({
    template_id,
    customer_group_id,
    product_name: p.product_name,
    price: p.price,
  }));

  return PricingTable.bulkCreate(entries, { returning: true });
}

async function getPricingEntries(template_id) {
  return PricingTable.findAll({
    where: { template_id },
    include: [{ model: CustomerGroup, as: 'customerGroup' }],
  });
}

async function deletePricingEntry(id) {
  const entry = await PricingTable.findByPk(id);
  if (!entry) throw new Error('Pricing entry not found');
  await entry.destroy();
}

module.exports = {
  getTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  generatePricingTable,
  getPricingEntries,
  deletePricingEntry,
};
