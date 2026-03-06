const express = require('express');
const router = express.Router();
const c = require('../controllers/pricingController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/types', c.getPriceTypes);
router.post('/generate', c.generatePricingTable);

router.get('/templates', c.getTemplates);
router.post('/templates', c.createTemplate);
router.get('/templates/:id', c.getTemplateById);
router.put('/templates/:id', c.updateTemplate);
router.delete('/templates/:id', c.deleteTemplate);

router.get('/entries/:template_id', c.getPricingEntries);
router.delete('/entries/:id', c.deletePricingEntry);

module.exports = router;
