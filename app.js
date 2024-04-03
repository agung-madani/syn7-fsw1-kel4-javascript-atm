import { authenticate } from './src/authentication.js';
import { askQuestion } from './src/utils.js';
import {
  checkBalance,
  deposit,
  viewTransactions,
} from './src/atmOperations.js';

async function main(account) {
  try {
    let choice;

    do {
      console.log('Menu ATM:');
      console.log('1. Cek Saldo');
      console.log('2. Setor Tunai');
      console.log('3. Riwayat Transaksi');
      console.log('4. Keluar');

      choice = await askQuestion('Masukkan pilihan Anda: ');
      console.clear();

      switch (parseInt(choice)) {
        case 1:
          checkBalance(account.id);
          break;
        case 2:
          const amount = parseFloat(
            await askQuestion('Masukkan jumlah setoran: ')
          );
          deposit(amount, account.id);
          break;
        case 3:
          console.log('Riwayat Transaksi:');
          viewTransactions(account.id).forEach((transaction) => {
            console.log(`- ${transaction.type}: Rp${transaction.amount}`);
          });
          break;
        case 4:
          console.log('Terima kasih telah menggunakan ATM');
          break;
        default:
          console.log('Pilihan tidak valid');
      }
    } while (choice != '4');
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message);
  } finally {
    process.exit();
  }
}

authenticate().then((authenticated) => {
  authenticated !== false ? main(authenticated) : process.exit();
});
