let taskStatus = ['To Do', 'In progress', 'Awaiting Feedback', 'Done'];
let dragTargets = ['todo', 'in progress', 'awaiting feedback', 'done'];
let taskStatusClasses = ['todo', 'inProgress', 'awaitingFeedback', 'done'];
let currentDraggedTask;
let currentDraggedOnStatus;
let filteredTasks = [];



function giveTaskId() {
    for (let i = 0; i < newTaskArray.length; i++) {
        const currentTask = newTaskArray[i];
        
        currentTask['id'] = i;
    }
}


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
        <div class="boardHeadlineLeftContainer">
            <div class="board">Board</div>

            <div class="plusBtnContainer mobileAddTask d-none">
                <div class="plusLine1"></div>
                <div class="plusLine2"></div>
            </div>
        </div>


        <div class="boardHeadlineRightContainer">
            <div class="searchContainer">
                <input oninput="searchTask()" id="searchInput" class="searchInput" type="text" placeholder="Find task">

            <div class="searchBtn">
                <img src="../../img/Vector.png" alt="">
            </div>
        </div>
        
        <button class="addTaskBtn btn-bg" onclick="openAddTaskOverlay('todo')">
            <span class="addTaskBtnText">Add task</span>
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

        content.innerHTML += /*html*/`
            <div class="statContainer">
        
            <div class="boardStatusHeadContainer" onclick="openAddTaskOverlay()">
                <div class="boardStatus">${stat}</div>
                <div class="plusBtnContainer btn-border-color">
                    <div class="plusLine1"></div>
                    <div class="plusLine2"></div>
                </div>
            </div>

        <div id="statContainer${i}" class="statusContent" ondrop="drop('${statClass}'); stopHighlight('statContainer${i}')" ondragover="allowDrop(event); highlight('statContainer${i}')" ondragleave="stopHighlight('statContainer${i}')"></div>
          
        </div>
        `
    }
    updateBoardTasks();
}



function updateBoardTasks() {
    renderTodoTasksHTML(newTaskArray);
    renderInProgressHTML(newTaskArray);
    renderAwaitingFeedbackHTML(newTaskArray);
    renderDoneHTML(newTaskArray);
    showProgressbar();
}



function renderTodoTasksHTML(arrayName) {
    let content = document.getElementById('statContainer0');
    let todos = arrayName.filter(task => task['stat'] == 'todo');

    content.innerHTML = '';

    for (let i = 0; i < todos.length; i++) {
        const task = todos[i];

        content.innerHTML += generatePinnedTaskHTML(task);
        renderAssignedToHTML(task);
    }
}



function renderInProgressHTML(arrayName) {
    let content = document.getElementById('statContainer1');
    let inProgress = arrayName.filter(task => task['stat'] == 'inProgress');

    content.innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const task = inProgress[i];

        content.innerHTML += generatePinnedTaskHTML(task);
        renderAssignedToHTML(task);
    }
}



function renderAwaitingFeedbackHTML(arrayName) {
    let content = document.getElementById('statContainer2');
    let awaitingFeedback = arrayName.filter(task => task['stat'] == 'awaitingFeedback');

    content.innerHTML = '';

    for (let i = 0; i < awaitingFeedback.length; i++) {
        const task = awaitingFeedback[i];

        content.innerHTML += generatePinnedTaskHTML(task);
        renderAssignedToHTML(task);
    }
}



function renderDoneHTML(arrayName) {
    let content = document.getElementById('statContainer3');
    let done = arrayName.filter(task => task['stat'] == 'done');

    content.innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const task = done[i];
        if (allSubtasks > 0) {
            document.getElementById(`progressContainer${task['id']}`).classList.remove('d-flex')
        }
        content.innerHTML += generatePinnedTaskHTML(task);
        renderAssignedToHTML(task);
    }
}



function renderAssignedToHTML(task) {
    let content = document.getElementById(`assignedToContainer${task['id']}`);
    let assignmentCount = task['assignedTo'].length -3;

    content.innerHTML = '';
    if (task['assignedTo'].length <= 3) {
        renderTaskAssignmentListHTML(task, task['assignedTo'].length);
    } else {
        renderTaskAssignmentListHTML(task, '3');
    }

    if(task['assignedTo'].length > 3) {
        content.innerHTML += renderTaskAssignmentCountHTML(assignmentCount);
    }
}



function renderTaskAssignmentCountHTML(assignmentCount) {
    return /*html*/`
    <div class="contactContainer" style="background-color: rgb(0, 0, 0)">+${assignmentCount}</div>
    `;
}



function renderTaskAssignmentListHTML(task, count) {
    let content = document.getElementById(`assignedToContainer${task['id']}`);

    for (let i = 0; i < count; i++) {
        const assignment = task['assignedTo'][i];
        let initials = getInitials(assignment);
        let bgColor = getBgColor();
   
        content.innerHTML += /*html*/`
            <div class="contactContainer" style="background-color:${bgColor}">${initials}</div>
            `;  
    }
}



function generatePinnedTaskHTML(task) {

    return `
    <div onclick="openExistingTaskPopUp(${task['id']})">
        <div draggable="true" ondragstart="startDragging(${task['id']})" class="pinnedTaskContainer" id="pinnedTaskContainer${task['id']}">
        <div class="taskCategory ${task['category'].toLowerCase()}-bg">
            ${task['category']}
        </div>

        <h3 class="pinnedTaskHeadline">${task['title']}</h3>
        <p class="pinnedTaskDiscription">${task['description']}</p>

        <div id="progressContainer${task['id']}" class="progressContainer d-none">
            <div class="progressBar"></div>
            <div class="progressText">0/${task['subtasks'].length} Done</div>
        </div>

        <div class="pinnedTaskContactsArrowContainer">
            <div class="pinnedTaskContactsContainer" id="assignedToContainer${task['id']}">

            </div>

            <div class="arrowButton">
                <img src="../../img/${task['prio']}Icon.png" alt="">
            </div>
        </div>
        </div>
        </div>
    </div>
`;
}



