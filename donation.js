// Wait for the entire DOM to be loaded before running the code
document.addEventListener('DOMContentLoaded', () => {
    
    // Starting Fund
    let currentFunds = 5500;

    // Getting values in a variable
    const fundsElement = document.getElementById('current-funds');
    const historyFundsElement = document.getElementById('history-funds');
    const modal = document.getElementById('modal');  
    const historyList = document.querySelector('#history-section .space-y-4'); 
    const mainContent = document.querySelector('main');  
    const donationSection = document.getElementById('donation-section'); 
    const historySection = document.getElementById('history-section');  
    const donationButton = document.getElementById('donation-button');   
    const historyButton = document.getElementById('history-button');     

    // Function to update the funds 
    function updateFundsDisplay() {
        fundsElement.textContent = `${currentFunds} BDT`;  
        if (historyFundsElement) {  
            historyFundsElement.textContent = `${currentFunds} BDT`;
        }
    }

    // Function to show the modal 
    function showModal() {
        modal.classList.remove('hidden');  
        mainContent.classList.add('blur');  
    }

    // Function to close the modal 
    function closeModal() {
        modal.classList.add('hidden');  
        mainContent.classList.remove('blur'); 
    }

    // Function to switch visibility between "Donation" and "history"
    function toggleVisibility(showSection, hideSection, activeButton, inactiveButton) {
        hideSection.classList.add('hidden');  
        showSection.classList.remove('hidden');  
        toggleButtonStyles(activeButton, inactiveButton);  
    }

    // Function to switch color between "Donation" and "history"
    function toggleButtonStyles(button1, button2) {
        button1.classList.add('bg-lime-400', 'text-black');  
        button1.classList.remove('bg-white', 'text-gray-700');  
        button2.classList.add('bg-white', 'text-gray-700');  
        button2.classList.remove('bg-lime-400', 'text-black');  
    }

    // Function to switch to the history section
    function showHistory() {
        toggleVisibility(historySection, donationSection, historyButton, donationButton);  
    }

    // Function to switch to the donation section
    function showDonation() {
        toggleVisibility(donationSection, historySection, donationButton, historyButton);  
    }

    // Function to add a new donation to history
    function addHistoryEntry(amount, cause) {
        const entry = document.createElement('div');  
        entry.className = 'bg-white p-4 rounded shadow';  
        entry.innerHTML = `
            <p class="font-bold">${amount} BDT is Donated for ${cause}</p>
            <p class="text-gray-500">Date: ${new Date().toLocaleString()}</p>
        `;  
        historyList.appendChild(entry);  
    }

    // function to get integer value by it's id 
    function getInputValueById(id) {
        const inputField = document.getElementById(id);  
        return inputField ? parseInt(inputField.value, 10) : null;  
    }

    // Function to validate that the amount entered is a positive number
    function validateAmount(amount) {
        return !isNaN(amount) && amount > 0; 
    }

    // Function to handle the donation process
    function donate(cause) {
        const amount = getInputValueById(`donate-${cause}`);  

        if (!validateAmount(amount)) {  
            alert('Please enter a valid positive number.');  
            return;  
        }

        if (amount > currentFunds) {  
            alert('Insufficient funds.'); 
            return;  
        }

        currentFunds -= amount;  
        updateFundsDisplay();  

        // Update the total amount for a section 
        const totalElement = document.getElementById(`total-${cause}`);  
        const currentTotal = parseInt(totalElement.textContent.split(' ')[0], 10);  
        totalElement.textContent = `${currentTotal + amount} BDT`;  

        addHistoryEntry(amount, cause);
        showModal();  
    }

    // applying  event listeners to all buttons 
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
