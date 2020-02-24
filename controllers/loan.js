const moment = require('moment');
const uuid = require('uuid');

const Loan = require('../models/loan');

const { body, validationResult } = require('express-validator');

let loan;

const initLoan = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // TODO: reformat errors
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const reqLoan = req.body;

    const { amount, interestRate, startDate } = reqLoan;
    loan = new Loan(uuid.v4(), amount, interestRate, moment(startDate).valueOf());

    console.log('loan :', loan);

    res.status(200).json({ message: 'Loan initiated successfully' });
  } catch(err) {
    console.log('createUser: err:', err);
    return next(err);
  }
};

const makePayment = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // TODO: reformat errors
      res.status(422).json({ errors: errors.array() });
      return;
    }

    if (!loan) res.status(404).json({ message: 'No loan found' });

    const reqPayment = req.body;

    const { amount, date } = reqPayment;
    loan.makePayment(amount, moment(date).valueOf());

    console.log('loan :', loan.payments);

    res.status(200).json({ message: 'Payment made successfully' });
  } catch(err) {
    console.log('createUser: err:', err);
    return next(err);
  }
};

const validateLoan = () => {
  return [
    body('amount').exists().isInt(),
    body('interestRate').exists().isInt(),
    body('startDate').custom(isDate)
  ]
};

const validatePayment = () => {
  return [
    body('amount').exists().isInt(),
    body('date').custom(isDate)
  ]
};

const isDate = date => {
  return moment(date).isValid();
}

module.exports = {
  validateLoan,
  validatePayment,
  initLoan,
  makePayment
};