function showProgressbar() {
    
    for (let i = 1; i < newTaskArray.length; i++) {
        const task = newTaskArray[i];
        
        if(task['subtasks'].length > 0) {
            document.getElementById(`progressContainer${task['id']}`).classList.remove('d-none')
        }
    }
}





///////////////////////Task-Pop-Up/////////////////////////////////
function openExistingTaskPopUp(Id) {
    renderExistingTaskPopUpHTML(Id);
    document.getElementById('overlaySection').classList.remove('d-none');
}



function closeTaskPopUp() {
    document.getElementById('overlaySection').classList.add('d-none');
}



function renderExistingTaskPopUpHTML(Id) {
    let content = document.getElementById('overlaySection');
    let clickedTask = newTaskArray[Id];
    content.innerHTML = '';

    content.innerHTML += /*html*/`
        <div class="taskOverviewPopUp" onclick="doNotClose(event)">
            <div class="taskCategory ${clickedTask['category'].toLowerCase()}-bg">
                ${clickedTask['category']}
            </div>

            <div class="taskPopUpHeadline">${clickedTask['title']}</div>

            <div class="taskPopUpDiscription">${clickedTask['description']}</div>

            <div class="taskPopUpTable" id="taskPopUpTable"></div>

            <div class="taskPopUpAssignments" id="taskPopUpAssignments">
                <div class="assignedToHeadline"><b>Assigned to:</b></div>
                <div id="taskPopUpAssignmentsList" class="taskPopUpAssignmentsList"></div>
            </div>

            <div class="popUpButtonsContainer">
                <div class="taskPopUpButton leftBtn"><img src="../../img/delete.png" alt=""></div>

                <div class="taskPopUpButton rightBtn" onclick="openModifyTaskPopUp('${Id}')"><img src="../../img/pen.png" alt=""></div>
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


function openModifyTaskPopUp(Id) {
    modifyCurrentTaskHTML(Id);
}



function modifyCurrentTaskHTML(Id) {
    let content = document.getElementById('overlaySection');
    let currentTask = newTaskArray[Id];
    
    content.innerHTML = '';

    content.innerHTML = /*html*/`
    <div class="taskModifyPopUp" onclick="doNotClose(event)">

    <div class="titleAndInput">
        <span>Title</span>
        <input id="modifyTitle" type="text" required placeholder="Enter a title">
    </div>

    <div class="descriptionAndTextarea">
        <span>Description</span>
        <textarea id="modifyDescription" type="text" required placeholder="Enter a Description"></textarea>
    </div>

    <div class="dueDateAndInput">
        <span>Due Date</span>
        <input type="date" id="date" required placeholder="dd/mm/yyyy">
    </div>

    <div class="prio">
        <span>Prio</span>
        <div class="prioButtons">
            <button type="button" id="modifyUrgent" value="urgent">
                Urgent
                <img id="modifyUrgentIcon" src="../../img/urgentIcon.png">
            </button>

            <button type="button" id="modifyMedium" value="medium">
                Medium
                <img id="modifyMediumIcon" src="../../img/mediumIcon.png">
            </button>

            <button type="button" id="modifyLow" value="low">
                Low
                <img id="modifyLowIcon" src="../../img/lowIcon.png">
            </button>
        </div>
    </div>

        <div class="modifyTaskInputContainer">
            <div class="modifyTaskInputHeadline">Assigned to</div>

            <div id="modifyPopUpAssignmentContainer${currentTask['id']}" class="d-flex"></div>
        </div>



        

    </div>
   `
   renderModifyAssignmentsHTML(Id);
}



function renderModifyAssignmentsHTML(Id) {
    let currentTask = newTaskArray[Id];
    let content = document.getElementById(`modifyPopUpAssignmentContainer${currentTask['id']}`);

    for (let i = 0; i < currentTask['assignedTo'].length; i++) {
        const assignment = currentTask['assignedTo'][i];
        let initials = getInitials(assignment);
        let bgColor = getBgColor();
        
        content.innerHTML += /*html*/`
            <div class="taskPopUpSingleAssignmentInitals contactContainer" style="background:${bgColor}">${initials}</div>
        `
    }
}



///////////////////////Drag & Drop/////////////////////////////////
function startDragging(id) {
    currentDraggedTask = id;
    document.getElementById(`pinnedTaskContainer${currentDraggedTask}`).classList.add('rotateDeg');
}



function allowDrop(ev) {
    ev.preventDefault();

}



function drop(stat) {
    newTaskArray[currentDraggedTask]['stat']  = stat;
    document.getElementById(`pinnedTaskContainer${currentDraggedTask}`).classList.remove('rotateDeg');
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

    for (let i = 0; i < newTaskArray.length; i++) {
        const currentTask = newTaskArray[i];
        let search = searchInput.toLowerCase();
        let search2 =  capitalizeFirstLetter(search);

        if (currentTask['title'].includes(search || search2) || currentTask['description'].includes(search || search2)) {
            filteredTasks.push(currentTask);
            }
        

        if (currentTask['title'].includes(search && search2) || currentTask['description'].includes(search && search2)) {
            filteredTasks.push(currentTask);
            }
        }
       
        renderFilteredTasks('filteredTasks');
    }


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



function renderFilteredTasks() {
    renderTodoTasksHTML(filteredTasks);
    renderInProgressHTML(filteredTasks);
    renderAwaitingFeedbackHTML(filteredTasks);
    renderDoneHTML(filteredTasks);

    filteredTasks = [];
}














