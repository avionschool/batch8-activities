let Book = function(title, quantity, value) {
    this.title = title;
    this.quantity = quantity;
    this.value = value;
}

let inferno = new Book("Inferno", 5, 19.99);
let purgatorio = new Book("Purgatorio", 11, 15.75);

let store = {
    name: "Cubby Hole",
    inventoryList: [inferno, purgatorio],
    earnings: 0,
}

function addBook(title, quantity, value) {
    store.inventoryList.push(new Book(title, quantity,value));
}

addBook('Moby Dick', 7, 12.50);

function restockBook(title, quantity) {
    // search in inventoryList
    let index = store.inventoryList.findIndex(function(item) {
        return item.title == title;
    })

    if (index === -1) { // -1 if book title does not exist in inventoryList
        alert(`The Book, ${title}, does not exist in inventory list. Restocking failed`);
    } else {
        store.inventoryList[index].quantity += quantity;
    }
}

restockBook("Moby Dick", 2);
restockBook("Paradiso", 3);

function sellBook(title, quantity) {
    // search in inventoryList
    let index = store.inventoryList.findIndex(function(item) {
        return item.title == title;
    })
    let selectedBook = store.inventoryList[index];

    if (index === -1) {
        alert(`${title} out of stock`);
    }
    else if (quantity > selectedBook.quantity) {
        alert(`only ${selectedBook.quantity} stocks left`);
    }
    else {
        selectedBook.quantity -= quantity;
        store.earnings += selectedBook.value * quantity;
        alert('Successful transaction');
    }
}

sellBook("My Fair Lady", 5); // no stock
sellBook("Inferno", 15); // limited stock
sellBook("Moby Dick", 2); // successful sale

function totalEarnings() {
    alert(`Your store ${store.name}, has earned a total of $${store.earnings}`);
}

totalEarnings();

function listInventory() {
    let message = `${store.name} currently has the following books: \n`;
    for (i = 0; i < store.inventoryList.length; i++) {
        let = selectedBook = store.inventoryList[i];
        message += `${selectedBook.title} | Qty:${selectedBook.quantity} | $${selectedBook.value} \n`;
    }
    alert(message);
    console.table(store.inventoryList);
}

listInventory();