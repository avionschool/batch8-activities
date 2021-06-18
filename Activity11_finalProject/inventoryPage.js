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
let addDonorPopup = document.getElementById('addDonorPopup');
let addLocationPopup = document.getElementById('addLocationPopup');

document.getElementById('inventoryLink').addEventListener('click', function() {
    inventoryPopup.classList.remove('hidden');
    storePopup.classList.add('hidden');
        cashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    transactionHistoryPopup.classList.add('hidden');
    addDonorPopup.classList.add('hidden');
    addLocationPopup.classList.add('hidden');
})

document.getElementById('storeLink').addEventListener('click', function() {
    storePopup.classList.remove('hidden');
        cashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    addDonorPopup.classList.add('hidden');
    addLocationPopup.classList.add('hidden');
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
    addDonorPopup.classList.add('hidden');
    addLocationPopup.classList.add('hidden');
})

document.getElementById('transactionHistoryLink').addEventListener('click', function() {
    inventoryPopup.classList.add('hidden');
    storePopup.classList.add('hidden');
        cashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    transactionHistoryPopup.classList.remove('hidden');
    addDonorPopup.classList.add('hidden');
    addLocationPopup.classList.add('hidden');
})

document.getElementById('addDonorLink').addEventListener('click', function() {
    storePopup.classList.add('hidden');
        CashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    addDonorPopup.classList.remove('hidden');
    addLocationPopup.classList.add('hidden');
})

document.getElementById('addLocationLink').addEventListener('click', function() {
    storePopup.classList.add('hidden');
        CashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    addDonorPopup.classList.add('hidden');
    addLocationPopup.classList.remove('hidden');
})

function exit() {
    storePopup.classList.add('hidden');
    cashDepositPopup.classList.add('hidden');
    storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    addDonorPopup.classList.add('hidden');
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
        // console.log("itemTrackingNumber = " + itemTrackingNumber);
        
        localStorage.setItem(itemTrackingNumber, JSON.stringify(itemObject));
        let getItems = JSON.parse(localStorage.getItem(itemTrackingNumber));
            // console.log(getItems);

        itemArr.push(getItems);
            // console.log(itemArr);
            
        // adding a row to the table to the table
        let tableBodyInventory = document.getElementById('tableBodyInventory');
        let donated = 0;
        
        //template literals
        // ` translates the value literally to the HTML
        // ${} placeholder to display values of variables
        let rowTemplateInventory = 
            `<tr id="product-${newProductCode}" class="tableStyle">
                <td class="product_donor">${this.donor}</td>
                <td class="product_code">${newProductCode}</td>
                <td class="product_date">${this.date}</td>
                <td class="product_itemdes">${this.itemDescription}</td>
                <td class="product_quantity">${this.quantity}</td>
                <td class="product_donated">${donated}</td>
            </tr>`;

        tableBodyInventory.innerHTML = tableBodyInventory.innerHTML + rowTemplateInventory;

        let record = "Type: Store/" + 
        "Donor: " + this.donor + "/" + 
        "ProdCode: " + newProductCode + "/" +  
        "Date: " + this.date + "/" + 
        "ItemDes: " + this.itemDescription + "/" +  
        "Quantity: " + this.quantity;

        let rowTemplateHistory = 
        `<tr>
            <td>${record}</td>
        </tr>`;

        let tableBodyHistory = document.getElementById('tableBodyHistory');
        tableBodyHistory.innerHTML = tableBodyHistory.innerHTML + rowTemplateHistory;

        storeProductPopup.classList.add('hidden');
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


// .values > object > localstorage > arr > display

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
        
        // console.log(this.productCode);
        // should be = to productCode.value

        //1
       
        let getObj = JSON.parse(localStorage.getItem(this.productCode));
            // console.log(getObj);
            // should return the object of this.productCode key

            //1 object

        let difference = getObj.quantity - this.amount;
            // console.log(getObj.quantity);
            // should be the quantity of the object
            // console.log(this.amount);
            // should be = to amount.value
            // console.log(difference);
            // should be the result

            //3 quantity - 1 amount
            //2 quantuty

        getObj.quantity = difference;
            // console.log(getObj.quantity)
            // double check if results are copied

            //2 quantity = 2 quantity

        localStorage.setItem(this.productCode, JSON.stringify(getObj));
            // push to localstorage

        let targetQuantity = document.querySelector(`#product-${this.productCode} .product_quantity`);
            // console.log(targetQuantity.innerHTML);
            // targeted the id="product-this.productCode" .product_quantity
            targetQuantity.innerHTML = getObj.quantity ;
            // console.log(targetQuantity.innerHTML);
            // replace with updated
        
        let targetDonated = document.querySelector(`#product-${this.productCode} .product_donated`);
        console.log(targetDonated.innerHTML);
        console.log(this.amount);
        
        targetDonated.innerHTML = Number(targetDonated.innerHTML) + Number(this.amount);

        //id 1 class donated
        //0

        let record = "Type: Donate/" + 
        "ProdCode: " + newProductCode + "/" +  
        "Quantity: " + this.amount + "/" + 
        "Receiver: " + this.receiver + "/" +
        "ID Presented: " + this.idType;
     
        let rowTemplateHistory = 
        `<tr>
            <td>${record}</td>
        </tr>`;

        let tableBodyHistory = document.getElementById('tableBodyHistory');
        tableBodyHistory.innerHTML = tableBodyHistory.innerHTML + rowTemplateHistory;


        donatePopup.classList.add('hidden');
        alert('Successful: Donation made.');
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

let logout = document.getElementById('logout');

logout.addEventListener('click', function() {
    alert ("Success: Logged out.");
    return window.location.replace('loginPage.html');
});