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


// invoke functions here:
//  quizGameExp();
createObject();
