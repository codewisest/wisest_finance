'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2023-07-12T13:15:33.035Z',
    '2023-07-11T09:48:16.867Z',
    '2023-07-08T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// calculate difference in days

const calcDaysPassed = (date1, date2) => {
  let daysElapsed = Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  let whenMoved;

  if (daysElapsed === 0) {
    whenMoved = 'Today';
  } else if (daysElapsed === 1) {
    whenMoved = 'Yesterday';
  } else if (daysElapsed <= 7) {
    whenMoved = `${daysElapsed} days ago`;
  } else {
    whenMoved = date2.toLocaleDateString();
  }

  return whenMoved;
};

const optionsNG = {
  style: 'currency',
  currency: 'NGN',
};

const formatCurrency = amount =>
  new Intl.NumberFormat('en-NG', optionsNG).format(amount);

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';
  const moves = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;
  moves.forEach((movement, i) => {
    const numberOfDaysPassed = calcDaysPassed(
      new Date(),
      new Date(account.movementsDates[i])
    );
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    
    <div class="movements__date">${numberOfDaysPassed}</div>
        <div class="movements__value">${formatCurrency(
          movement.toFixed(2)
        )}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      year: 'numeric',
      weekday: 'short',
      month: 'long',
    };
    const locale = navigator.language;
    console.log(locale);
    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
      now
    );
  });
};

// displayMovements(account1.movements);

const createUserNames = function (acc) {
  acc.forEach(account => {
    const userNames = account.owner.split(' ');
    const initials = userNames.map(oneName => {
      return oneName.slice(0, 1).toLowerCase();
    });
    account.username = initials.join('');
    // console.log(account);
  });
};

createUserNames(accounts);

const calcDisplaySummary = function (movements) {
  const depositUSD = movements
    .filter(movement => movement > 0)
    .reduce((accumulator, current) => accumulator + current);

  labelSumIn.textContent = formatCurrency(depositUSD.toFixed(2));
  // console.log(depositUSD);
};

calcDisplaySummary(account1.movements);

const calcDisplaySummaryOut = function (movements) {
  const depositUSD = movements
    .filter(movement => movement < 0)
    .reduce((accumulator, current) => accumulator + current, 0);

  labelSumOut.textContent = formatCurrency(Math.abs(depositUSD).toFixed(2));
  // console.log(depositUSD);
};

// calcDisplaySummaryOut(account1.movements);

const calcDisplayInterest = function (movements, interest) {
  const totalInterest = movements
    .filter(movement => movement > 0)
    .map((movement, i, arr) => {
      return movement * (interest / 100);
    })
    .filter(movement => {
      return movement >= 1;
    })
    .reduce((accumulator, current) => accumulator + current, 0);

  labelSumInterest.textContent = formatCurrency(totalInterest.toFixed(2));
};
// calcDisplayInterest(account1.movements, 0.012);

const calcPrintBalance = function (account) {
  account.balance = account.movements.reduce((accumulator, current, i) => {
    return accumulator + current;
  });
  labelBalance.textContent = `${formatCurrency(account.balance.toFixed(2))}`;
  // return balance;
};

// logout timer
let timer;

const tenMinutesCountdown = function () {
  let duration = 100;

  const tick = () => {
    const min = duration / 60;
    const sec = duration % 60;
    labelTimer.textContent = `${String(Math.floor(min)).padStart(
      2,
      0
    )} : ${String(sec).padStart(2, 0)}`;
    if (duration === 0) {
      clearInterval(timer);
      logout();
    } else {
      duration--;
    }
  };
  tick();
  timer = setInterval(tick, 1000);
};

// logout
const logout = function () {
  containerApp.style.opacity = 0;
};

// Event handler
let currentAccount;
btnLogin.addEventListener('click', evt => {
  evt.preventDefault();

  if (timer) {
    clearInterval(timer);
  }

  tenMinutesCountdown();

  currentAccount = accounts.find(account => {
    return account.username === inputLoginUsername.value;
  });
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = '1';

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;
    updateAccount(currentAccount);
  }
});
console.log(currentAccount);

