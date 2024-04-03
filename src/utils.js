import readline from 'readline';
import fs from 'fs';

const accounts = JSON.parse(fs.readFileSync('./data/accounts.json', 'utf8'));

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
  let account = accounts.find((account) => account.id === id);
  if (!account) {
    console.log('Akun tidak ditemukan');
    process.exit();
  }
  return account;
}

export { askQuestion, getAccount };
