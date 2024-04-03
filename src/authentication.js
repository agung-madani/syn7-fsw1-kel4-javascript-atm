import { askQuestion } from './utils.js';
import { accounts } from './accounts.js';

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
        console.log('Selamat datang,', accounts[accountIndex].name);
        return accountIndex;
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
  return accounts.some((account) => account.cardNumber === enteredCardNumber);
}

function validatePin(enteredPin, accountIndex) {
  return accounts[accountIndex].pin === enteredPin;
}

export { authenticate };
