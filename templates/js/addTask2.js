function assignedTo() {
    let assignee = document.getElementById("assignedTo");
    let selectedAssignee = assignee.options[assignee.selectedIndex].value;
    let color = assignee.options[assignee.selectedIndex].id;
    let selectedAssignee2 = assignee.options[assignee.selectedIndex];
    selectedAssignee2.disabled = true;
    let i = assignee.selectedIndex - 1;
    let objId = i + 1;

    if (assignedToNames.indexOf(selectedAssignee) === -1) {
        assignedToNames.push(selectedAssignee);
        contactsColors.push(color);
        objIds.push(objId);
    }
    showAssignedToList();
}


function showAssignedToList() {
    let content = document.getElementById("assignedToList");
    content.innerHTML = "";

    for (let i = 0; i < assignedToNames.length; i++) {
        const name = assignedToNames[i];
        let bgColor = contactsColors[i];
        let objId = objIds[i];
        let initials = getInitials(name);
        content.innerHTML += /*html*/ `
            <div class="assigneeContainer" style="background-color: ${bgColor}" onclick="removeAssignee(${i}, ${objId})">
                ${initials}
            </div>
        `;
    }
}


function removeAssignee(position, objId) {
    assignedToNames.splice(position, 1);
    contactsColors.splice(position, 1);
    objIds.splice(position, 1);
    showAssignedToList();

    let assignee = document.getElementById("assignedTo");
    let selectedAssignee2 = assignee.options[objId];
    selectedAssignee2.disabled = false;

    if (assignedToNames.length === 0) {
        assignee.selectedIndex = 0;
    }
}


function newSubtask() {
    let newSubtask = document.getElementById('subtasks').value;

    if (newSubtask == '') {
        document.getElementById('subtasks').focus();
    } else {
        allSubtasks.push(newSubtask);
        isChecked.push(false);
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


function clearFields() {
    allSubtasks = [];
    assignedToNames = [];
    contactsColors = [];
    objIds = [];
    dateArray = [];
    document.getElementById('category').innerHTML = 'Select task category';
    document.getElementById('assignedToList').innerHTML = '';
    document.getElementById('subtasksList').innerHTML = '';
    closeCategoryDropdown();
    cancelNewCategory();
    enableContactsForAssignedTo();
}


function enableContactsForAssignedTo() {
    let assignee = document.getElementById("assignedTo");

    for (let i = 1; i < assignee.options.length; i++) {
        let option = assignee.options[i];
        option.disabled = false;
    }
}


function changeClearBtnIconToHover(IdDefault, IdHover) {
    document.getElementById(IdDefault).classList.add('d-none');
    document.getElementById(IdHover).classList.remove('d-none');
}


function changeClearBtnIconToDefault(IdHover, IdDefault) {
    document.getElementById(IdHover).classList.add('d-none');
    document.getElementById(IdDefault).classList.remove('d-none');
}


function createTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').innerText;
    let date = dateArray;

    let newTask = {
        'id': '',
        'title': title,
        'description': description,
        'category': category,
        'assignedTo': assignedToNames,
        'date': date,
        'prio': prio,
        'stat': chosenStat,
        'subtasks': allSubtasks,
        'isChecked': isChecked,
        'doneSubTasks': 0,
        'color': contactsColors
    };

    newTaskArray.push(newTask);
    saveTasks();
    clearFields();
    taskAddedToBoard();
}


async function saveTasks() {
    await setItem('createdTask', JSON.stringify(newTaskArray));
    renderBoard();
}


function taskAddedToBoard() {
    document.getElementById('overlaySection').classList.remove('d-none');
    document.getElementById('overlaySection').innerHTML = /*html*/ `
        <img src="../../img/taskAddedToBoard.png" class="taskAddedPopUp" id="taskAddedPopUp">
    `;
    setTimeout(function () { closePopUp() }, 2000);
}


function closePopUp() {
    document.getElementById('overlaySection').classList.add('d-none');
}