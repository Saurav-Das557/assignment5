document.addEventListener('DOMContentLoaded', () => {
    let currentFunds = 5500;
    const fundsElement = document.getElementById('current-funds');
    const historyFundsElement = document.getElementById('history-funds');
    const modal = document.getElementById('modal');
    const historyList = document.querySelector('#history-section .space-y-4');
    const mainContent = document.querySelector('main');
    const donationSection = document.getElementById('donation-section');
    const historySection = document.getElementById('history-section');
    const donationButton = document.getElementById('donation-button');
    const historyButton = document.getElementById('history-button');

    function updateFundsDisplay() {
        fundsElement.textContent = `${currentFunds} BDT`;
        if (historyFundsElement) {
            historyFundsElement.textContent = `${currentFunds} BDT`;
        }
    }

    function showModal() {
        modal.classList.remove('hidden');
        mainContent.classList.add('blur');
    }

    function closeModal() {
        modal.classList.add('hidden');
        mainContent.classList.remove('blur');
    }

    function toggleButtonStyles(button1, button2) {
        button1.classList.add('bg-lime-400', 'text-black');
        button1.classList.remove('bg-white', 'text-gray-700');
        button2.classList.add('bg-white', 'text-gray-700');
        button2.classList.remove('bg-lime-400', 'text-black');
    }

    function showHistory() {
        donationSection.classList.add('hidden');
        historySection.classList.remove('hidden');
        toggleButtonStyles(historyButton, donationButton);
    }

    function showDonation() {
        historySection.classList.add('hidden');
        donationSection.classList.remove('hidden');
        toggleButtonStyles(donationButton, historyButton);
    }

    function addHistoryEntry(amount, cause) {
        const entry = document.createElement('div');
        entry.className = 'bg-white p-4 rounded shadow';
        entry.innerHTML = `
            <p class="font-bold">${amount} BDT is Donated for ${cause}</p>
            <p class="text-gray-500">Date: ${new Date().toLocaleString()}</p>
        `;
        historyList.appendChild(entry);
    }

    function donate(cause) {
        const input = document.getElementById(`donate-${cause}`);
        const amount = parseInt(input.value, 10);

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid positive number.');
            return;
        }

        if (amount > currentFunds) {
            alert('Insufficient funds.');
            return;
        }

        currentFunds -= amount;
        updateFundsDisplay();

        const totalElement = document.getElementById(`total-${cause}`);
        const currentTotal = parseInt(totalElement.textContent.split(' ')[0], 10);
        totalElement.textContent = `${currentTotal + amount} BDT`;

        addHistoryEntry(amount, cause);
        showModal();
    }

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (event) => {
            const buttonText = event.target.textContent.trim();
            if (buttonText === 'Donate Now') {
                const cause = event.target.previousElementSibling.id.split('-')[1];
                donate(cause);
            } else if (buttonText === 'History') {
                showHistory();
            } else if (buttonText === 'Donation') {
                showDonation();
            } else if (buttonText === 'Close Confirmation') {
                closeModal();
            }
        });
    });

    updateFundsDisplay();
});