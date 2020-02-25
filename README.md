# Loan Management

* Using Node JS + Express for creating API
* Buiding for REST

## How to run

* Clone the repo
* Run `npm i`
* Run `npm start`
* Download postman requests `postman.json` from the repo and import in postman
* Always lend loans on lower interest rate ;)

## Decisions

* Loan instance will clear when the server restarts or when a new loan is initiated
* User can start repaying the loan from the date of initiation
* Balance before the date of initiation of the loan will be 0 as the loan has not been issued yet
* Loan amount, interest rate and payments must be at least 1
* Currently only accepting whole numbers for loan amount and payment

## Assumptions

* If any date does not include time, then time will default to 00:00:00
* Loan's start date can be older than the current date
* Currently payments can exceed total amount + interest. Ideally, we should put a check for that

## What more we can do

* Add authentication and encryption for security
* Support for multiple users and loans using actual DB
* Can modify interest rates for existing customers based on their track record
* Can add monthly payment schedule, due dates and levy charges for late payments
* Stop adding interest if the loan is fully repaid. Currently, the balance will be negative if the user pays more amount than principal and interest combined
