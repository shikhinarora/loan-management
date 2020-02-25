const moment = require('moment');

class Loan {
  constructor (
    id,
    amount,
    interestRate,
    startDate,
  ) {
    this.id = id;
    this.amount = amount;
    this.interestRate = interestRate;
    this.startDate = startDate;
    this.payments = [];

    // TODO: Remove
    this.payments = [
      { amount: 10, date: 1582569000000 },
      { amount: 10, date: 1582655400000 },
      { amount: 100, date: 1582741800000 }
    ]
  };

  makePayment(amount, date) {
    this.payments.push({
      amount,
      date
    });
  }

  getPayments(date) {
    return this.payments.filter(payment => date > payment.date);
  }

  calculateInterest (currentDate) {
    const days = moment(currentDate).diff(moment(this.startDate), 'days');
    console.log('days :', days);
  
    let interest;
    if (days >= 0) {
      const interestPerDay = this.interestRate / 100 / 365;
      interest = interestPerDay * this.amount * days;
    } else {
      interest = 0;
    }
    console.log('interest :', interest);
  
    return interest;
  }

  getBalance(date) {
    const interest = this.calculateInterest(date);
    const payments = this.getPayments(date);
    const totalPayment = payments.reduce((acc, payment) => {
      acc += payment.amount;
      return acc;
    }, 0);

    const balance = this.amount + interest - totalPayment;
    console.log('balance :', balance);
    return balance;
  }
};

module.exports = Loan
