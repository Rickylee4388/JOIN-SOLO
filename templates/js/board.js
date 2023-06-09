let taskStatus = ['To Do', 'In progress', 'Awaiting Feedback', 'Done'];
let dragTargets = ['todo', 'in progress', 'awaiting feedback', 'done'];
let taskStatusClasses = ['todo', 'inProgress', 'awaitingFeedback', 'done'];
let tasksOnBoard = [
     {
        'id': 0,
        'category': 'Design',
        'headline': 'Design Mainpage',
        'discription': 'ioenfgpiqen pgnp qengvnepgnpeng pnaepgnpaeng pvn',
        'stat': 'todo',
        'prio': 'medium',
        'assignedTo': ['Jacob Hengsbach', 'Niklas Berg', 'Lars Kling'],
        'date': '01.12.2023',
        'subtasks': ['Css', 'Verlinkung anpassen']
    },
    {
        'id': 1,
        'category': 'Sales',
        'headline': 'Clean up code',
        'discription': 'ioenfgpiqen design qengvnepgnpeng pnaepgnpaeng pvn',
        'stat': 'inProgress',
        'prio': 'low',
        'assignedTo': ['Lisa Schreiber', 'Antonia Müller', 'Lars Kling'],
        'date': '14.07.2023',
        'subtasks': ['Css', 'Verlinkung anpassen']
    },
    {
        'id': 2,
        'category': 'Marketing',
        'headline': 'Probetraining',
        'discription': 'McFit anrufen',
        'stat': 'todo',
        'prio': 'medium',
        'assignedTo': ['Lisa Schreiber', 'Frederik Fertig', 'Jacob Hengsbach'],
        'date': '22.04.2024',
        'subtasks': ['Css', 'Verlinkung anpassen']
    },
];
let currentDraggedTask;
let currentDraggedOnStatus;
let filteredTasks = [];



function renderBoardHTML() {
    let content = document.getElementById('contentSection');

    content.innerHTML = '';
    content.innerHTML += /*html*/`
    <div class="boardBody" id="boardBody">
        <section id="boardHeadlineContainer" class="boardHeadlineContainer"></section>

        <section id="boardContentContainer" class="boardContentContainer"></section>
    </div>
    `
    document.getElementById('body').classList.add('hideScrollBarY');
    document.getElementById('boardBody').classList.add('showScrollBarY');
    renderBoardHeaderHTML();
    renderStatusFieldsHTML();
}



function renderBoardHeaderHTML() {
    let content = document.getElementById('boardHeadlineContainer');

    content.innerHTML = '';

    content.innerHTML += /*html*/`
    
        <div class="board">Board</div>

        <div class="boardHeadlineRightContainer">
            <div class="searchContainer">
                <input oninput="searchTask()" id="searchInput" class="searchInput" type="text" placeholder="Find task">

            <div class="searchBtn">
                <img src="../../img/Vector.png" alt="">
            </div>
        </div>
        
        <button class="addTaskBtn btn-bg" onclick="openAddTaskOverlay()">
            <span class="addTaskBtnText">Add task </span>
            <span class="addTaskBtnIcon">+</span>
        </button>

        </div>
    `
}







function renderStatusFieldsHTML() {
    let content = document.getElementById('boardContentContainer');

    content.innerHTML = '';

    for (let i = 0; i < taskStatus.length; i++) {
        const stat = taskStatus[i];
        const statClass = taskStatusClasses[i];
        let nextStat = taskStatusClasses[i + 1];

        content.innerHTML += /*html*/`
            <div class="${statClass}Container">
        
            <div class="boardStatusHeadContainer">
            <div class="boardStatus">${stat}</div>
            <div class="plusBtnContainer btn-border-color">
                <div class="plusLine1"></div>
                <div class="plusLine2"></div>
            </div>
            </div>

        <div id="${statClass}" class="statusContent" ondrop="drop('${statClass}')" ondragover="allowDrop(event); highlight('${statClass}')" ondragleave="stopHighlight('${statClass}')"></div>
          
        </div>
        `
    }
    updateBoardTasks();
}



