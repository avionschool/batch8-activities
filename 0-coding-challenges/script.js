// Quiz Game: Expert

function quizGameExp() {
  // variables

  let questionArr = [
    '1. What popular social networking site did Mark Zuckerberg create in 2004? \nA. Facebook \nB. Twitter \nC. Instagram',
    '2. What does WWW stand for? \nA. World Weird Wide \nB. World Wide Web \nC. What Why When',
    '3. What is the name of the browser developed and released by Google? \nA. Firefox \nB. Edge \nC. Chrome',
  ];
  let answersArr = ['A', 'A'];
  let answerKeyArr = ['A', 'B', 'C'];
  let QLen = questionArr.length;
  let userInput = '';
  let totalScore = 0;
  let randInt = 0;

  // generates random integer based on length of question array
  let genRandNum = (QLen) => {
    return Math.floor(Math.random() * QLen);
  };

  // displays random question using for loop
  // this implements "Arrow Function"
  let displayRandQues = () => {
    randInt = genRandNum(QLen);
    for (let i = 0; i < QLen; i++) {
      let userInput = prompt(questionArr[randInt]);
      // console.log("UI: " + userInput + " AK: " + answerKeyArr[randInt].toString());
      if (userInput.toString() === answerKeyArr[randInt].toString()) {
        alert('Correct!');
        totalScore++;
      } else {
        if (userInput != 'exit') {
          alert('Wrong!');
          // totalScore--;
        }
      }
      didUserExit(userInput.toString());
    }
  };

  // display score and ends quiz game
  // this implements storing function to a variable
  let endGame = function () {
    alert('Your final score is: ' + totalScore + '!');
    totalScore = 0;
    return;
  };

  // ends the game when user enters "exit" on the prompt
  // this implements most common type of declaring a function
  // accepts an argument
  function didUserExit(userInput) {
    userInput === 'exit' ? endGame() : displayRandQues();
  }

  // functions will be called here
  displayRandQues();
}

// Javascript topic: Objects
function createObject() {
  const student = {
    firstName: 'Lea',
    lastName: 'Tinoso',
    organization: {
      name: 'Avion',
      position: 'Student',
    },
    run: function () {
      return this.firstName;
    },
  };

  // console.log('firstName' in student);

  // checks if property exists in object using "in" operator
  // 'firstName' in student ? console.log(`${student.firstName} is here`) : console.log('false');

  // iterate property and value using for..in loop
  for (let key in student) {
    console.log(key); // iterates key
    console.log(student[key]); // iterates value
  }
}

// Javascript.info 'Object' challenges

// Coding challenge: object and prototypes
function bookStore() {
  let store = {
    storeName: 'Bookstore',
    inventoryList: [],
    earningsAmt: 0,
  };
  let book;

  function AddBook(title, qty, value) {
    book = {
      // this is equivalent to title = title;
      title,
      qty,
      value,
    };
    // adds book object to inventoryList array
    store.inventoryList.push(book);
  }

  // this function only re-stocks book when the book exists
  function restockBook(title, qty) {
    for (let i = 0; i < store.inventoryList.length; i++) {
      let isFound;
      let book = store.inventoryList[i];
      // sets value of isFound to true if book title was found
      title === book.title ? (isFound = true) : (isFound = false);
      if (isFound == true) {
        book.qty += qty;
        // console.log(`Book found.\nTitle: ${book.title} Quantity: ${book.qty}`);
        return;
      } else {
        // console.log(`Book not found. Re-stock failed.`);
        return;
      }
    }
  }

  function sellBook(title, qty) {
    let isFound;

    for (let i = 0; i < store.inventoryList.length; i++) {
      let book = store.inventoryList[i];
      if (title === book.title) {
        if (qty > book.qty) {
          console.log(`Only ${book.qty} stocks left.`);
          return;
        } else {
          let totalPrice = qty * book.value;
          store.earningsAmt += store.earningsAmt + qty * book.value; // updates earnings
          book.qty -= qty; // deducts quantity of book
          console.log(`Successful transaction`);
          return;
        }
      } else {
        console.log(`Book not found.`);
        return;
      }
    }
  }
  // invoke functions
  let book1 = new AddBook('Book1', 4, 10.0);
  let book2 = new AddBook('Book2', 1, 10.0);
  restockBook('Book1', 1);
  sellBook('Book1', 2);
  // console.table(store.inventoryList);
}

// invoke functions here:
// quizGameExp();
// createObject();
bookStore();
