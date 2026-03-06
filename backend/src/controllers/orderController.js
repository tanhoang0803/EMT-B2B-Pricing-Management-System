const orderService = require('../services/orderService');

async function getAll(req, res, next) {
  try {
    const data = await orderService.getAll();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const data = await orderService.getById(req.params.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const data = await orderService.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const data = await orderService.update(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    await orderService.remove(req.params.id);
    res.json({ success: true, message: 'Order deleted' });
  } catch (err) { next(err); }
}

module.exports = { getAll, getById, create, update, remove };