function updateBoardTasks() {
    renderTodoTasksHTML(tasksOnBoard);
    renderInProgressHTML(tasksOnBoard);
    renderAwaitingFeedbackHTML(tasksOnBoard);
    renderDoneHTML(tasksOnBoard);
}



function renderTodoTasksHTML(arrayName) {
    let content = document.getElementById('todo');
    let todos = arrayName.filter(task => task['stat'] == 'todo');

    content.innerHTML = '';

    for (let i = 0; i < todos.length; i++) {
        const task = todos[i];

        content.innerHTML += generatePinnedTaskHTML(task);
        renderAssignedToHTML(task);
    }
}



function renderInProgressHTML(arrayName) {
    let content = document.getElementById('inProgress');
    let inProgress = arrayName.filter(task => task['stat'] == 'inProgress');

    content.innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const task = inProgress[i];

        content.innerHTML += generatePinnedTaskHTML(task);
        renderAssignedToHTML(task);
    }
}



function renderAwaitingFeedbackHTML(arrayName) {
    let content = document.getElementById('awaitingFeedback');
    let awaitingFeedback = arrayName.filter(task => task['stat'] == 'awaitingFeedback');

    content.innerHTML = '';

    for (let i = 0; i < awaitingFeedback.length; i++) {
        const task = awaitingFeedback[i];

        content.innerHTML += generatePinnedTaskHTML(task);
        renderAssignedToHTML(task);
    }
}



function renderDoneHTML(arrayName) {
    let content = document.getElementById('done');
    let done = arrayName.filter(task => task['stat'] == 'done');

    content.innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const task = done[i];

        content.innerHTML += generatePinnedTaskHTML(task);
        renderAssignedToHTML(task);
    }
}



function renderAssignedToHTML(task) {
    let content = document.getElementById(`assignedToContainer${task['id']}`);

    content.innerHTML = '';

    for (let i = 0; i < task['assignedTo'].length; i++) {
        const assignment = task['assignedTo'][i];
        let initials = getInitials(assignment);
        let bgColor = getBgColor();

        content.innerHTML += /*html*/`
            <div class="contactContainer" style="background-color:${bgColor}">${initials}</div>
        `;
    }
}



function generatePinnedTaskHTML(task) {
    let taskAsString = JSON.stringify(task);
    console.log(taskAsString);
    console.log(task);
    return `

    <div onclick="openTaskPopUp(${task['id']})">
        <div draggable="true" ondragstart="startDragging(${task['id']})" class="pinnedTaskContainer" id="pinnedTaskContainer${task}">
        <div class="taskCategory ${task['category'].toLowerCase()}-bg">
            ${task['category']}
        </div>

        <h3 class="pinnedTaskHeadline">${task['headline']}</h3>
        <p class="pinnedTaskDiscription">${task['discription']}</p>

        <div class="progressContainer">
            <div class="progressBar"></div>
            <div class="progressText">1/2 Done</div>
        </div>

        <div class="pinnedTaskContactsArrowContainer">
            <div class="pinnedTaskContactsContainer" id="assignedToContainer${task['id']}">

            </div>

            <div class="arrowButton">
                <img src="../../img/${task['prio'].toLowerCase()}Icon.png" alt="">
            </div>
        </div>
        </div>
        </div>
    </div>
`;
}





///////////////////////Task-Pop-Up/////////////////////////////////
function openTaskPopUp(Id) {
    renderTaskPopUpHTML(Id);
    document.getElementById('overlaySection').classList.remove('d-none');
}



function closeTaskPopUp() {
    document.getElementById('overlaySection').classList.add('d-none');
}



