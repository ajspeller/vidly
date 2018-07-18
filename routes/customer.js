const express = require('express');

const router = express.Router();

const customerHandlers = require('../controllers/customerHandlers');

router.route('/')
  .get(customerHandlers.getAll)
  .post(customerHandlers.createCustomer);

router.route('/:id')
  .get(customerHandlers.getCustomerById)
  .put(customerHandlers.updateCustomer)
  .delete(customerHandlers.deleteCustomer);
  
module.exports = router;