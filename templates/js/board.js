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
    },
    {
        'id': 2,
        'category': 'Sport',
        'headline': 'Probetraining',
        'discription': 'McFit anrufen',
        'stat': 'todo'
    },
    {
        'id': 3,
        'category': 'Learn',
        'headline': 'Dev. Akademie',
        'discription': 'Modul 10 beenden.',
        'stat': 'done'
    },
    {
        'id': 4,
        'category': 'Code',
        'headline': 'Sharkie',
        'discription': 'Mängel ausbessern',
        'stat': 'awaitingFeedback'
    },
];
let currentDraggedTask;
let currentDraggedOnStatus;
let statusContentClass = document.getElementsByClassName('statusContent');
let taskContainerClass = document.getElementsByClassName('pinnedTaskContainer');





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

        <div id="${statClass}" class="statusContent" ondrop="drop('${statClass}')" ondragover="allowDrop(event); highlight('${statClass}')" ondragleave="stopHighlight('${statClass}')"></div>
          
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
    let content = document.getElementById('todo');
    let todos = tasksOnBoard.filter(task => task['stat'] == 'todo');

    content.innerHTML = '';

    for (let i = 0; i < todos.length; i++) {
        const task = todos[i];

        content.innerHTML += generatePinnedTaskHTML(task);
    }
}



function renderInProgressHTML() {
    let content = document.getElementById('inProgress');
    let inProgress = tasksOnBoard.filter(task => task['stat'] == 'inProgress');

    content.innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const task = inProgress[i];

        content.innerHTML += generatePinnedTaskHTML(task);
    }
}



function renderAwaitingFeedbackHTML() {
    let content = document.getElementById('awaitingFeedback');
    let awaitingFeedback = tasksOnBoard.filter(task => task['stat'] == 'awaitingFeedback');

    content.innerHTML = '';

    for (let i = 0; i < awaitingFeedback.length; i++) {
        const task = awaitingFeedback[i];

        content.innerHTML += generatePinnedTaskHTML(task);
    }
}



function renderDoneHTML() {
    let content = document.getElementById('done');
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
















