const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
});

const Customer = mongoose.model('Customer', customerSchema);
const customerHandlers = {};

customerHandlers.getAll = async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
}

customerHandlers.getCustomerById = async (req, res) => {
  const customer = await Customer.findById(req.params.id)
  if (!customer) {
    return res.status(404).send({
      message: `No customer found with id: ${id}`
    });
  }
  res.status(200).send(customer);
}

customerHandlers.updateCustomer = async (req, res) => {

  const error = validateCustomer(req.body).error
  if (error) {
    return res.status(400).send({
      error: error.details[0].message
    });
  }

  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  }, {
    new: true
  });

  if (!customer) {
    return res.status(404).send({
      message: `No customer with id: ${id}`
    });
  }

  res.status(200).send(customer);
}

customerHandlers.createCustomer = async (req, res) => {
  const error = validateCustomer(req.body).error;
  if (error) {
    return res.status(400).send({
      error: error.details[0].message
    });
  }

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });

  customer = await customer.save();
  res.send(customer);
}

customerHandlers.deleteCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) {
    return res.status(404).send({
      message: `No customer with id: ${id}`
    });
  }
  res.status(200).send(customer);
}

function validateCustomer(customer) {
  return Joi.validate(customer, {
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(7).max(12).required(),
    isGold: Joi.boolean().required()
  });
}

module.exports = customerHandlers;