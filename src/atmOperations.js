import fs from 'fs';
import { getAccount } from './utils.js';

const accounts = JSON.parse(fs.readFileSync('./data/accounts.json', 'utf8'));

function checkBalance(id) {
  let account = getAccount(id);
  console.log(`Saldo Anda: Rp. ${account.balance}`);
}

function deposit(amount, id) {
  if (isNaN(amount) || amount <= 0) {
    console.log('Jumlah deposit tidak valid');
    return;
  }

  let accountIndex = accounts.findIndex((account) => account.id === id);
  accounts[accountIndex].balance += amount;
  accounts[accountIndex].transactions.push({
    type: 'Setoran Tunai',
    amount,
  });

  fs.writeFileSync('./data/accounts.json', JSON.stringify(accounts, null, 2));

  console.log(
    `Setoran tunai berhasil. Saldo Anda saat ini: Rp${accounts[accountIndex].balance}`
  );
}

function viewTransactions(id) {
  let account = getAccount(id);
  return account.transactions;
}

export { checkBalance, deposit, viewTransactions };
