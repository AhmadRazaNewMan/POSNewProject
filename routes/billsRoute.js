const express = require('express');
const { addBillsController } = require('./controllers/billsController');

const router = express.Router();

// Route - POST Method
router.post('/add-bills', addBillsController.addBillsController);

module.exports = router;
