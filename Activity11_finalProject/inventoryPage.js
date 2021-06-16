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

let itemTrackingNumber = 0;
const itemArr = [];
let newProductCode = 0;

class Create {
    constructor(tempDonor, tempDate, tempItemDescription, tempQuantity) {
        this.donor = tempDonor;
        this.date = tempDate;
        this.itemDescription = tempItemDescription;
        this.quantity = tempQuantity;
    }
    storeItem() {
        let itemObject = {
            donor: this.donor,
            productCode: newProductCode += 1,
            date: this.date,
            itemDescription: this.itemDescription,
            quantity: this.quantity
        };

        if (this.donor.length == 0 ||  
            this.date.length == 0 || 
            this.itemDescription == 0 ||
            this.quantity == 0) {
            console.log('Error caught: Input empty.');
            return alert ('Error: Please fill out the details required.');
        }

        for (let i = 0; i < itemArr.length; i++) {
            if (itemArr[i].donor == this.donor && 
                itemArr[i].date == this.date && 
                itemArr[i].itemDescription == this.itemDescription) {
                console.log('Error caught: Duplicate entry.');
                return alert ('Error: Duplicate entry found.');
            }
        }
    
        // create a key-itemTrackingNumber and store it in the database
        itemTrackingNumber += 1;
        console.log("itemTrackingNumber = " + itemTrackingNumber);
        
        localStorage.setItem(itemTrackingNumber, JSON.stringify(itemObject));
        let getItems = JSON.parse(localStorage.getItem(itemTrackingNumber));
            console.log(getItems);

        itemArr.push(getItems);
            console.log(itemArr);

        // adding a row to the table to the table
        let inventoryTable = document.getElementById('inventoryTable');
        let donated = 0;
        
        //template literals
        // ` translates the value literally to the HTML
        // ${} placeholder to display values of variables
        let rowTemplate = 
            `<tr>
                <td>${this.donor}</td>
                <td>${newProductCode}</td>
                <td>${this.date}</td>
                <td>${this.itemDescription}</td>
                <td>${this.quantity}</td>
                <td>${donated}</td>
            </tr>`;

        inventoryTable.innerHTML = inventoryTable.innerHTML + rowTemplate;

        alert('Successful: Item stored.')
    }
}

// storing products
let storeButton = document.getElementById('storeButton');

storeButton.addEventListener('click', function() {
    let donor = document.getElementById('donor').value;
    let date = document.getElementById('date').value;
    let itemDescription = document.getElementById('itemDescription').value;
    let quantity = document.getElementById('quantity').value;

    let newItem = new Create(donor, date, itemDescription, quantity);
    
    newItem.storeItem();
});



class Donate {
    constructor(tempProductCode, tempAmount, tempReceiver, tempidType) {
        this.productCode = tempProductCode;
        this.amount = tempAmount;
        this.receiver = tempReceiver;
        this.idType = tempidType;
    }
    donateItem() {
        if (this.productCode.length == 0 || 
            this.amount.length == 0 || 
            this.receiver.length == 0 ||
            this.idType.length == 0) {
        console.log('Error caught: Input empty.');
        return alert ('Error: Please fill out the details required.');
        }
    }
}

// donating products
let donateButton = document.getElementById('donateButton');

donateButton.addEventListener('click', function() {
    let productCode = document.getElementById('productCode').value;
    let amount = document.getElementById('amount').value;
    let receiver = document.getElementById('receiver').value;
    let idType = document.getElementById('idType').value;

    let donateDetails = new Donate (productCode, amount, receiver, idType);

    donateDetails.donateItem();
});