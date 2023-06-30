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
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach((movement, i) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        
        <div class="movements__value">${movement}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
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

  labelSumIn.textContent = depositUSD + '₤';
  // console.log(depositUSD);
};

calcDisplaySummary(account1.movements);

const calcDisplaySummaryOut = function (movements) {
  const depositUSD = movements
    .filter(movement => movement < 0)
    .reduce((accumulator, current) => accumulator + current, 0);

  labelSumOut.textContent = Math.abs(depositUSD) + '₤';
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

  labelSumInterest.textContent = totalInterest + '₤';
};
// calcDisplayInterest(account1.movements, 0.012);

const calcPrintBalance = function (account) {
  account.balance = account.movements.reduce((accumulator, current, i) => {
    return accumulator + current;
  });
  labelBalance.textContent = `${account.balance} €`;
  // return balance;
};

// Event handler
let currentAccount;
btnLogin.addEventListener('click', evt => {
  evt.preventDefault();
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
  displayMovements(account.movements);
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
    recipient.movements.push(transferAmount);
    currentAccount.movements.push(-transferAmount);
    updateAccount(currentAccount);
  } else {
    alert('Invalid transaction');
  }

  console.log(currentAccount.movements);
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
