// sidebar id links
let storeLink = document.getElementById('storeLink');
    let cashDepositLink = document.getElementById('cashDepositLink');
    let storeProductLink = document.getElementById('storeProductLink');
let donateLink = document.getElementById('donateLink');
let addDonorLink = document.getElementById('addDonorLink');
let addLocationLink = document.getElementById('addLocationLink');
let inventoryLink = document.getElementById('inventoryLink');

let transactionHistoryLink = document.getElementById('transactionHistoryLink');
let locationLink = document.getElementById('locationLink');
let donorLink = document.getElementById('donorLink');

// sidebar popup ids
let storePopup = document.getElementById('storePopup');
    let cashDepositPopup = document.getElementById('cashDepositPopup');
    let storeProductPopup = document.getElementById('storeProductPopup');
let donatePopup = document.getElementById('donatePopup');
let addDonorPopup = document.getElementById('addDonorPopup');
let addLocationPopup = document.getElementById('addLocationPopup');

let inventoryPopup = document.getElementById('inventoryPopup');
let transactionHistoryPopup = document.getElementById('transactionHistoryPopup');
let listPopup = document.getElementById('listPopup');

// opacity ids
let header = document.getElementById('header');
let dashboard = document.getElementById('dashboard');
let footer = document.getElementById('footer');

// opacity functions
function removeOpacity() {
    header.classList.remove('opacity');
    dashboard.classList.remove('opacity');
    footer.classList.remove('opacity');
};

function addOpacity() {
    header.classList.add('opacity');
    dashboard.classList.add('opacity');
    footer.classList.add('opacity');
};

//sidebar functions
document.getElementById('inventoryLink').addEventListener('click', function() {
    inventoryPopup.classList.remove('hidden');
    storePopup.classList.add('hidden');
        cashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    transactionHistoryPopup.classList.add('hidden');
    addDonorPopup.classList.add('hidden');
    addLocationPopup.classList.add('hidden');
    listPopup.classList.add('hidden');
    removeOpacity();
});

document.getElementById('storeLink').addEventListener('click', function() {
    storePopup.classList.remove('hidden');
        cashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    addDonorPopup.classList.add('hidden');
    addLocationPopup.classList.add('hidden');
    addOpacity();
});
    document.getElementById('cashDepositLink').addEventListener('click', function() {
        storePopup.classList.add('hidden');
            cashDepositPopup.classList.remove('hidden');
    });
    document.getElementById('storeProductLink').addEventListener('click', function() {
        storePopup.classList.add('hidden');
            storeProductPopup.classList.remove('hidden');
    });

document.getElementById('donateLink').addEventListener('click', function() {
    storePopup.classList.add('hidden');
        cashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.remove('hidden');
    addDonorPopup.classList.add('hidden');
    addLocationPopup.classList.add('hidden');
    addOpacity();
});

document.getElementById('transactionHistoryLink').addEventListener('click', function() {
    inventoryPopup.classList.add('hidden');
    storePopup.classList.add('hidden');
        cashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    transactionHistoryPopup.classList.remove('hidden');
    addDonorPopup.classList.add('hidden');
    addLocationPopup.classList.add('hidden');
    listPopup.classList.add('hidden');
    removeOpacity();
});

document.getElementById('addDonorLink').addEventListener('click', function() {
    storePopup.classList.add('hidden');
        cashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    addDonorPopup.classList.remove('hidden');
    addLocationPopup.classList.add('hidden');
    addOpacity();
});

document.getElementById('addLocationLink').addEventListener('click', function() {
    storePopup.classList.add('hidden');
        cashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    addDonorPopup.classList.add('hidden');
    addLocationPopup.classList.remove('hidden');
    addOpacity();
});

function donorLocationLink() {
    inventoryPopup.classList.add('hidden');
    storePopup.classList.add('hidden');
        cashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    transactionHistoryPopup.classList.add('hidden');
    addDonorPopup.classList.add('hidden');
    addLocationPopup.classList.add('hidden');
    listPopup.classList.remove('hidden');
    removeOpacity();
};

document.getElementById('locationLink').addEventListener('click', function() {
    donorLocationLink();
});

document.getElementById('donorLink').addEventListener('click', function() {
    donorLocationLink();
});

