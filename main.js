function init() {
    includeHTML();
}

function renderSummary() {
    contentSection.innerHTML = '<h2>Summary</h2>';
}

function renderBoard() {
    renderBoardHTML();
    document.getElementById('body').classList.add('showScrollBarY')
}

function renderAddTask() {
    contentSection.innerHTML = '<h2>Add Task</h2>';
}

async function renderContacts() {
    initContacts();
}