const updateAccount = function (account) {
  displayMovements(account);
  calcPrintBalance(account);
  calcDisplaySummary(account.movements);
  calcDisplaySummaryOut(account.movements);
  calcDisplayInterest(account.movements, account.interestRate);
};

const findAccountUser = user =>
  accounts.find(account => account.username === user);

const findAccountIndex = user => {
  return accounts.findIndex(account => {
    console.log(account, user);

    return account.username === user.username;
  });
};
// Transfer money
btnTransfer.addEventListener('click', evt => {
  evt.preventDefault();
  clearInterval(timer);

  tenMinutesCountdown();
  console.log(currentAccount);
  const currentBalance = currentAccount.balance;

  // Get transfer amount
  const transferAmount = Number(inputTransferAmount.value);
  const recipient = findAccountUser(inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';
  // check fund availability
  if (
    recipient &&
    recipient !== currentAccount &&
    transferAmount > 0 &&
    currentBalance >= transferAmount
  ) {
    // do the transfer
    recipient.movements.push(transferAmount);
    currentAccount.movements.push(-transferAmount);

    // add transfer dates
    recipient.movementsDates.push(new Date().toISOString());
    currentAccount.movementsDates.push(new Date().toISOString());

    updateAccount(currentAccount);
  } else {
    alert('Invalid transaction');
  }

  console.log(currentAccount.movements);
});

// Request loan
btnLoan.addEventListener('click', evt => {
  evt.preventDefault();
  clearInterval(timer);

  tenMinutesCountdown();
  const loanAmount = Math.floor(inputLoanAmount.value);
  const loanAmountDepositEligible = (10 / 100) * loanAmount;
  const loanEligibility = currentAccount.movements.some(
    movement => movement >= loanAmountDepositEligible
  );

  if (loanEligibility === true) {
    currentAccount.movements.push(loanAmount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateAccount(currentAccount);
  } else {
    alert('You are not qualified');
  }
  inputLoanAmount.value = '';
});

// Close account
btnClose.addEventListener('click', evt => {
  evt.preventDefault();

  const accountIndex = findAccountIndex(currentAccount);
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    accounts.splice(accountIndex, 1);
    containerApp.style.opacity = '0';
  } else {
    alert('invalid selection');
  }
  inputCloseUsername = inputClosePin = '';
});

// Sort
let sorted = false;
btnSort.addEventListener('click', evt => {
  evt.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.slice(1, 3));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-4, 4));

// console.log(arr.splice(1, 3));
// console.log(arr);

// // REVERSE
// const arr2 = ['f', 'g', 'h', 'i', 'j'];
// console.log(arr2.reverse());

// // CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);

