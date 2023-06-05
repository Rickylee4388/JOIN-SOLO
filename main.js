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

function getJoinData(allData) {
    let name = allData['name'];
    let email = allData['email'];
    let phone = allData['phone'];
    let color = allData['color'];
    let initials = allData['initials'];
    let group = allData['group'];
    return { name, email, phone, color, initials, group };
}
