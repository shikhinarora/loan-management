const moment = require('moment');

const calculateInterest = (loan, currentDate) => {
  // if () check if trying to get balance before initialization 
  const initialAmount = loan.amount;
  const startDate = loan.startDate;
  const interestRate = loan.interestRate;
  const payments = loan.getPayments(currentDate);

  console.log('startDate :', startDate);
  console.log('interestRate :', interestRate);
  console.log('initialAmount :', initialAmount);
  console.log('payments :', payments);

  const days = moment(currentDate).diff(moment(startDate), 'days');

  console.log('days :', days);

  let interest;
  if (days >= 0) {
    const interestPerDay = interestRate / 100 / 365;
    console.log('interestPerDay :', interestPerDay);
    
    interest = interestPerDay * initialAmount * days;
  } else {
    return 0;
  }

  const totalPayment = payments.reduce((acc, payment) => {
    acc += payment.amount;
    return acc;
  }, 0)

  console.log('totalPayment :', totalPayment);

  console.log('interest :', interest);

  return initialAmount + interest - totalPayment;
}

module.exports = {
  calculateInterest
}
