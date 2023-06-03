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

async function renderContacts() {
    initContacts();
}

function getJoinData(allContacts) {
    let name = allContacts[i]['name'];
    let email = allContacts[i]['email'];
    let phone = allContacts[i]['phone'];
    let color = allContacts[i]['color'];
    let initials = allContacts[i]['initials'];
    let group = allContacts[i]['group'];
    return { name, email, phone, color, initials, group};
}

    /*const allData = allContacts[i];
    const { name, email, phone, color, initials, group } = getJoinData(allData);*/