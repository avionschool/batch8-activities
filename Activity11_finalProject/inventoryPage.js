let inventoryLink = document.getElementById('inventoryLink');
let transactionHistoryLink = document.getElementById('transactionHistoryLink');

let storeLink = document.getElementById('storeLink');
    let cashDepositLink = document.getElementById('cashDepositLink');
    let storeProductLink = document.getElementById('storeProductLink');
let donateLink = document.getElementById('donateLink');
let addDonorLink = document.getElementById('addDonorLink');
let addLocationLink = document.getElementById('addLocationLink');

let inventoryPopup = document.getElementById('inventoryPopup');
let transactionHistoryPopup = document.getElementById('transactionHistoryPopup');

let storePopup = document.getElementById('storePopup');
    let cashDepositPopup = document.getElementById('CashDepositPopup');
    let storeProductPopup = document.getElementById('storeProductPopup');
let donatePopup = document.getElementById('donatePopup');
let addDonorLocationPopup = document.getElementById('addDonorLocationPopup');

document.getElementById('inventoryLink').addEventListener('click', function() {
    inventoryPopup.classList.remove('hidden');
    storePopup.classList.add('hidden');
        cashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    transactionHistoryPopup.classList.add('hidden');
    addDonorLocationPopup.classList.add('hidden');
})

document.getElementById('storeLink').addEventListener('click', function() {
    storePopup.classList.remove('hidden');
        cashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    addDonorLocationPopup.classList.add('hidden');
})
document.getElementById('cashDepositLink').addEventListener('click', function() {
    storePopup.classList.add('hidden');
    cashDepositPopup.classList.remove('hidden');
    storeProductPopup.classList.add('hidden');
})
document.getElementById('storeProductLink').addEventListener('click', function() {
    storePopup.classList.add('hidden');
    cashDepositPopup.classList.add('hidden');
    storeProductPopup.classList.remove('hidden');
})

document.getElementById('donateLink').addEventListener('click', function() {
    storePopup.classList.add('hidden');
        cashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.remove('hidden');
    addDonorLocationPopup.classList.add('hidden');
})

document.getElementById('transactionHistoryLink').addEventListener('click', function() {
    inventoryPopup.classList.add('hidden');
    storePopup.classList.add('hidden');
        cashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    transactionHistoryPopup.classList.remove('hidden');
    addDonorLocationPopup.classList.add('hidden');
})

document.getElementById('addDonorLink').addEventListener('click', function() {
    storePopup.classList.add('hidden');
        CashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.remove('hidden');
    addDonorLocationPopup.classList.remove('hidden');
})

document.getElementById('addLocationLink').addEventListener('click', function() {
    storePopup.classList.add('hidden');
        CashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.remove('hidden');
    addDonorLocationPopup.classList.remove('hidden');
})

function exit() {
    storePopup.classList.add('hidden');
    cashDepositPopup.classList.add('hidden');
    storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    addDonorLocationPopup.classList.add('hidden');
};