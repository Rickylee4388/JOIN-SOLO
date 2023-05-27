function init() {
    includeHTML();
}

function renderSummary() {
    contentSection.innerHTML = '<h2>Summary</h2>';
}

function renderBoard() {
    contentSection.innerHTML = '<h2>Board</h2>';
}

function renderAddTask() {
    contentSection.innerHTML = '<h2>Add Task</h2>';
}

function renderContacts() {
    contentSection.innerHTML = generateContactsHTML();
}