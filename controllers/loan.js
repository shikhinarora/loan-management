const moment = require('moment');
const uuid = require('uuid');

const Loan = require('../models/loan');

const { query, body, validationResult } = require('express-validator');

let loan;

const initLoan = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // TODO: reformat errors
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const reqLoan = req.body;
    const { amount, interestRate, startDate } = reqLoan;

    loan = new Loan(uuid.v4(), amount, interestRate, moment(startDate).valueOf());
    console.log('loan:', loan);

    res.status(200).json({ message: 'Loan initiated successfully' });
    return;
  } catch(err) {
    console.log('initLoan: err:', err);
    return next(err);
  }
};

const makePayment = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // TODO: reformat errors
      res.status(400).json({ errors: errors.array() });
      return;
    }

    if (!loan) {
      res.status(404).json({ message: 'No loan found' });
      return;
    }

    const reqPayment = req.body;
    const { amount, date } = reqPayment;

    loan.makePayment(amount, moment(date).valueOf());
    console.log('all payments:', loan.payments);

    res.status(200).json({ message: 'Payment made successfully' });
    return;
  } catch(err) {
    console.log('makePayment: err:', err);
    return next(err);
  }
};

const getBalance = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // TODO: reformat errors
      res.status(400).json({ errors: errors.array() });
      return;
    }

    if (!loan) {
      res.status(404).json({ message: 'No loan found' });
      return;
    }

    const reqBalance = req.query;
    const { date } = reqBalance;
    
    let balance = loan.getBalance(moment(date).valueOf());
    console.log('balance :', balance);

    res.status(200).json({
      message: 'Balance retrieved successfully',
      balance
    });
    return;
  } catch(err) {
    console.log('getBalance: err:', err);
    return next(err);
  }
};

const validateLoan = () => {
  return [
    body('amount').exists().isInt({ min: 1 }),
    body('interestRate').exists().isInt({ min: 1 }),
    body('startDate').exists().custom(isDate)
  ];
};

const validatePayment = () => {
  return [
    body('amount').exists().isInt({ min: 1 }),
    body('date').exists().custom(isDate)
  ];
};

const validateBalance = () => {
  return [
    query('date').exists().custom(isDate)
  ];
};

const isDate = date => {
  return moment(date).isValid();
}

module.exports = {
  validateLoan,
  validatePayment,
  validateBalance,
  initLoan,
  makePayment,
  getBalance
};