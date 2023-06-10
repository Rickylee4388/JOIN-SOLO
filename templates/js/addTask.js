let newTaskArray = [];
let prio = undefined;
let allSubtasks = [];
let assignedToNames = [];
let assignedToInitials = [];


async function initAddTask() {
    document.getElementById('contentSection').innerHTML = /*html*/ `
        <div class="headlineContainer" id="headlineContainer"></div>
        <div class="contentLeftAndRightContainer" id="contentLeftAndRightContainer"></div>
        <div class="twoButtonsContainer" id="twoButtonsContainer"></div>
    `;
    await loadTasks();
    renderHeadline();
}


async function loadTasks() {
    newTaskArray = JSON.parse(await getItem('createdTask'));
}


function renderHeadline() {
    document.getElementById('headlineContainer').innerHTML = /*html*/ `
        <h1>Add Task</h1>
    `;
    renderContentLeftAndRight();
    renderContactsAddTask();
}


function renderContentLeftAndRight() {
    document.getElementById('contentLeftAndRightContainer').innerHTML = /*html*/ `
        <div class="contentLeftAndRight">
            <div class="contentLeft">
                <div class="titleAndInput">
                    <span>Title</span>
                    <input id="title" placeholder="Enter a title">
                </div>

                <div class="descriptionAndTextarea">
                    <span>Description</span>
                    <textarea id="description" placeholder="Enter a Description"></textarea>
                </div>

                <div class="categoryAndSelect">
                    <span>Category</span>
                    <select id="category">
                        <option value="" disabled selected>Select task category</option>
                        <option value="design">Design</option>
                        <option value="sales">Sales</option>
                        <option value="backoffice">Backoffice</option>
                        <option value="media">Media</option>
                        <option value="marketing">Marketing</option>
                    </select>
                </div>

                <div class="assignedToAndSelect">
                    <span>Assigned to</span>
                    <select id="assignedTo" onchange="assignedTo()">
                        <option value="" disabled selected>Select contacts to assign</option>
                    </select>
                </div>

                <div class="assignedToList" id="assignedToList">

                </div>
            </div>

            <div class="borderline"></div>

            <div class="contentRight">
                <div class="dueDateAndInput">
                    <span>Due Date</span>
                    <input type="date" id="date" placeholder="dd/mm/yyyy">
                </div>

                <div class="prio">
                    <span>Prio</span>
                    <div class="prioButtons">
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
                        <input id="subtasks" placeholder="Add new subtask">
                        <button onclick="newSubtask()">
                            <img src="../../img/subtaskIcon.png">
                        </button>
                    </div>
                </div>

                <div class="subtasksList" id="subtasksList">

                </div>
            </div>
        </div>
    `;
    renderTwoButtonsContainer();
    setMinDate();
}


function renderContactsAddTask() {
    for (let i = 0; i < allContacts.length; i++) {
        const allData = allContacts[i];
        const { name } = getJoinData(allData);
        document.getElementById('assignedTo').innerHTML += /*html*/ `
            <option value="${name}">${name}</option>
        `;
    }
}


function renderTwoButtonsContainer() {
    document.getElementById('twoButtonsContainer').innerHTML = /*html*/ `
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
    `;
}


function setMinDate() {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', today);
}


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


function assignedTo() {
    let assignee = document.getElementById("assignedTo");
    let selectedAssignee = assignee.options[assignee.selectedIndex].value;
    let selectedAssignee2 = assignee.options[assignee.selectedIndex];
    selectedAssignee2.disabled = true;
    let i = (assignee.selectedIndex) - 1;

    if (assignedToNames.indexOf(selectedAssignee) === -1) {
        assignedToNames.push(selectedAssignee);
    }
    showAssignedToList(i);
}


function showAssignedToList(i) {
    const allData = allContacts[i];
    const { initials, color } = getJoinData(allData);
    document.getElementById('assignedToList').innerHTML += /*html*/ `
            <div class="assigneeContainer" style="background-color: ${color}">
                ${initials}
            </div>
        `
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
    let date = document.getElementById('date').value;

    let newTask = {
        'id': '',
        'title': title,
        'description': description,
        'category': category,
        'assignedTo': assignedToNames,
        'date': date,
        'prio': prio,
        'stat': 'todo',
        'subtasks': allSubtasks
    };

    newTaskArray.push(newTask);
    saveTasks();
    clearFields();
}


async function saveTasks() {
    await setItem('createdTask', JSON.stringify(newTaskArray));
}


function clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
    document.getElementById('assignedTo').value = '';
    document.getElementById('date').value = '';
    document.getElementById('subtasks').value = '';
    document.getElementById('subtasksList').innerHTML = '';
    document.getElementById('assignedToList').innerHTML = '';
    assignedToNames = [];
    assignedToInitials = [];
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
        <div class="addTaskOverlay" onclick="doNotClose(event)">
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