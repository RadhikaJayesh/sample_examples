
class ToDoClass {
    constructor() {
        /*tasks is assigned to a local storage variable in order to retrieve are stored data.
        We save our taks in localStorage as a string with 'TASKS' as its key.
        So when the user opens the website for the first time we need to check if any data is present in local storage with the
        key TASKS. We use JSON.parse to convert the data retrieved from localStorage from a string to an object.
        */
        this.tasks = JSON.parse(localStorage.getItem('TASKS'));
        if (!this.tasks) {
            this.tasks = [
                { task: 'Go To Dentist', isComplete: false },
                { task: 'Do Gardening', isComplete: true },
                { task: 'Renew Library Account', isComplete: false },
            ];
        }

        this.loadTasks();

        //its best to call event listeners in the constructor, so that the event listeners are set up when the class is initialized
        this.addEventListener();
    }

    addEventListener() {
        document.getElementById('addTask').addEventListener('keypress', event => {
            if (event.keyCode === 13) {
                this.addTask(event.target.value);
                event.target.value = "";
            }
        });
    }

    //changes the toggleStatus of the checkbox 
    toggleTaskStatus(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.loadTasks();
    }

    deleteTask(event, taskIndex) {
        event.preventDefault();
        this.tasks.splice(taskIndex, 1);
        let x = localStorage.removeItem('TASKS');
        console.log(x);
        this.loadTasks();
    }

    addTaskClick() {
        let target = document.getElementById('addTask');
        this.addTask(target.value);
        target.value = "";
    }

    addTask(task) {
        let newTask = {
            task,
            isCompleted: false,
        };

        //parent div is simply uses to add the effects around the insert label if there is a text or not
        let parentDiv = document.getElementById('addTask').parentElement;
        if (task === '') {
            parentDiv.classList.add('has-error');
        } else {
            parentDiv.classList.remove('has-error');
            parentDiv.classList.add('has-success')
            this.tasks.push(newTask);
            this.loadTasks();
        }
    }

    /*note if you want to use a css style inside a div in a class that also contains other default classes in boothstrap
        you have to use ES6 notation to apply it. This means  ${cssClassName}
    */
    generateTaskHtml(task, index) {
        return `
            <li class="list-group-item checkbox">
            <div class="row">
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                <label><input id="toggleTaskStatus" type="checkbox" onchange="toDo.toggleTaskStatus(${index})" value="" class="" ${task.isComplete ? 'checked' : ''}></label>
                </div>
                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isComplete ? 'complete' : ''}">
                ${task.task}
                </div>
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
                <a class="" href="" onClick="toDo.deleteTask(event, ${index})"><i id="deleteTask" data-id="${index}" class="delete-icon glyphicon glyphicon-trash"></i></a>
                </div>
            </div>
            </li>
        `;
    }

    loadTasks() {
        //we use local storage here just incase the value in the constructor is set to null,
        //then now we will add the 3 predefine values in the task variable to the local storage right away.
        localStorage.setItem('TASKS', JSON.stringify(this.tasks));

        //research more on reduce
        let taskHtml = this.tasks.reduce((html, task, index) => html += this.generateTaskHtml(task, index), '');
        document.getElementById('taskList').innerHTML = taskHtml;
    }
}

let toDo;
window.addEventListener("load", () => {
    toDo = new ToDoClass();
});

//--- Ajax call

function makeAjaxCall(url, methodType, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(methodType, url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("xhr done successfully");
                var resp = xhr.responseText;
                var respJson = JSON.parse(resp);
                callback(respJson);
            } else {
                console.log("xhr failed");
            }
        } else {
            console.log("xhr processing going on");
        }
    }
    console.log("request sent succesfully");
}
document.getElementById("userDetails").addEventListener("click", function () {
    //git hub url to get a user details
    var userId = document.getElementById("userId").value;
    var URL = "https://api.github.com/users/" + userId;
    makeAjaxCall(URL, "GET", processUserDetailsResponse);
});
document.getElementById("repoList").addEventListener("click", function () {
    // git hub url to get btford details
    var userId = document.getElementById("userId").value;
    var URL = "https://api.github.com/users/" + userId + "/repos";
    makeAjaxCall(URL, "GET", processRepoListResponse);
});
function processUserDetailsResponse(userData) {
    console.log("render user details", userData);
}
function processRepoListResponse(repoList) {
    console.log("render repo list", repoList);
}

// Ajax with Promise

function makeAjaxCall(url, methodType) {
    var promiseObj = new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(methodType, url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("xhr done successfully");
                    var resp = xhr.responseText;
                    var respJson = JSON.parse(resp);
                    resolve(respJson);
                } else {
                    reject(xhr.status);
                    console.log("xhr failed");
                }
            } else {
                console.log("xhr processing going on");
            }
        }
        console.log("request sent succesfully");
    });
    return promiseObj;
}
document.getElementById("userDetails").addEventListener("click", function () {
    // git hub url to get btford details
    var userId = document.getElementById("userId").value;
    var URL = "https://api.github.com/users/" + userId;
    makeAjaxCall(URL, "GET").then(processUserDetailsResponse, errorHandler);
});
document.getElementById("repoList").addEventListener("click", function () {
    // git hub url to get btford details
    var userId = document.getElementById("userId").value;
    var URL = "https://api.github.com/users/" + userId + "/repos";
    makeAjaxCall(URL, "GET").then(processRepoListResponse, errorHandler);
});
function processUserDetailsResponse(userData) {
    console.log("render user details", userData);
}
function processRepoListResponse(repoList) {
    console.log("render repo list", repoList);
}
function errorHandler(statusCode) {
    console.log("failed with status", status);
}