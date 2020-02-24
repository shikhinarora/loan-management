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

  getBalance(date) {
    return this.payments.reduce((acc, curr) => {
      if (moment(date).valueOf() > curr.date) {
        acc += curr.amount;
      }
    }, 0);
  }
  
};

module.exports = Loan
