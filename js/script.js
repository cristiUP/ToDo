const tasksList = localStorage.getItem('tasks') ? JSON.parse(this.localStorage.getItem('tasks')) : [];
const addButton = document.querySelector("#add-button");
const taskOutput = document.querySelector('.list');

window.addEventListener('load', () => {
    displayDate();
    tasksList.forEach(task => {
        displayTasks(task);

    });   
});

function displayDate() {
    let date = new Date();
    date = date.toString().split(" ");
    date = date[1] + " " + date[2] + " " + date[3];
    document.querySelector(".today").innerHTML = date;
}

addButton.addEventListener('click', () => {
    const task = document.querySelector("#task");
    createTask(task)
});

function displayTasks(task) {

    const li = document.createElement('li');
    li.className = 'listItem';
    li.innerHTML = `        
                    <span class="title">${task}</span> 
                    <span class="doneBtn fa-icon"></span>
                    <span class="deleteBtn fa-icon"></span>
                    `;
    taskOutput.append(li); 

// delete button
    const deleteButton = li.querySelector('.deleteBtn');
    deleteButton.addEventListener('click', function () {
        li.remove();
        tasksList.splice(tasksList.indexOf(task),1);
        localStorage.setItem('tasks', JSON.stringify(tasksList))
    });

// done button
    const title = li.querySelector('.title')
    const doneButton = li.querySelector('.doneBtn');
    doneButton.addEventListener('click', function () {
        if (title.className === 'title checked') {
            title.className = 'title';
            doneButton.className = 'doneBtn fa-icon'
        } else {
            title.className = 'title checked';
            doneButton.className = 'doneBtn fa-icon done-check'
        }
    });
}

function createTask(task) {
    tasksList.push(task.value);
    localStorage.setItem("tasks", JSON.stringify(tasksList));

}



