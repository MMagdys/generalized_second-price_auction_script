# Auction Script

This a script that calculates the winners of an auction based on [Generalized second-price auction](https://en.wikipedia.org/wiki/Generalized_second-price_auction). Also state the amount that should be paid by each of the winners.


## Getting Started

The script is developed using NodeJs. So your system should have Node Js installed.

Aftre cloining the repo, install the required dependencies using the following command

```sh
npm install
```

after that you can simply run the script using
```sh
npm start
```

Also you can run the tests using
```sh
npm test
```


## How it works

1. when starts the promt asks you to enter the items count
2. then you start entering the bids
3. after finishing bids enter an empty line to tell the script that the bids are over.


### Example

Input

```
Items 3

John Doe 100
John Smith 500
Sara Conor 280
Martin Fowler 320

```

Output

```
John Smith 320
Martin Fowler 280
Sara Conor 100
John Doe Lost
```

### **Explanation**

In **Generalized second-price auction**, the highest bidder pays the amount of the second-highest, and the second-highest bidders pays the amount of the third-highest bidder and so on.

In this example, The highest bidder is `John Smith` and he bids 500, but he will pay the amount of the second-highest bidder which is 320 placed by `Martin Fowler`. while `Martin Fowler` the second-highest bidder will pay 280, Further, `Sara Conor` will pay 100. These 3 are the winners, as the items is equal to 3.


## Valid Auction restrictions

- The number of bids should be **greater than** the number of items.


### **Special cases**

- Tie-breaker: Who comes first in alphabetical order.
- In case of no bids show the message `No Winners`.
- It may occur that 2 of the winner pays the same amount if more than one user bids the same amount. 


## License
[MIT](https://choosealicense.com/licenses/mit/)
