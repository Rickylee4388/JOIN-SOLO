function openAddTaskOverlay(stat) {
    chosenStat = stat;
    document.getElementById('overlaySection').classList.remove('d-none');
    document.getElementById('overlaySection').innerHTML = /*html*/ `
        <form class="addTaskOverlay" id="addTaskForm" onclick="doNotClose(event)">
            <div class="headlineContainerOverlay" id="headlineContainerOverlay"></div>
            <div class="contentLeftAndRightContainerOverlay" id="contentLeftAndRightContainerOverlay"></div>
            <div class="twoButtonsContainerOverlay" id="twoButtonsContainerOverlay"></div>
        </form>
    `;

    renderHeadlineOverlay();
}


function renderHeadlineOverlay() {
    document.getElementById('headlineContainerOverlay').innerHTML = /*html*/ `
        <h1>Add Task</h1>
        <img src="../../img/cancelIcon.png" onclick="closeOverlay()">
    `;
    renderContentLeftAndRightOverlay();
    renderContactsAddTask('assignedToOverlay');
    activatePrioButtonsOverlay();
}


function closeOverlay() {
    document.getElementById('overlaySection').classList.add('d-none');
}


function renderContentLeftAndRightOverlay() {
    document.getElementById('contentLeftAndRightContainerOverlay').innerHTML = generateContentLeftAndRightContainerOverlay();
    renderTwoButtonsContainerOverlay();
    setMinDate('dateOverlay');
}


function renderContactsAddTaskOverlay() {
    for (let i = 0; i < allContacts.length; i++) {
        const allData = allContacts[i];
        const { name } = getJoinData(allData);
        const { color } = getJoinData(allData);
        document.getElementById('assignedToOverlay').innerHTML += /*html*/ `
            <option value="${color}">${name}</option>
        `;  
    }
}


function renderTwoButtonsContainerOverlay() {
    document.getElementById('twoButtonsContainerOverlay').innerHTML = generateTwoButtonsContainerOverlay();
}


function pushDateOverlay() {
    let dueDate = document.getElementById('dateOverlay').value;
    dateArray.splice(0, 1, dueDate);
}


function activatePrioButtonsOverlay() {
    low();
    let urgentBtn = document.getElementById('urgent');
    urgentBtn.addEventListener("click", urgent);

    let mediumBtn = document.getElementById('medium');
    mediumBtn.addEventListener("click", medium);

    let lowBtn = document.getElementById('low');
    lowBtn.addEventListener("click", low);

    let resetBtn = document.getElementById('reset');
    resetBtn.addEventListener("click", low);
       
    let assignBtn = document.getElementById('assignedToOverlay');
    assignBtn.addEventListener("change", assignedToOverlay);

    document.getElementById('addTaskForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
        createTask();
    });
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


function assignedToOverlay() {
    let assignee = document.getElementById("assignedToOverlay");
    let selectedAssignee = assignee.options[assignee.selectedIndex].value;
    let color = assignee.options[assignee.selectedIndex].id;
    let selectedAssignee2 = assignee.options[assignee.selectedIndex];
    selectedAssignee2.disabled = true;
    let i = (assignee.selectedIndex) - 1;

    if (assignedToNames.indexOf(selectedAssignee) === -1) {
        assignedToNames.push(selectedAssignee);
        contactsColors.push(color);
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
    `;
}





//Add Task Overlay Templates
function generateContentLeftAndRightContainerOverlay() {
    return /*html*/ `
        <div class="contentLeftAndRight contentLeftAndRightOverlay">
            <div class="contentLeft">
                <div class="titleAndInput">
                    <span>Title</span>
                    <input id="title" type="text" required placeholder="Enter a title">
                </div>

                <div class="descriptionAndTextarea">
                    <span>Description</span>
                    <textarea id="description" type="text" required placeholder="Enter a Description"></textarea>
                </div>

                <div class="categoryAndSelect">
                    <span>Category</span>
                    <select id="category" required>
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
                    <select id="assignedToOverlay" required> 
                        <option value="" disabled selected>Select contacts to assign</option>
                    </select>
                </div>

                <div class="assignedToList" id="assignedToList">

                </div>
            </div>

            <div class="borderline borderlineOverlay"></div>

            <div class="contentRight">
                <div class="dueDateAndInput">
                    <span>Due Date</span>
                    <input type="date" id="dateOverlay" required placeholder="dd/mm/yyyy" onchange="pushDateOverlay()">
                </div>

                <div class="prio">
                    <span>Prio</span>
                    <div class="prioButtons">
                        <button type="button" id="urgent" value="urgent">
                            Urgent
                            <img id="urgentIcon" src="../../img/urgentIcon.png">
                        </button>

                        <button type="button" id="medium" value="medium">
                            Medium
                            <img id="mediumIcon" src="../../img/mediumIcon.png">
                        </button>

                        <button type="button" id="low" value="low">
                            Low
                            <img id="lowIcon" src="../../img/lowIcon.png">
                        </button>
                    </div>
                </div>

                <div class="subtasksAndInput">
                    <span>Subtasks</span>

                    <div class="inputAndButton">
                        <input id="subtasks" placeholder="Add new subtask">
                        <button type="button" onclick="newSubtask()">
                            <img src="../../img/subtaskIcon.png">
                        </button>
                    </div>
                </div>

                <div class="subtasksList" id="subtasksList">

                </div>
            </div>
        </div>
    `;
}


function generateTwoButtonsContainerOverlay() {
    return /*html*/ `
        <div class="twoButtons">
            <button id="reset" type="reset" class="clearButton" onclick="clearFields()">
                Clear
                <img src="../../img/cancelIcon.png">
            </button>

            <button type="submit" class="createTaskButton" id="createTask">
                Create Task
                <img src="../../img/checkIcon.png">
            </button>
        </div>
    `;
}