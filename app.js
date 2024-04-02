const readLine = require("readline");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const accountA = {
  name: "John Doe",
  balance: 0,
  pin: "123456",
  cardNumber: "1234 5678 1234 5678",
  transactions: [],
};

const accountB = {
  name: "Jane Doe",
  balance: 0,
  pin: "654321",
  cardNumber: "5678 1234 5678 1234",
  transactions: [],
};

const accounts = [accountA, accountB];

function validateCardNumber(accountArray) {
  return accountArray.map((account) => {
    const numericCardNumber = account.cardNumber.replace(/\D/g, "");

    if (numericCardNumber.length !== 16) {
      return false;
    }

    let sum = 0;
    for (let i = numericCardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(numericCardNumber[i], 10);
      if ((numericCardNumber.length - i) % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    return sum % 10 === 0;
  });
}
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

async function main() {
  do {
    console.log("Menu ATM:");
    console.log("1. Cek Saldo");
    console.log("2. Setor Tunai");
    console.log("3. Riwayat Transaksi");
    console.log("4. Keluar");

    choice = await askQuestion("Masukkan pilihan Anda: ");

    switch (parseInt(choice)) {
      case 1:
        break;
    }
  } while (choice !== 4);
}

main();