function exit() {
    storePopup.classList.add('hidden');
        cashDepositPopup.classList.add('hidden');
        storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    addDonorPopup.classList.add('hidden');
    addLocationPopup.classList.add('hidden');
    removeOpacity();    
};

// global variables
let itemTrackingNumber = 0;
let itemArr = [];
let newProductCode = 0;

// class for creating and storing products
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
            this.itemDescription.length == 0 ||
            this.quantity.length == 0) {
            console.log('Error caught: Input empty.');
            return alert ('Error: Please fill out the details required.');
        };

        for (let i = 0; i < itemArr.length; i++) {
            if (itemArr[i].donor == this.donor && 
                itemArr[i].date == this.date && 
                itemArr[i].itemDescription == this.itemDescription) {
                console.log('Error caught: Duplicate entry.');
                return alert ('Error: Duplicate entry found.');
            };
        };
        
        // create a key-itemTrackingNumber and store it in the database
        itemTrackingNumber += 1;
            console.log(itemTrackingNumber);
        
        localStorage.setItem(itemTrackingNumber, JSON.stringify(itemObject));
        let getItems = JSON.parse(localStorage.getItem(itemTrackingNumber));
            console.log(getItems);

        itemArr.push(getItems);
            console.log(itemArr);
            
        // adding a row to the table to the table
        let tableBodyInventory = document.getElementById('tableBodyInventory');
        let donated = 0;
        
        //template literals
            // ` translates the value literally to the HTML
            // ${} placeholder to display values of variables
        let rowTemplateInventory = 
            `<tr id="product-${newProductCode}">
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

        removeOpacity();
        storeProductPopup.classList.add('hidden');
        alert('Successful: Item stored.');
    };
};

let storeButton = document.getElementById('storeButton');

storeButton.addEventListener('click', function() {
    let donor = document.getElementById('donor').value;
    let date = document.getElementById('date').value;
    let itemDescription = document.getElementById('itemDescription').value;
    let quantity = document.getElementById('quantity').value;

    let newItem = new Create(donor, date, itemDescription, quantity);
    
    newItem.storeItem();
});

// class for donating products
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
        };
        
        console.log(this.productCode);
        // should be = to productCode.value

        let getObj = JSON.parse(localStorage.getItem(this.productCode));
            console.log(getObj);
            // should return the object of this.productCode key

        let difference = getObj.quantity - this.amount;
            console.log(getObj.quantity);
            // should be the quantity of the object
            console.log(this.amount);
            // should be = to amount.value
            console.log(difference);
            // should be the result

        getObj.quantity = difference;
            console.log(getObj.quantity);
            // double check if results are copied

        localStorage.setItem(this.productCode, JSON.stringify(getObj));
            // push to localstorage

        let targetQuantity = document.querySelector(`#product-${this.productCode} .product_quantity`);
            console.log(targetQuantity.innerHTML);
            // targeted the id="product-this.productCode" .product_quantity
            targetQuantity.innerHTML = getObj.quantity;
            console.log(targetQuantity.innerHTML);
            // replace with updated
        
        let targetDonated = document.querySelector(`#product-${this.productCode} .product_donated`);

        console.log(targetDonated.innerHTML);
        console.log(this.amount);
        targetDonated.innerHTML = Number(targetDonated.innerHTML) + Number(this.amount);

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

        removeOpacity();
        donatePopup.classList.add('hidden');
        alert('Successful: Donation made.');
    }
}

let donateButton = document.getElementById('donateButton');

donateButton.addEventListener('click', function() {
    let productCode = document.getElementById('productCode').value;
    let amount = document.getElementById('amount').value;
    let receiver = document.getElementById('receiver').value;
    let idType = document.getElementById('idType').value;

    let donateDetails = new Donate (productCode, amount, receiver, idType);

    donateDetails.donateItem();
});

