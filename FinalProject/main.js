

const searchBtn = document.getElementById('search-btn');
const gameList = document.getElementById('game');
const gameDetailsContent = document.querySelector('.game-details-content');
const pagination = document.querySelector('.pagination');
const gameCloseBtn = document.getElementById('game-close-btn');
const gameArray = [];
const searchInputTxt = document.getElementById('search-input');
const guide = document.getElementById('guide');
const icon = document.getElementById('icon');
const logo = document.getElementById('logo');
const threadBtn = document.getElementById('thread-btn');
console.log(threadBtn)


// event-listeners==============================================================

searchBtn.addEventListener('click', getGameList);
searchInputTxt.addEventListener('keyup', handleEvent);
gameList.addEventListener('click', getGameDetails);
gameCloseBtn.addEventListener('click', () => {
    gameDetailsContent.parentElement.classList.remove('showGameDetails')
})
icon.onclick = function () {
    document.body.classList.toggle('darkTheme')
    if(document.body.classList.contains('darkTheme')){
        logo.src= 'img/sun.png';
    } else {
        logo.src = 'img/moon.png';  
    }
}



// functions ==============================================================

function handleEvent(e) {
    if (e.keyCode === 13) {
        console.log('click')
        getGameList();
    }
}

function getGameList(){
    let title = document.getElementById('title-result');

    fetch("https://free-to-play-games-database.p.rapidapi.com/api/games?category=" + searchInputTxt.value.trim(), {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "f3f1f3425emshcb6d4255d503affp138c2ejsn35b19ef10ade",
		"x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
	}
})
    .then(response => response.json())
    .then(data => {
        let html = "";
        for(i = 0; i < data.length; i++) {  
            if(data){                  
                html += `
                <div class="game-item" data-id = "${data[i].id}">
                    <div class="game-img">
                        <img src="${data[i].thumbnail}" alt="">
                    </div>
                    <div class="game-name">
                        <h3>${data[i].title}</h3>
                        <a href="#" class="game-btn">Details</a>
                    </div>
                </div>
            `;
            } 
        } 
        gameList.innerHTML = html;
        searchInputTxt.reset();
        title.style.display = 'block';
    })

}


// MODAL FUNCTION ======================================================================
function getGameDetails (e) {
    e.preventDefault();
    if(e.target.classList.contains('game-btn')) {
        let gameItem = e.target.parentElement.parentElement;
        fetch("https://free-to-play-games-database.p.rapidapi.com/api/game?id=" + gameItem.dataset.id, {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-key": "f3f1f3425emshcb6d4255d503affp138c2ejsn35b19ef10ade",
		    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
        	}
        })
        .then(response => response.json())
        .then(data => gameModal(data))
    }
    
}


function gameModal (data){
            let html = `
        <h2 class="game-title">${data.title}</h2>
            <p class="game-category">${data.genre}</p>
        <div class="game-preview">
            <h3>${data.publisher}</h3>
            <p>${data.description}</p>
        </div>
        <div class="game-preview-img">
            <img src="${data.thumbnail}" alt="">
        </div>
        <div class="game-link">
            <a href="${data.game_url}" target="_blank">See full details.</a>
        </div>
    `;
    gameDetailsContent.innerHTML = html;
    gameDetailsContent.parentElement.classList.add('showGameDetails')
 }


// DISPLAY GAMELIST PAGINATION ======================================================================
function allGames () { 
     
    return fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "f3f1f3425emshcb6d4255d503affp138c2ejsn35b19ef10ade",
		"x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
	    }
    })

    .then((response) => response.json())
    .then((data) =>  {
        return data; 
    });
        
}

// function allGames () { 
     
//     return fetch("https://rawg.io/api/games/portal-2/screenshots?page=&page_size=?key=6c6ab656d98643b0aa9f276fdb1116a7", {
        
//         "method": "GET",
//         "headers": {
//             "User-Agent": "Edwin's Personal project",
//             "token": "6c6ab656d98643b0aa9f276fdb1116a7"
//             }
        
