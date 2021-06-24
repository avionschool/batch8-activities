// LOCALE STORAGE ======================================================================

const threadBtn = document.getElementById('thread-btn');
console.log(threadBtn)



// //=======================================================================

    function getStoredData() {
        let storeData;
        if(localStorage.getItem('value') === null) {
            storeData = [];
        } else {
            storeData = JSON.parse(localStorage.getItem('value'));
        }
        return storeData;
    }

    function addData (value) {
        let storeData = getStoredData();
        storeData.push(value);
        localStorage.setItem('value', JSON.stringify(storeData));
    }

// //=======================================================================

    function getName() {
        alert('1')
        let newName = document.getElementById("name-input").value;
        // let newMessage = document.getElementById("message-input").value;
        console.log(newName)
        let value = {
            newName: newName,
            // newMessage: newMessage

        }

        addData(value);
        clearForm.reset();
    }

    function displayThread () {
        let storeData = getStoredData();
        let html = "";
        for(let i = 0; i < storeData.length; i++) {
            console.log(storeData)
            if (storeData) {
                html += `
                <div>
                    <h3 class="thread-name">Doe</h3>
                    <p class="thread-message">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis suscipit recusandae totam architecto tempora rem. Dolore ea enim cum hic!</p>
                </div>
                `;
            }
        }

    }


 



// getName();

threadBtn.addEventListener('click', (e) => {
    alert('1')
    e.preventDefault();
    getName();
});