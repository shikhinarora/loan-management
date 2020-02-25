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
  };

  makePayment(amount, date) {
    this.payments.push({
      amount,
      date
    });
  }

  getPayments(date) {
    return this.payments.filter(payment => date >= payment.date && payment.date >= this.startDate);
  }

  calculateInterest (currentDate) {
    const days = moment(currentDate).diff(moment(this.startDate), 'days');
    console.log('days :', days);
  
    let interest;
    if (days >= 0) {
      const interestPerDay = this.interestRate / 100 / 365 * this.amount;
      interest = interestPerDay * days;
    } else {
      interest = 0;
    }
    console.log('interest :', interest);
  
    return interest;
  }

  getBalance(date) {
    if (date < this.startDate) return 0;

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
