let newTaskArray = [];
let prio = undefined;
let allSubtasks = [];


function urgent() {
    let prioValue = document.getElementById('urgent').value;
    prio = prioValue;

    document.getElementById('urgent').classList.add('urgent');
    document.getElementById('urgentIcon').src = '../../img/urgentWhiteIcon.png';

    document.getElementById('medium').classList.remove('medium');
    document.getElementById('mediumIcon').src = '../../img/mediumIcon.png';

    document.getElementById('low').classList.remove('low');
    document.getElementById('lowIcon').src = '../../img/lowIcon.png';
}


function medium() {
    let prioValue = document.getElementById('medium').value;
    prio = prioValue;

    document.getElementById('medium').classList.add('medium');
    document.getElementById('mediumIcon').src = '../../img/mediumWhiteIcon.png';

    document.getElementById('urgent').classList.remove('urgent');
    document.getElementById('urgentIcon').src = '../../img/urgentIcon.png';

    document.getElementById('low').classList.remove('low');
    document.getElementById('lowIcon').src = '../../img/lowIcon.png';
}


function low() {
    let prioValue = document.getElementById('low').value;
    prio = prioValue;

    document.getElementById('low').classList.add('low');
    document.getElementById('lowIcon').src = '../../img/lowWhiteIcon.png';

    document.getElementById('medium').classList.remove('medium');
    document.getElementById('mediumIcon').src = '../../img/mediumIcon.png';

    document.getElementById('urgent').classList.remove('urgent');
    document.getElementById('urgentIcon').src = '../../img/urgentIcon.png';
}


function newSubtask() {
    let newSubtask = document.getElementById('subtasks').value;
    allSubtasks.push(newSubtask);

    if (newSubtask == '') {
        document.getElementById('subtasks').focus();
    } else {
        document.getElementById('subtasksList').innerHTML = '';
        for (let i = 0; i < allSubtasks.length; i++) {
            let subtask = allSubtasks[i];
            document.getElementById('subtasksList').innerHTML += /*html*/ `
                <div class="subtask">
                    <input type="checkbox">
                    <p>${subtask}</p>
                </div>
            `;
        }
    }

    document.getElementById('subtasks').value = '';
}


function createTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    let assignedTo = document.getElementById('assignedTo').value;
    let date = document.getElementById('date').value;

    let newTask = {
        'title': title,
        'description': description,
        'category': category,
        'assignedTo': assignedTo,
        'date': date,
        'prio': prio,
        'subtasks': allSubtasks
    };

    newTaskArray.push(newTask);
    clearFields();
}


function clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    document.getElementById('subtasks').value = '';
    document.getElementById('subtasksList').innerHTML = '';
    clearPrioButtons();
}


function clearPrioButtons() {
    prio = undefined;

    document.getElementById('urgent').classList.remove('urgent');
    document.getElementById('medium').classList.remove('medium');
    document.getElementById('low').classList.remove('low');

    document.getElementById('urgentIcon').src = '../../img/urgentIcon.png';
    document.getElementById('mediumIcon').src = '../../img/mediumIcon.png';
    document.getElementById('lowIcon').src = '../../img/lowIcon.png';
}


function openAddTaskOverlay() {
    document.getElementById('overlaySection').classList.remove('d-none');

    document.getElementById('overlaySection').innerHTML = /*html*/ `
        <div class="addTaskOverlay">
            <div class="contentSectionAddTaskOverlay" id="ContentSection">
                <h1>Add Task</h1>
        
                <div class="contentLeftAndRight">
                    <div class="contentLeft">
                        <div class="titleAndInput">
                            <span>Title</span>
                            <input id="title" placeholder="Enter a title">
                        </div>

                        <div class="descriptionAndTextarea">
                            <span>Description</span>
                            <textarea required id="description" placeholder="Enter a Description"></textarea>
                        </div>

                        <div class="categoryAndSelect">
                            <span>Category</span>
                            <select required id="category">
                                <option>Select task category</option>
                                <option value="design">Design</option>
                                <option value="sales">Sales</option>
                                <option value="backoffice">Backoffice</option>
                                <option value="media">Media</option>
                                <option value="marketing">Marketing</option>
                            </select>
                        </div>

                        <div class="assignedToAndSelect">
                            <span>Assigned to</span>
                            <select required id="assignedTo">
                                <option>Select contacts to assign</option>
                                <option value="Denise Schmidt">Denise Schmidt</option>
                                <option value="Davide Religioso">Davide Religioso</option>
                                <option value="Jacob Hengsbach">Jacob Hengsbach</option>
                                <option value="Philipp Klinger">Philipp Klinger</option>
                                <option value="Max Mustermann">Max Mustermann</option>
                            </select>
                        </div>
                    </div>

                    <div class="borderline"></div>

                    <div class="contentRight">
                        <div class="dueDateAndInput">
                            <span>Due Date</span>
                            <input required type="date" id="date" placeholder="dd/mm/yyyy">
                        </div>

                        <div class="prio">
                            <span>Prio</span>
                            <div required class="prioButtons">
                                <button id="urgent" value="urgent" onclick="urgent()">
                                    Urgent
                                    <img id="urgentIcon" src="../../img/urgentIcon.png">
                                </button>

                                <button id="medium" value="medium" onclick="medium()">
                                    Medium
                                    <img id="mediumIcon" src="../../img/mediumIcon.png">
                                </button>

                                <button id="low" value="low" onclick="low()">
                                    Low
                                    <img id="lowIcon" src="../../img/lowIcon.png">
                                </button>
                            </div>
                        </div>

                        <div class="subtasksAndInput">
                            <span>Subtasks</span>

                            <div class="inputAndButton">
                                <input required id="subtasks" placeholder="Add new subtask">
                                <button onclick="newSubtask()">
                                    <img src="../../img/subtaskIcon.png">
                                </button>
                            </div>
                        </div>

                        <div class="subtasksList" id="subtasksList">

                        </div>
                    </div>
                </div>

                <div class="twoButtons">
                    <button class="clearButton" onclick="clearFields()">
                        Clear
                        <img src="../../img/cancelIcon.png">
                    </button>

                    <button class="createTaskButton" id="createTask" onclick="createTask()">
                        Create Task
                        <img src="../../img/checkIcon.png">
                    </button>
                </div>
            </div>
        </div>
    `;
}