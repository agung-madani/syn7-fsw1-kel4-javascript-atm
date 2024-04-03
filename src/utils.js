import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function getAccount(id) {
  const accounts = getAllAccounts();
  let account = accounts.find((account) => account.id === id);
  if (!account) {
    console.log('Akun tidak ditemukan');
    process.exit();
  }
  return account;
}

function getAllAccounts() {
  try {
    return JSON.parse(fs.readFileSync('./data/accounts.json', 'utf8'));
  } catch (error) {
    console.error('Gagal memuat ulang data akun:', error);
  }
}

export { askQuestion, getAccount, getAllAccounts };
