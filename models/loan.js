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
    // this.payments = [
    //   { amount: 10, date: 1582569000000 },
    //   { amount: 10, date: 1582655400000 },
    //   { amount: 10, date: 1582741800000 }
    // ]
  };

  makePayment(amount, date) {
    this.payments.push({
      amount,
      date
    });
  }

  getBalance(date) {
    const balance = this.payments.reduce((acc, payment) => {
      if (date > payment.date) {
        acc += payment.amount;
      }
      return acc;
    }, 0);

    return balance;
  }
  
};

module.exports = Loan