// 	// "method": "GET",
// 	// "headers": {
// 	// 	"x-rapidapi-key": "f3f1f3425emshcb6d4255d503affp138c2ejsn35b19ef10ade",
// 	// 	"x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
// 	//     }
//     })

//     .then((response) => response.json())
//     .then((data) =>  { console.log(data)
//         return data; 
//     });
        
// }

//  allGames();



let current_page = 1;
let records_per_page = 9;
let returnGame = allGames();

function prevPage(){
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    };
};

function nextPage(){
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    };
};


    
    
function changePage(page){
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var page_span = document.getElementById("page");

 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();
    
    returnGame
    .then(response => {
    
    
    let html = "";
    for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < response.length; i++) {
        if(response) {
            html += `
                 <div class="game-item" data-id = "${response[i].id}">
                     <div class="game-img">
                         <img src="${response[i].thumbnail}" alt="">
                     </div>
                     <div class="game-name">
                         <h3>${response[i].title}</h3>
                         <a href="#" class="game-btn">Details</a>
                     </div>
                 </div>
             `;
        }
        
    };
    gameList.innerHTML = html; 

    });


    page_span.innerHTML = page + "/" + numPages();

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    };
};



function numPages() {

    // returnGame
    // console.log(returnGame)
    // .then(response => {
    // return Math.ceil(response.length / records_per_page);
    // });

    return 37
};




window.onload = function() {
    changePage(1);
};

// need to work on ========================================================================



// on display off display functions ============================================================

function home() {
    let gameHub = document.getElementById('gameHub');
    guide.style.display = 'none';
    gameHub.style.display = 'block';
}

function streamerGuide() {
    let gameHub = document.getElementById('gameHub');
    guide.style.display = 'block';
    gameHub.style.display = 'none';
}

// LOCALE STORAGE ======================================================================


class UserThread {
    constructor (newName, newMessage) {
        this.name = newName,
        this.message = newMessage
    }

//=======================================================================

    static getStoredData() {
        let storeData;
        if(localStorage.getItem('value') === null) {
            storeData = [];
        } else {
            storeData = JSON.parse(localStorage.getItem('value'));
        }
        return storeData;
    }

    static addData (value) {
        let storeData = UserThread.getStoredData();
        storeData.push(value);
        localStorage.setItem('value', JSON.stringify(storeData));
    }

//=======================================================================

    static getName() {
        let newName = document.getElementById("name-input").value;
        let newMessage = document.getElementById("message-input").value;
        let value = {
            name: newName,
            message: newMessage

        }

        UserThread.addData(value);
        clearForm.reset();
    }

    static displayThread () {
        let threadBox = document.getElementById('thread-box');
        let storeData = UserThread.getStoredData();
        let html = "";
        for(let i = 0; i < storeData.length; i++) {
            console.log(storeData[i].name)
            console.log(storeData[i].message)
            if (storeData) {
                html += `
                <div>
                    <h3 class="thread-name">${storeData[i].name}</h3>
                    <p class="thread-message">${storeData[i].message}</p>
                </div>
                `;
            }
            threadBox.innerHTML = html

        }

    }


}


UserThread.displayThread ()
// UserThread.getName();

threadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    UserThread.getName();
    UserThread.displayThread ()
});










































// functioning display of games ================================================================

// function allGames () { 
//     fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", {
//    "method": "GET",
//    "headers": {
//        "x-rapidapi-key": "f3f1f3425emshcb6d4255d503affp138c2ejsn35b19ef10ade",
//        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
//        }
//    })

//    .then(response => response.json())
//    .then(data => {
//        let html = "";
//        for(i = 0; i < data.length; i++) {
//            if(data){                   
//                html += `
//                <div class="game-item" data-id = "${data[i].id}">
//                    <div class="game-img">
//                        <img src="${data[i].thumbnail}" alt="">
//                    </div>
//                    <div class="game-name">
//                        <h3>${data[i].title}</h3>
//                        <a href="#" class="game-btn">Details</a>
//                    </div>
//                </div>
//            `;
//            }
//        }
//        gameList.innerHTML = html; 
//        console.log(html)
//    })

// }

// allGames()
    
//end of functioning display of games ==========================================================