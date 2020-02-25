# Loan Management

* Using Node JS for creating API
* Buiding for REST

## Gotchas

* Loan instance will clear when server restarts or when a new loan in initiated
* User can start repaying the loan from the date of initiation
* Fetching balance will not include payments made at the same exact time
* If any date does not includes time, then time will default to 00:00:00
* Balance before the date of initiation of loan will be 0 as loan has not been taken
* Currently payments can exceed total amount + interest. Ideally we should put a check for that
* Loan's start date can be in the past
* Loan amount, interest rate and payments must be atleast 1
* Currently only accepting whole numbers for loan amount and payment

## How to run

* Clone the repo
* Run `npm i`
* run `npm start`
* Download postman requests `postman.json` from the repo and import in postman
* Always loan money on low interet rates ;)
