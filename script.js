// รอให้ HTML โหลดเสร็จสมบูรณ์ก่อน ค่อยเริ่มทำงาน
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. ดึง Element ต่างๆ โดยใช้ ID จาก HTML เดิมของคุณ ---
    const accountBalanceInput = document.getElementById('myinput'); // ใช้ id "myinput"
    const cashBalanceInput = document.getElementById('cashbalance'); // ใช้ id "cashbalance"
    const historyLogTextarea = document.getElementById('historyLog');
    const setBalanceBtn = document.getElementById('changeBtn'); // ใช้ id ที่เราเพิ่งเพิ่มเข้าไป
    const transactionTypeSelect = document.getElementById('transaction-type'); // ใช้ id "transaction-type"
    const transactionAmountInput = document.getElementById('bankoperation'); // ใช้ id "bankoperation"
    const proceedButton = document.getElementById('proceedBtn');

    // --- 2. สร้างตัวแปรสำหรับเก็บยอดเงินคงเหลือ ---
    let accountBalance = 0;
    let cashBalance = 0;

    // --- 3. ฟังก์ชันสำหรับอัปเดตตัวเลขบนหน้าจอ ---
    function updateDisplay() {
        accountBalanceInput.value = accountBalance.toFixed(2);
        cashBalanceInput.value = cashBalance.toFixed(2);
    }

    // --- 4. ฟังก์ชันสำหรับบันทึกประวัติการทำรายการ ---
    function logTransaction(message) {
        const now = new Date();
        const timestamp = now.toLocaleTimeString('th-TH');
        historyLogTextarea.value = `[${timestamp}] ${message}\n` + historyLogTextarea.value;
    }

    // --- 5. ทำให้ปุ่ม "Change" (Set Balance) ทำงาน ---
    setBalanceBtn.addEventListener('click', function() {
        const newAccountBalance = parseFloat(accountBalanceInput.value);
        const newCashBalance = parseFloat(cashBalanceInput.value);

        if (!isNaN(newAccountBalance) && !isNaN(newCashBalance)) {
            accountBalance = newAccountBalance;
            cashBalance = newCashBalance;
            updateDisplay();
            logTransaction(`Set initial balance. Account: ${accountBalance.toFixed(2)}, Cash: ${cashBalance.toFixed(2)}`);
            alert('Balances updated!');
        } else {
            alert('Please enter valid numbers for balances.');
        }
    });

    // --- 6. ทำให้ปุ่ม "Proceed" (ฝาก/ถอน) ทำงาน ---
    proceedButton.addEventListener('click', function() {
        const transactionType = transactionTypeSelect.value;
        const amount = parseFloat(transactionAmountInput.value);

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid positive amount.');
            return;
        }

        if (transactionType === 'deposit') {
            if (amount > cashBalance) {
                alert('Not enough cash to deposit!');
            } else {
                cashBalance -= amount;
                accountBalance += amount;
                logTransaction(`Deposited ${amount.toFixed(2)}. New balance: ${accountBalance.toFixed(2)}`);
                alert('Deposit successful!');
            }
        } else if (transactionType === 'withdraw') {
            if (amount > accountBalance) {
                alert('Insufficient funds in account!');
            } else {
                accountBalance -= amount;
                cashBalance += amount;
                logTransaction(`Withdrew ${amount.toFixed(2)}. New balance: ${accountBalance.toFixed(2)}`);
                alert('Withdrawal successful!');
            }
        }
        
        updateDisplay();
        transactionAmountInput.value = '0';
    });

    // --- 7. ตั้งค่าเริ่มต้นเมื่อเปิดหน้าเว็บ ---
    updateDisplay();
    logTransaction("Session started. Welcome!");
});