// class for depositing money
class Deposit {
    constructor(TempCashDonor, TempCashValue, TempDepositDate) {
        this.cashDonor = TempCashDonor;
        this.cashValue = TempCashValue;
        this.depositDate = TempDepositDate;
    }
    deposit() {
        if (this.cashDonor.length == 0 ||  
            this.cashValue.length == 0 || 
            this.depositDate.length == 0) {
            console.log('Error caught: Input empty.');
            return alert ('Error: Please fill out the details required.');
        };

        let balance = document.getElementById('balance');

        balance.innerHTML = Number(balance.innerHTML) + Number(this.cashValue);

        let record = 
        "Type: cashDeposit/" + 
        "Date: " + this.depositDate + "/" +
        "Donor: " + this.cashDonor + "/" +  
        "Amount: " + this.cashValue;
        
        let rowTemplateHistory = 
        `<tr>
            <td>${record}</td>
        </tr>`;

        let tableBodyHistory = document.getElementById('tableBodyHistory');
        tableBodyHistory.innerHTML = tableBodyHistory.innerHTML + rowTemplateHistory;

        removeOpacity();
        cashDepositPopup.classList.add('hidden');
        alert('Successful: Deposit made.');
    }
}

let depositButton = document.getElementById('depositButton');

depositButton.addEventListener('click', function() {
    let cashDonor = document.getElementById('cashDonor').value;
    let cashValue = document.getElementById('cashValue').value;
    let depositDate = document.getElementById('depositDate').value;

    let depositDetails = new Deposit (cashDonor, cashValue, depositDate);

    depositDetails.deposit();
});

// class for logging donor and location lists
class DonorLocation {
    constructor(TempAddDonorDate, TempAddDonorName, TempAddLocationDate, TempAddLocationName) {
        this.addDonorDate = TempAddDonorDate;
        this.addDonorName = TempAddDonorName;
        this.addLocationDate = TempAddLocationDate;
        this.addLocationName = TempAddLocationName;
    }
    storeDonorDetails() {
        if (this.addDonorDate.length == 0 ||  
            this.addDonorName.length == 0) {
            console.log('Error caught: Input empty.');
            return alert ('Error: Please fill out the details required.');
        }

        let rowTemplateAddDonor = 
        `<tr>
            <td>${this.addDonorDate}</td>
            <td>${this.addDonorName}</td>
        </tr>`;

        let tableBodyDonor = document.getElementById('tableBodyDonor');
        tableBodyDonor.innerHTML = tableBodyDonor.innerHTML + rowTemplateAddDonor;

        removeOpacity();
        addDonorPopup.classList.add('hidden');
        alert('Successful: Added to list.');
    }
    storeLocationDetails() {
        if (this.addLocationDate.length == 0 ||  
            this.addLocationName.length == 0) {
            console.log('Error caught: Input empty.');
            return alert ('Error: Please fill out the details required.');
        }

        let rowTemplateAddLocation = 
        `<tr>
            <td>${this.addLocationDate}</td>
            <td>${this.addLocationName}</td>
        </tr>`;

        let tableBodyLocation = document.getElementById('tableBodyLocation');
        tableBodyLocation.innerHTML = tableBodyLocation.innerHTML + rowTemplateAddLocation;

        removeOpacity();
        addLocationPopup.classList.add('hidden');
        alert('Successful: Added to list.');
    }
}

let addDonorButton = document.getElementById('addDonorButton');
let addLocationButton = document.getElementById('addLocationButton');

addDonorButton.addEventListener('click', function() {
    let addDonorDate = document.getElementById('addDonorDate').value;
    let addDonorName = document.getElementById('addDonorName').value;
    let addLocationDate = document.getElementById('addLocationDate').value;
    let addLocationName = document.getElementById('addLocationName').value;

    let donorLocationDetails = new DonorLocation (addDonorDate, addDonorName, addLocationDate, addLocationName);

    donorLocationDetails.storeDonorDetails() ;
});

addLocationButton.addEventListener('click', function() {
    let addDonorDate = document.getElementById('addDonorDate').value;
    let addDonorName = document.getElementById('addDonorName').value;
    let addLocationDate = document.getElementById('addLocationDate').value;
    let addLocationName = document.getElementById('addLocationName').value;

    let donorLocationDetails = new DonorLocation (addDonorDate, addDonorName, addLocationDate, addLocationName);

    donorLocationDetails.storeLocationDetails();
});

//logout function
let logout = document.getElementById('logout');

logout.addEventListener('click', function() {
    alert ("Success: Logged out.");
    return window.location.replace('loginPage.html');
});