// // JOIN
// console.log(letters.join('*'));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// movements.forEach((movement, i) => {
//   if (movement > 0) {
//     console.log(`${i + 1}: You were credited ${movement} million dollars`);
//   } else {
//     console.log(
//       `${i + 1}: You were debited ${Math.abs(movement)} million dollars`
//     );
//   }
// });

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach((value, key) => {
//   console.log(`${key}: ${value}`);
// });

// const eurToUsd = 1.1;
// const movementsDollars = account1.movements.map(movement => {
//   return movement * eurToUsd;
//   // console.log(movement * eurToUsd);
// });

// console.log(movementsDollars);

// account1.movements.map((movement, i) => {
//   if (movement > 0) {
//     console.log(`${i + 1}: You were credited ${movement} million dollars`);
//   } else {
//     console.log(
//       `${i + 1}: You were debited ${Math.abs(movement)} million dollars`
//     );
//   }
// });

// const deposits = account1.movements.filter(movement => {
//   return movement > 0;
// });

// console.log(deposits);

// const withdrawals = account1.movements.filter(movement => {
//   return movement < 0;
// });

// console.log(withdrawals);

// const balance = account1.movements.reduce((accumulator, current, i) => {
//   console.log(`Iteration ${i}: ${accumulator}`);
//   return accumulator + current;
// }, 0);
// console.log(balance);

// const maxMovement = account1.movements.reduce((accumulator, current) => {
//   return accumulator > current ? accumulator : current;
// });

// const minMovement = account1.movements.reduce((accumulator, current) => {
//   return accumulator < current ? accumulator : current;
// });

// console.log(minMovement);

// get deposits in usd
// const depositUSD =
//   account1.movements
//     .filter(movement => movement > 0)
//     .reduce((accumulator, current) => accumulator + current) * eurToUsd;

// console.log(depositUSD);

// const firstDebit = account1.movements.find(movement => movement < 0);

// console.log(firstDebit);

// const account = accounts.find(account => account.owner === 'Jessica Davis');

// console.log(account);

// find using for-of
// for (const account of accounts) {
//   if (account.owner === 'Jessica Davis') {
//     const accountForOf = account;
//     console.log(accountForOf);
//     break;
//   }
// }

// console.log(account1.movements);
// console.log(account1.movements.includes(-13));

// const anyDeposits = account1.movements.some(movement => movement > 1000);
// console.log(anyDeposits);

// // Every
// console.log(account1.movements.every(movement => movement > 0));
// console.log(account4.movements.every(movement => movement > 0));

// const arr = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arr.flat(2));

// // flat
// const overallBalance = accounts
//   .map(account => account.movements)
//   .flat()
//   .reduce((accumulator, current) => {
//     return accumulator + current;
//   });

// console.log(overallBalance);

// // flatMap
// const overallBalance2 = accounts
//   .flatMap(account => account.movements)
//   .reduce((accumulator, current) => accumulator + current);

// console.log(overallBalance2);

// Sorting
// strings
// const owners = ['Chiji', 'Zach', 'Jonas', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners);

// // Numbers
// console.log(account1.movements);
// account1.movements.sort((a, b) => {
//   return a - b;
// });

// console.log(account1.movements);

// creating arrays
// console.log([1, 2, 3, 4, 5, 6, 7]);
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// const x = new Array(7);
// console.log(x);

// x.fill(1);
// console.log(x);

// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// const hundredRandom = Array.from({ length: 100 }, () =>
//   Math.trunc(Math.random() * 6 + 1)
// );

// console.log(hundredRandom);

// WORKING WITH NUMBERS
console.log(23 === 23.0);
console.log(0.1 + 0.2);

console.log(Number('23'));

console.log(Number.parseInt('30em'));
console.log(Number.parseFloat('30.5em'));

console.log(Number.isNaN('23'));
console.log(Number.isFinite('23'));

console.log(Math.sqrt(25));

const numbersToCheck = [5, 18, 23, 11, 2];
console.log(Math.max(...numbersToCheck));
console.log(Math.min(...numbersToCheck));

console.log(Math.PI);
console.log(Math.trunc(Math.random() * 6 + 1));

// Random number with limit
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randomInt(6, 10));

console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(23.9));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.9));
console.log(Math.floor(23.9));

console.log(Math.trunc(-23.9).toFixed(2));
console.log(Math.floor(-23.9));

// Remainder operator
const isEven = n => n % 2 === 0;

console.log(isEven(8));
console.log(isEven(7));

labelBalance.addEventListener('click', () => {
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (i % 2) {
      row.style.backgroundColor = 'orangered';
    }
  });
});

// big int
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

// date and time
const now = new Date();
console.log(now);

console.log(new Date('11/6/23 18:05'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 11, 31));

console.log(new Date(0));

console.log(new Date(3 * 24 * 60 * 60 * 1000));

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);

console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.toISOString());
console.log(future.getTime());
console.log(Date.now());

console.log(Number(future));

// CALCULATE DIFFERENCE IN DAYS

// const calcDaysPassed = (date1, date2) =>
//   (date2 - date1) / (1000 * 60 * 60 * 24);

// const differenceDays = calcDaysPassed(
//   new Date(2037, 3, 14),
//   new Date(2037, 3, 24)
// );
// console.log(differenceDays);

const num = 3884764.23;

const options = {
  style: 'currency',
  currency: 'NGN',
};

console.log('US:', new Intl.NumberFormat('en-NG', options).format(num));

// timers
setTimeout(name => console.log(`Here is your pizza ${name}`), 5000, 'Chiji');
console.log('Waiting...');

// setinterval
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);
