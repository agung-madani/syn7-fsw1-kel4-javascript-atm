import { askQuestion } from './utils.js';
import { getAllAccounts } from './utils.js';

export async function authenticate() {
  let attempt = 0;
  try {
    const cardNumber = await askQuestion('Masukkan nomor kartu: ');

    let account = validateCardNumber(cardNumber);
    if (!account) {
      console.log('Nomor kartu tidak ditemukan');
      return false;
    }

    do {
      const pin = await askQuestion('Masukkan PIN: ');
      if (validatePin(pin, account)) {
        console.log('Selamat datang,', account.name);
        return account;
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

function validateCardNumber(enteredCardNumber) {
  const accounts = getAllAccounts();
  return accounts.find((account) => account.cardNumber === enteredCardNumber);
}

function validatePin(enteredPin, account) {
  return account.pin === enteredPin;
}
