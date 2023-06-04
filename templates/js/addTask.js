let newTaskArray = [];
let prio = undefined;


function newSubtask() {
    let allSubtasks = [];
    let newSubtask = document.getElementById('subtasks').value;
    allSubtasks.push(newSubtask);

    if (newSubtask == '') {
        document.getElementById('subtasks').focus();
    } else {
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
    let subtasks = document.getElementById('subtaksList').innerText;

    let newTask = {
        'title': title,
        'description': description,
        'category': category,
        'assignedTo': assignedTo,
        'date': date,
        'prio': prio,
        'subtasks': subtasks
    };

    newTaskArray.push(newTask);
    clearFields();
}


function clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    document.getElementById('subtasks').value = '';
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