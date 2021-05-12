Coding Challenge: BOOK STORE
Create an object store that will contain the name of the store, inventory list, and the earnings

Create an object book that will contain the title, the quantity, and the valueof the book

Create a function addBook() that creates a book object (with title, quantityand value) and add it to an array of book objects in the store inventory

Create a function restockBook() that takes the parameters titleand quantityand adds the corresponding book to theinventory. The book should already exist in the inventory, if not, restock should not push thru.

Create a function sellBook() that takes the parameter titleand quantity. When called, it searches for the book withthe corresponding title, deducts the quantity, and adds the earnings accordingly 
    If the book does not exist, transaction will fail then print a message ${book-title} out of stock.

    If quantity is less than what is in the inventory, transaction will fail then print message only ${number} stocks left

    If sell was successful, print message "Successful transaction".
    
Create a function totalEarnings() that will display the total earnings of the store, print store name and earnings;

Create a function listInventory() that will display all of books in the inventory, print title quantity and value;