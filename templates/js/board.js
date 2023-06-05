let taskStatus = ['To Do', 'In progress', 'Awaiting Feedback', 'Done'];
let dragTargets = ['todo', 'in progress', 'awaiting feedback', 'done'];
let taskStatusClasses = ['todo', 'inProgress', 'awaitingFeedback', 'done'];
let tasksOnBoard = [
     {
        'id': 0,
        'category': 'Design',
        'headline': 'Design Mainpage',
        'discription': 'ioenfgpiqen pgnp qengvnepgnpeng pnaepgnpaeng pvn',
        'stat': 'todo'
    },
    {
        'id': 1,
        'category': 'Code',
        'headline': 'Clean up code',
        'discription': 'ioenfgpiqen pgnp qengvnepgnpeng pnaepgnpaeng pvn',
        'stat': 'inProgress'
    }
];
let currentDraggedTask;



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
            <input class="searchInput" type="text" placeholder="Find task">

            <div class="searchBtn">
                <img src="../../img/Vector.png" alt="">
            </div>
        </div>
        
        <button class="addTaskBtn btn-bg">
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

        <div id="${statClass}Content" class="statusContent" ondrag="moveTo('${nextStat}')" ondragover="allowDrop(event)" ></div>
          
    </div>
        `
    }
    updateBoardTasks();
}



function updateBoardTasks() {
    renderTodoTasksHTML();
    renderInProgressHTML();
    renderAwaitingFeedbackHTML();
    renderDoneHTML();
}



function renderTodoTasksHTML() {
    let content = document.getElementById('todoContent');
    let todos = tasksOnBoard.filter(task => task['stat'] == 'todo');

    content.innerHTML = '';

    for (let i = 0; i < todos.length; i++) {
        const task = todos[i];

        content.innerHTML += generatePinnedTaskHTML(task);
    }
}



function renderInProgressHTML() {
    let content = document.getElementById('inProgressContent');
    let inProgress = tasksOnBoard.filter(task => task['stat'] == 'inProgress');

    content.innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const task = inProgress[i];

        content.innerHTML += generatePinnedTaskHTML(task);
    }
}



function renderAwaitingFeedbackHTML() {
    let content = document.getElementById('awaitingFeedbackContent');
    let awaitingFeedback = tasksOnBoard.filter(task => task['stat'] == 'awaitingFeedback');

    content.innerHTML = '';

    for (let i = 0; i < awaitingFeedback.length; i++) {
        const task = awaitingFeedback[i];

        content.innerHTML += generatePinnedTaskHTML(task);
    }
}



function renderDoneHTML() {
    let content = document.getElementById('doneContent');
    let done = tasksOnBoard.filter(task => task['stat'] == 'done');

    content.innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const task = done[i];

        content.innerHTML += generatePinnedTaskHTML(task);
    }
}



function generatePinnedTaskHTML(task) {
    return `
    <div draggable="true" ondragstart="startDragging(${task['id']})" class="pinnedTaskContainer" id="pinnedTaskContainer${task}">
    <div class="taskCategory">
        ${task['category']}
    </div>

    <h3 class="pinnedTaskHeadline">${task['headline']}</h3>
    <p class="pinnedTaskDiscription">${task['discription']}</p>

    <div class="progressContainer">
        <div class="progressBar"></div>
        <div class="progressText">1/2 Done</div>
    </div>

    <div class="pinnedTaskContactsArrowContainer">
        <div class="pinnedTaskContactsContainer">
            <div class="contactContainer red">SL</div>
            <div class="contactContainer blue">JH</div>
            <div class="contactContainer green">KL</div>
        </div>

        <div class="arrowButton">
            <img src="../../img/greenArrow.png" alt="">
        </div>
    </div>
    </div>
    </div>
`
}



function startDragging(id) {
    currentDraggedTask = id;
}



function allowDrop(ev) {
    ev.preventDefault();
    updateBoardTasks();
}



function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData(`pinnedTaskContainer${currentDraggedTask}`);
    ev.target.appendChild(document.getElementById(data));

  }



function moveTo(stat) {
    tasksOnBoard[currentDraggedTask]['stat']  = stat;

}


