const data = localStorage.getItem('todoList') ? JSON.parse(this.localStorage.getItem('todoList')) : [];
const add = document.querySelector('#add-button');
const ul = document.querySelector('.list');
const container = document.querySelectorAll('.container');
const clearAll = document.querySelector('.clear-all');

window.addEventListener('load', () => {
    displayDate();
    if (data.length == 0) {
        container[1].style.display = "none";
    } else {
        container[1].style.display = "block";
        data.forEach(item => {
            createLi(item);
        });
    }
});
add.addEventListener('click', (event) => {
    event.preventDefault();
    const form = document.querySelector('.form');
    let task = document.querySelector("#task");   
    let item = {
        state : false,
        text : task.value
    }
    if (task.value !== '') {
        data.push(item)
        displayDiv();
        localStorage.setItem("todoList", JSON.stringify(data));
        createLi(item);
        form.reset();
    } else {
        alert('please write a task!');
    }
});
clearAll.addEventListener('click', (event) =>{
    event.preventDefault();
    ul.innerHTML = "";
    data.splice(0, data.length);
    localStorage.setItem('todoList', JSON.stringify(data));
    container[1].style.display = "none";
    
})

function createLi(item) {
    const li = document.createElement('li');
    li.className = 'listItem';
    if (item.state) {
        li.innerHTML = `        
                        <span class="title checked">${item.text}</span> 
                        <span class="doneBtn fa-icon done-check"></span>
                        <span class="deleteBtn fa-icon"></span>
                        `;
    } else {
        li.innerHTML = `
                        <span class="title">${item.text}</span> 
                        <span class="doneBtn fa-icon"></span>
                        <span class="deleteBtn fa-icon"></span>
        `;
    }
    ul.append(li);
    removeBtn(item, li);
    completedBtn(item,li);
}
function removeBtn(item, li) {
    const deleteButton = li.querySelector('.deleteBtn');
    deleteButton.addEventListener('click', () => {
        li.remove();
        data.splice(data.indexOf(item),1);
        localStorage.setItem('todoList', JSON.stringify(data));
        displayDiv();
    });
}
function completedBtn(item, li) {
    const title = li.querySelector('.title')
    const doneButton = li.querySelector('.doneBtn');
    doneButton.addEventListener('click', () => {
        if (item.state === false) {
            item.state = true;           
            title.className = 'title checked';
            doneButton.className = 'doneBtn fa-icon done-check'
            localStorage.setItem('todoList', JSON.stringify(data));
        } else {
            item.state = false;
            title.className = 'title';
            doneButton.className = 'doneBtn fa-icon'
            localStorage.setItem('todoList', JSON.stringify(data));
        }
    });
}
function displayDiv() {
    if (data.length == 0) {
        container[1].style.display = "none";
    } else {
        container[1].style.display = "block";
    }  
}
function displayDate() {
    let date = new Date();
    date = date.toString().split(" ");
    date = date[1] + " - " + date[2] + " - " + date[3];
    document.querySelector(".today").innerHTML = date;
}