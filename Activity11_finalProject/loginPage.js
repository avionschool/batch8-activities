window.onload = realTime();

function realTime() {
    let dateTime = new Date();
    let hours = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    let seconds = dateTime.getSeconds();
    let peroid = (hours > 12) ? 'AM' : 'PM';

    hours = (hours > 12) ? hours - 12 : hours;
    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);
    // "-" = removing & "2" = index
    
    let timeDisplay = document.getElementById('timeDisplay');

    timeDisplay.innerHTML = 
    hours + ": " + 
    minutes + ": " + 
    seconds + " " +
    peroid;

    setTimeout(realTime, 500);
    //1000 = 1 sec;

    let day = dateTime.getDay();
    let month = dateTime.getMonth();
    let date = dateTime.getDate();
    let year = dateTime.getFullYear();

    let monthList = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    let dayList = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY"
    ];

    //month will serve as an index for monthList
    let updatedMonth = monthList[month];
    let updatedDay = dayList[day];
    
    let dayDisplay = document.getElementById('dayDisplay');
    let dateDisplay = document.getElementById('dateDisplay');

    dateDisplay.innerHTML = 
    updatedMonth + " " + 
    date + ", " + 
    year;

    dayDisplay.innerHTML = updatedDay;
}

// to see documentation, visit "https://openweathermap.org/"
// used '&units=metric' to change to celsius
// API key = e9fda0468ea526972a52690dd74ea091

let inputValue = document.getElementById('inputValue');
let checkWeatherButton = document.getElementById('checkWeatherButton');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let tempMinMax = document.getElementById('tempMinMax');
let weatherDes = document.getElementById('weatherDes');
// let icon = document.getElementById('icon');

checkWeatherButton.addEventListener('click', function(name) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=metric&appid=e9fda0468ea526972a52690dd74ea091')
    // fetch('https://api.openweathermap.org/data/2.5/weather?q=Pasig&units=metric&appid=e9fda0468ea526972a52690dd74ea091')
    .then(response => response.json())
    .then(data => {
    let cityValue = data['name'];
    let tempValue = data['main']['temp'];
    let minTempValue = data['main']['temp_min'];
    let maxTempValue = data['main']['temp_max'];
    let weatherDesValue = data['weather'][0]['description'];
    let icon = data['weather'][0]['icon'];

    let iconValue = ('http://openweathermap.org/img/wn/icon@2x.png');

    city.innerHTML = cityValue;
    temperature.innerHTML = "temperature outside is " + tempValue + "&#176";
    tempMinMax.innerHTML = "(" + minTempValue + "&#176" + " - " + maxTempValue + "&#176" + ")";
    // weatherDes.innerHTML = weatherDesValue + iconValue;
    weatherDes.innerHTML = weatherDesValue;
    inputValue.value = "";

    let enterBranchPopup = document.getElementById('enterBranchPopup');
    enterBranchPopup.classList.add('hidden');

    let container = document.getElementById('container');
    let groceryOne = document.getElementById('groceryOne');
    let groceryTwo = document.getElementById('groceryTwo');
    let groceryThree = document.getElementById('groceryThree');
    let groceryFour = document.getElementById('groceryFour');
    let groceryFive = document.getElementById('groceryFive');
    let grocerySix = document.getElementById('grocerySix');

    container.classList.remove('opacity');
    groceryOne.classList.remove('opacity');
    groceryTwo.classList.remove('opacity');
    groceryThree.classList.remove('opacity');
    groceryFour.classList.remove('opacity');
    groceryFive.classList.remove('opacity');
    grocerySix.classList.remove('opacity');
})

.catch(err => alert("Error: City name does not exist."));
})

//fetch('https://api.openweathermap.org/data/2.5/weather?q=Pasig&appid=e9fda0468ea526972a52690dd74ea091')
// {
//     "coord": {
//         "lon":121.065,
//         "lat":14.587
//     },

//     "weather": [
//         {
//             "id":802,
//             "main":"Clouds",
//             "description":"scattered clouds",
//             "icon":"03d"
//         }
//     ],

//     "base": "stations",

//     "main": {
//         "temp":306.47,
//         "feels_like":312.75,
//         "temp_min":305.99,
//         "temp_max":307.37,
//         "pressure":1010,
//         "humidity":58
//     },

//     "visibility": 10000,
    
//     "wind": {
//         "speed":5.14,
//         "deg":270
//     },

//     "clouds": {
//         "all":40
//     },

//     "dt": 1623904625,

//     "sys": {
//         "type":1,
//         "id":8160,
//         "country":"PH",
//         "sunrise":1623878822,
//         "sunset":1623925574
//     },

