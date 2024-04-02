const readline = require('readline');

const rl = readline.createInterface({
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
let currentAccountIndex = null;

function validateCardNumber(enteredCardNumber) {
  const cardNumberRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
  if (!cardNumberRegex.test(enteredCardNumber)) {
    return false;
  }
  return accounts.some((account) => account.cardNumber === enteredCardNumber);
}

function validatePin(enteredPin, accountIndex) {
  if (enteredPin.length !== 6) {
    console.log('PIN harus terdiri dari 6 digit');
    return false;
  }

  return accounts[accountIndex].pin === enteredPin;
}

function checkBalance() {
  console.log(`Saldo Anda: Rp${accounts[currentAccountIndex].balance}`);
}

function deposit(amount) {
  if (isNaN(amount) || amount <= 0) {
    console.log('Jumlah deposit tidak valid');
    return;
  }

  accounts[currentAccountIndex].balance += amount;
  accounts[currentAccountIndex].transactions.push({
    type: 'Setoran Tunai',
    amount,
  });
  console.log(
    `Setoran tunai berhasil. Saldo Anda saat ini: Rp${accounts[currentAccountIndex].balance}`
  );
}

function viewTransactions(index) {
  return accounts[index].transactions;
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  try {
    do {
      console.log('Menu ATM:');
      console.log('1. Cek Saldo');
      console.log('2. Setor Tunai');
      console.log('3. Riwayat Transaksi');
      console.log('4. Keluar');

      choice = await askQuestion('Masukkan pilihan Anda: ');

      switch (parseInt(choice)) {
        case 1:
          checkBalance();
          break;
        case 2:
          const amount = parseFloat(
            await askQuestion('Masukkan jumlah setoran: ')
          );
          deposit(amount);
          break;
        case 3:
          console.log('Riwayat Transaksi:');
          viewTransactions(currentAccountIndex).forEach((transaction) => {
            console.log(`- ${transaction.type}: Rp${transaction.amount}`);
          });
          break;
        case 4:
          console.log('Terima kasih telah menggunakan ATM');
          rl.close();
          break;
        default:
          console.log('Pilihan tidak valid');
      }
    } while (choice !== 4);
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message);
  } finally {
    if (rl) {
      rl.close();
    }
  }
}

async function authenticate() {
  let attempt = 0;
  try {
    const cardNumber = await askQuestion('Masukkan nomor kartu: ');
    if (!validateCardNumber(cardNumber)) {
      console.log('Nomor kartu tidak valid');
      return false;
    }

    const accountIndex = accounts.findIndex(
      (account) => account.cardNumber === cardNumber
    );

    do {
      const pin = await askQuestion('Masukkan PIN: ');
      if (validatePin(pin, accountIndex)) {
        currentAccountIndex = accountIndex;
        console.log('Selamat datang,', accounts[accountIndex].name);
        return true;
      } else {
        attempt++;
        console.log(`PIN salah. Anda memiliki ${3 - attempt} percobaan lagi.`);
      }
    } while (attempt < 3);

    console.log('Anda telah melebihi batas percobaan PIN.');
    return false;
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message);
    return false;
  }
}

authenticate().then((authenticated) => {
  if (authenticated) {
    main();
  } else {
    rl.close();
    console.log('Autentikasi gagal');
  }
});
