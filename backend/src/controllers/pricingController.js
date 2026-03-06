const pricingService = require('../services/pricingService');
const { PricingTemplate } = require('../models');

async function getTemplates(req, res, next) {
  try {
    const data = await pricingService.getTemplates();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getTemplateById(req, res, next) {
  try {
    const data = await pricingService.getTemplateById(req.params.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function createTemplate(req, res, next) {
  try {
    const data = await pricingService.createTemplate(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}

async function updateTemplate(req, res, next) {
  try {
    const data = await pricingService.updateTemplate(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function deleteTemplate(req, res, next) {
  try {
    await pricingService.deleteTemplate(req.params.id);
    res.json({ success: true, message: 'Template deleted' });
  } catch (err) { next(err); }
}

async function generatePricingTable(req, res, next) {
  try {
    const data = await pricingService.generatePricingTable(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}

async function getPricingEntries(req, res, next) {
  try {
    const data = await pricingService.getPricingEntries(req.params.template_id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function deletePricingEntry(req, res, next) {
  try {
    await pricingService.deletePricingEntry(req.params.id);
    res.json({ success: true, message: 'Entry deleted' });
  } catch (err) { next(err); }
}

function getPriceTypes(req, res) {
  res.json({ success: true, data: PricingTemplate.PRICE_TYPES });
}

module.exports = {
  getTemplates, getTemplateById, createTemplate, updateTemplate, deleteTemplate,
  generatePricingTable, getPricingEntries, deletePricingEntry, getPriceTypes,
};