//     "timezone" :28800,

//     "id":1694579,
    
//     "name":"Pasig",

//     "cod":200
// }

//LOGIN PAGE
// login and create account popup


let loginPopup = document.getElementById('loginPopup');
let createAccountPopup = document.getElementById('createAccountPopup');

document.getElementById('login').addEventListener('click', function () {
    loginPopup.classList.remove('hidden');
    createAccountPopup.classList.add('hidden');
});

document.getElementById('createAccount').addEventListener('click', function () {
    loginPopup.classList.add('hidden');
    createAccountPopup.classList.remove('hidden');
});

// function of link
let createAccountLink = document.getElementById('createAccountLink');
let loginLink = document.getElementById('loginLink');

document.getElementById('createAccountLink').addEventListener('click', function () {
    loginPopup.classList.add('hidden');
    createAccountPopup.classList.remove('hidden');
});

document.getElementById('loginLink').addEventListener('click', function () {
    loginPopup.classList.remove('hidden');
    createAccountPopup.classList.add('hidden');
});

// closing popups
let closeLoginPopup = document.getElementById('closeLoginPopup');
let closeCreateAccountPopup = document.getElementById('closeCreateAccountPopup');

document.getElementById('closeLoginPopup').addEventListener('click', function () {
    loginPopup.classList.add('hidden');
});

document.getElementById('closeCreateAccountPopup').addEventListener('click', function () {
    createAccountPopup.classList.add('hidden');
});

function exit() {
    storePopup.classList.add('hidden');
    cashDepositPopup.classList.add('hidden');
    storeProductPopup.classList.add('hidden');
    donatePopup.classList.add('hidden');
    addDonorLocationPopup.classList.add('hidden');
};

let userTrackNum = 100;

//Creating users
class User {
    constructor(tempNewUsername, tempNewEmail, tempNewPassword) {
        this.newUsername = tempNewUsername;
        this.newEmail = tempNewEmail;
        this.newPassword = tempNewPassword;
    }
    //can't catch duplicated yet
    createUser() {
        let userObject = {
            username: this.newUsername,
            email: this.newEmail,
            password: this.newPassword
        };

        if (this.newUsername.length == 0 || this.newEmail.length == 0 || this.newPassword == 0) {
            console.log('Error caught: Input empty.');
            return alert ('Error: Please fill out the details required.');
        }

        let userList = JSON.parse(localStorage.getItem('users'));
        //if there's no data yet in localstorage, create an empty arr[]=userList and add the 'userObject' inside
        //if there is, just push the new 'userObject' inside the arr[]=userList
        if (!userList) {
            userList = [userObject];
        } else {
            userList.push(userObject);
        }
        console.log(userList);
        //always check if userList-arr[] is updated
        localStorage.setItem('users', JSON.stringify(userList));
        
        alert ("Success: Account created.")
        createAccountPopup.classList.add('hidden');
        loginPopup.classList.remove('hidden');
    }
}

let createButton = document.getElementById('createButton');

createButton.addEventListener('click', function() {
    let newUsername = document.getElementById('newUsername').value;
    let newEmail = document.getElementById('newEmail').value;
    let newPassword = document.getElementById('newPassword').value;

    let newUser = new User(newUsername, newEmail, newPassword);
    
    newUser.createUser();
});


class Credentials {
    constructor(tempUsername, tempPassword) {
        this.username = tempUsername;
        this.password = tempPassword;
    }
    login() {
        if (this.username.length == 0 || this.password.length == 0) {
            console.log('Error caught: Input empty.');
            return alert ('Error: Please fill out the details required.');
        }

        let userList = JSON.parse(localStorage.getItem('users'));

        for (let i = 0; i < userList.length; i++) {
            if (userList[i].username == this.username || userList[i].password != this.password) {
                console.log(this.username);
                alert ("Error: Username/password mismatch.");
            } else {
                alert ("Success: Login successful.");
                return window.location.replace('inventoryPage.html');
            }
        }
    }
}

let loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', function() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let loggedCredentials = new Credentials(username, password);

    loggedCredentials.login();
})


// let userList = JSON.parse(localStorage.getItem('userDetails')) || []; 

// let alreadyExist = userList.some(function(user) {
//     return user.username == userObject.username || user.email == userObject.email;
// });

// if (alreadyExist) {
//     return alert ("Username/Email already exists!");
// };

// userList.push(userObject);

// localStorage.setItem('userDetails', JSON.stringify(userList));
// console.log(userList);



//             target = userList.filter( ({username}) => username == this.username);

//                 console.log('Error caught: Existing username.');
//                 return alert ('Error: Username already existing.');
//             }