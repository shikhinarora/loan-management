# SQL queries

Here are the three queries as requested

1. Which person has the greatest total expense amount?

```SQL  
SELECT per.name, expns.sum_amount AS total
FROM persons AS per
LEFT JOIN (
  SELECT person_id, SUM(amount) AS sum_amount
  FROM expenses
  GROUP BY person_id
) expns ON expns.person_id = per.person_id
ORDER BY expns.sum_amount DESC NULLS LAST
LIMIT 1
```

2. Which person has the greatest total end balance considering all incomes and expenses?

```SQL
SELECT per.name
FROM persons AS per
LEFT JOIN (
  SELECT person_id, SUM(amount) AS sum_amount
  FROM expenses
  GROUP BY person_id
) expns ON expns.person_id = per.person_id
LEFT JOIN (
  SELECT person_id, SUM(amount) AS sum_amount
  FROM incomes
  GROUP BY person_id
) incms ON incms.person_id = per.person_id
ORDER BY (incms.sum_amount - expns.sum_amount) DESC NULLS LAST
LIMIT 1
```

3. List the name, date and balance of the three persons with the highest peak balances, i.e. the day when all incomes and expenses up to that day gives the highest balance.

```SQL
SELECT persons.name, topThree.date, topThree.runningMax FROM
(
  SELECT person_id, date, runningBalance, MAX(runningBalance) OVER (PARTITION BY person_id) AS runningMax
  FROM
  (
    SELECT * FROM
    (
      SELECT COALESCE(expns.person_id, incms.person_id) AS person_id,
        COALESCE(expns.date, incms.date) AS date,
        SUM(COALESCE(incms.daily_income, 0) - COALESCE(expns.daily_expense, 0))
          OVER(PARTITION BY COALESCE(expns.person_id, incms.person_id) ORDER BY COALESCE(expns.date, incms.date)) AS runningBalance
      FROM
      (
        SELECT person_id, date, SUM(amount) AS daily_expense
        FROM expenses
        GROUP BY person_id, date
        ORDER BY person_id, date
      ) expns
      FULL OUTER JOIN
      (
        SELECT person_id, date, SUM(amount) AS daily_income
        FROM incomes
        GROUP BY person_id, date
        ORDER BY person_id, date
      ) incms
      ON expns.person_id = incms.person_id AND expns.date = incms.date
    ) dailyBalance
  ) maxRunningBalance
) topThree
LEFT JOIN
persons ON persons.person_id = topThree.person_id
WHERE topThree.runningBalance = topThree.runningMax
ORDER BY topThree.runningMax DESC
LIMIT 3
```
