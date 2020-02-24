const express = require('express');
const bodyParser = require('body-parser')

const loanController = require('./controllers/loan');

const app = express();
const router = express.Router();

app.use(bodyParser.json());

app.use('/api', router);

router.post(
  '/loan',
  loanController.validateLoan(),
  loanController.initLoan,
);

router.post(
  '/loan/pay',
  loanController.validatePayment(),
  loanController.makePayment,
);

router.post(
  '/loan/balance',
  loanController.validateBalance(),
  loanController.getBalance,
);

app.listen(3000);
