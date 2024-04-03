import { accounts } from './accounts.js';

function checkBalance(currentAccountIndex) {
  console.log(`Saldo Anda: Rp${accounts[currentAccountIndex].balance}`);
}

function deposit(amount, currentAccountIndex) {
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

function viewTransactions(currentAccountIndex) {
  return accounts[currentAccountIndex].transactions;
}

export { checkBalance, deposit, viewTransactions };
