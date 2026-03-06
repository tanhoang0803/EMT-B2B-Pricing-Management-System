const customerService = require('../services/customerService');

async function getAll(req, res, next) {
  try {
    const data = await customerService.getAll();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const data = await customerService.getById(req.params.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const data = await customerService.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const data = await customerService.update(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    await customerService.remove(req.params.id);
    res.json({ success: true, message: 'Customer deleted' });
  } catch (err) { next(err); }
}

async function getAllGroups(req, res, next) {
  try {
    const data = await customerService.getAllGroups();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function createGroup(req, res, next) {
  try {
    const data = await customerService.createGroup(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}

module.exports = { getAll, getById, create, update, remove, getAllGroups, createGroup };