function renderTaskPopUpHTML(Id) {
    let content = document.getElementById('overlaySection');
    let clickedTask = tasksOnBoard[Id];
    content.innerHTML = '';

    content.innerHTML += /*html*/`
        <div class="taskOverviewPopUp">
            <div class="taskCategory ${clickedTask['category'].toLowerCase()}-bg">
                ${clickedTask['category']}
            </div>

            <div class="taskPopUpHeadline">${clickedTask['headline']}</div>

            <div class="taskPopUpDiscription">${clickedTask['discription']}</div>

            <div class="taskPopUpTable" id="taskPopUpTable"></div>

            <div class="taskPopUpAssignments" id="taskPopUpAssignments">
                <div class="assignedToHeadline"><b>Assigned to:</b></div>
                <div id="taskPopUpAssignmentsList" class="taskPopUpAssignmentsList"></div>
            </div>

            <div class="popUpButtonsContainer">
                <div class="taskPopUpButton leftBtn"><img src="../../img/delete.png" alt=""></div>

                <div class="taskPopUpButton rightBtn" onclick="modifyCurrentTask()"><img src="../../img/delete.png" alt=""></div>
            </div>
        </div>
    `
    renderTaskPopUpTableHTML(clickedTask);
    renderTaskPopUpAssignmentsHTML(clickedTask);
}



function renderTaskPopUpTableHTML(clickedTask) {
    let content = document.getElementById('taskPopUpTable');

    content.innerHTML = '';

    content.innerHTML += /*html*/`
        <div class="taskPopUpRow">
            <div class="taskPopUpLeftTd"><b>Due Date:</b></div>
            <div class="taskPopUpRightTd">${clickedTask['date']}</div>
        </div>

        <div class="taskPopUpRow">
            <div class="taskPopUpLeftTd"><b>Priority:</b></div>

            <div class="taskPopUpRightTd taskPopUpPrio">
                ${clickedTask['prio']} <img src="../../img/${clickedTask['prio'].toLowerCase()}Icon.png" alt="">
            </div>
        </div>

        <div class="closeTaskPopUpButton" onclick="closeTaskPopUp()">X</div>
    `
}



function renderTaskPopUpAssignmentsHTML(clickedTask) {
    let content = document.getElementById('taskPopUpAssignmentsList');


    content.innerHTML = '';

    for (let i = 0; i < clickedTask['assignedTo'].length; i++) {
        const assignment = clickedTask['assignedTo'][i];
        let initials = getInitials(assignment);
        let bgColor = getBgColor();
        
        content.innerHTML += /*html*/`
            <div class="taskPopUpSingleAssignmentContainer">
                <div class="taskPopUpSingleAssignmentInitals contactContainer" style="background:${bgColor}">${initials}</div>
                <div class="taskPopUpSingleAssignmentName">${assignment}</div>
            </div>
        `
    } 
}



function modifyCurrentTaskHTML() {
   let content = document.getElementById('overlaySection');



   content.innerHTML = '';

   content.innerHTML = /*html*/`
    <div class="taskOverviewPopUp"></div>
   `
}



///////////////////////Drag & Drop/////////////////////////////////
function startDragging(id) {
    currentDraggedTask = id;
}



function allowDrop(ev) {
    ev.preventDefault();
}



function drop(stat) {
    tasksOnBoard[currentDraggedTask]['stat']  = stat;
    updateBoardTasks();
}



function highlight(stat) {
    document.getElementById(stat).classList.add('dragAreaHighlight');
}



function stopHighlight(stat) {
    document.getElementById(stat).classList.remove('dragAreaHighlight');
}

////////////Search for Task////////////////////////////

function searchTask() {
    let searchInput = document.getElementById('searchInput').value;


    for (let i = 0; i < tasksOnBoard.length; i++) {
        const currentTask = tasksOnBoard[i];
        
        if(currentTask['headline'].includes(searchInput) || currentTask['discription'].includes(searchInput)) {
            filteredTasks.push(currentTask);
            console.log(currentTask);
            }
        }

        renderFilteredTasks('filteredTasks');
}



function renderFilteredTasks() {
    renderTodoTasksHTML(filteredTasks);
    renderInProgressHTML(filteredTasks);
    renderAwaitingFeedbackHTML(filteredTasks);
    renderDoneHTML(filteredTasks);

    filteredTasks = [];
}














