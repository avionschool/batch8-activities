const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos"
let toDos = [];

// To make toDos hover transition smoothly
//
// function updateTransition() {
//   const li = toDoList.querySelector(".toDos");
//   if (li) {
//     li.className = ".toDos-hover";
//   } else {
//     li = document.querySelector("toDos-hover");
//     li.className = "toDos";
//   }
   
//   return li;
// }

function deleteToDo(event){
  // delete todo in HTML
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  // delete todo in local storage
  const cleanToDo = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  });
  console.log("cleanToDo", cleanToDo);
  toDos = cleanToDo;
  saveToDos();
}

function saveToDos(){
  // JS Object형태가 아닌 string으로 변환해서 local storage에 저장해야함
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  // console.log("save");
  // console.log("toDos", toDos);
}

function paintToDo(text){
  // text를 받아서 HTML상에 그려주는 함수
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;
  // console.log("newId", newId);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.classList.add("toDos");
  li.id = newId;
  toDoList.appendChild(li);
  span.innerText = text;
  delBtn.innerText = "delete";
  delBtn.classList.add("delete-btn");
  delBtn.addEventListener("click", deleteToDo);
  // text를 받아서 local storage의 toDos에 array형태로 저장
  const toDoObj = {
      id: newId,
      text: text,
  }
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event){
  event.preventDefault(); // Enter를 누를 때마다 새로고침되는 것을 막음
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo){
      paintToDo(toDo.text);
    })
  } else {
    console.log("todos doesn't exist");
  }
}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();