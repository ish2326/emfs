const addButton = document.getElementById("add-btn");
const inputArea = document.getElementById("input-area");
let textEntered = '';
let listItems = [];

function add() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    if (taskInput.value.trim() !== '') {
      const task = document.createElement('li');
      const taskText = document.createElement('span');
      taskText.innerText = taskInput.value;
  
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.onclick = function() {
        task.remove();
      };
  
      task.appendChild(taskText);
      task.appendChild(deleteButton);
      taskList.appendChild(task);
      taskInput.value = '';
    }
  }
  

function updateDisplay(list) {
    let innerHtmlString = '';
    list.forEach((element, index) => {
        innerHtmlString  = innerHtmlString + `<li id=${index} class="list-item">${element}</li>`;
    });
    const listArea = document.getElementById("list-area");
    listArea.innerHTML = innerHtmlString;
    // by the above line we are setting the data to document.
    const listElements = document.getElementsByClassName('list-item');
    Array.from(listElements).forEach((element) => {
        element.addEventListener('click', (event) => {
            removeElementFromArray(event.target.id);
        })
    })
}


function removeElementFromArray(itemIndex) {
    listItems = listItems.filter((item, index) => {
        return index != itemIndex;
    })
    updateDisplay(listItems);
}


// const removeElement = (arr, targetElement) => {
//     const targetIndex = arr.findIndex(element => element === targetElement); // uses binary search -> O(logn)
//     return [...arr.slice(0,targetIndex), ...arr.slice(targetIndex+1)]; // O(2n) = O(n)
// }

function saveToLocalStorage() {
    if(listItems.length === 0) {
        console.warn("You're trying to save empty data.");
        return;
    }
    const dataString = JSON.stringify(listItems);
    localStorage.setItem("todoListItems", dataString);
}

function loadFromLocalStorage() {
    const dataString = localStorage.getItem("todoListItems");
    listItems = JSON.parse(dataString);
    updateDisplay(listItems);
}

function clearLocalStorage() {
    localStorage.clear();
}