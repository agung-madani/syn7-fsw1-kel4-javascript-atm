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
function checkBalance() { }

function deposit(account, amount) {
  const depositAmount = parseInt(amount);
  if (isNaN(depositAmount)) {
    console.log("\nInput harus merupakan angka!\n");
    return;
  } else if (depositAmount < 0) { 
    console.log("\nInput harus bernilai positif!\n");
    return;
  }

  // Bila yang di pass : cardNumber
  // account = accounts.find((accountObj) => accountObj.cardNumber == account);

  account.transactions.push(depositAmount);
  account.balance += depositAmount;
  console.log(`\nBerhasil melakukan deposit: Rp. ${depositAmount}`);
  console.log('===========================================\n');
}

function viewTransactions() {}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  do {
    console.log('Menu ATM:');
    console.log('1. Cek Saldo');
    console.log('2. Setor Tunai');
    console.log('3. Riwayat Transaksi');
    console.log('4. Keluar');

    choice = await askQuestion('Masukkan pilihan Anda: ');

    switch (parseInt(choice)) {
      case 1:
        break;
        case 2:
          deposit(account, await askQuestion('Masukkan nominal: '));
  
          // Bila yang di pass : cardNumber
          // deposit(cardNumber, await askQuestion('Masukkan nominal: '));
          break;
    }
  } while (choice !== 4);
}

main();
