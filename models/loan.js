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
      { amount: 10, date: 1582741800000 }
    ]
  };

  makePayment(amount, date) {
    this.payments.push({
      amount,
      date
    });
  }

  getPayments(date) {
    const payments = this.payments.filter(payment => date > payment.date);

    console.log('payments :', payments);

    return payments;
  }

  getBalance(date) {
    const payments = this.payments.reduce((acc, payment) => {
      if (date > payment.date) {
        acc += payment.amount;
      }
      return acc;
    }, 0);


    // if () check if trying to get balance before initialization 
    const days = date.diff(this.startDate, 'days');

    let interest;
    if (days > 0) {
      interest = this.interestRate / 100 / 365 * this.amount * days;
    } else {
      interest = 0;
    }

    console.log('interest :', interest);

    return balance;
  }
  
};

module.exports = Loan
