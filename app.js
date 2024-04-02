const readLine = require('readline');

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const accountA = {
  name: 'John Doe',
  balance: 0,
  pin: '123456',
  cardNumber: '1234 5678 1234 5678',
  transactions: [],
};

const accountB = {
  name: 'Jane Doe',
  balance: 0,
  pin: '654321',
  cardNumber: '5678 1234 5678 1234',
  transactions: [],
};

const accounts = [accountA, accountB];

function validateCardNumber() {}
function validatePin() {}
function checkBalance() {}
function deposit() {}
function viewTransactions() {}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function checkBalance(cardNumber) {
  const account = accounts.find(account => account.cardNumber === cardNumber);
  console.log(`Your current balance is ${account.balance}`);
}

function validatePin(cardNumber, pin) {
  const account = accounts.find(account => account.cardNumber === cardNumber);
  return account.pin === pin;
}

async function main() {
  // let cardNumber = '5678 1234 5678 1234' // cardNumber's user input haven't been created, so i declare for testing
  let pin;
  
  do {
    pin = await askQuestion('Please enter your pin: ');
    if (!validatePin(cardNumber, pin)) {
      console.log('Invalid pin.');
    }
  } while (!validatePin(cardNumber, pin));

  do {
    console.log('Menu ATM:');
    console.log('1. Cek Saldo');
    console.log('2. Setor Tunai');
    console.log('3. Riwayat Transaksi');
    console.log('4. Keluar');

    choice = await askQuestion('Masukkan pilihan Anda: ');

    switch (parseInt(choice)) {
      case 1:
        checkBalance(cardNumber);
        break;
      case 4:
        console.log('.........Exiting..........');
        break;
      default:
        console.log('Invalid choice.')
    }
  } while (parseInt(choice) !== 4);
}

main();
