let allContacts = [];
let lastActivePage = 'sidebarSummary';
/**
 * initializing contacts and tasks 
 * renders html
 */
async function init() {
    await loadContacts();
    await loadTasks();
    includeHTML();
    initSummary();
    removeClassContentSectionAddTask();
}

/**
 * renders summary information
 */
function renderSummary() {
    initSummary();
    let sidebarSummary = document.getElementById('sidebarSummary');
    highlightSidebarBtn(sidebarSummary);
    lastActivePage = 'sidebarSummary';
}

/**
 * renders board information
 */
function renderBoard() {
    giveTaskId();
    renderBoardHTML();
    let sidebarBoard = document.getElementById('sidebarBoard');
    highlightSidebarBtn(sidebarBoard);
    lastActivePage = 'sidebarBoard';
}

/**
 * renders addtask information
 */
function renderAddTask() {
    initAddTask();
    let sidebarAddTask = document.getElementById('sidebarAddTask');
    highlightSidebarBtn(sidebarAddTask);
    lastActivePage = 'sidebarAddTask';
}

/**
 * renders contact information
 */
function renderContacts() {
    initContacts();
    let sidebarContacts = document.getElementById('sidebarContacts');
    highlightSidebarBtn(sidebarContacts);
    lastActivePage = 'sidebarContacts';
}

/**
 * renders legal notice information
 */
function showLegalNoticeScreen() {
    contentSection.innerHTML = generateLegalNoticeScreenHTML();
    let sidebarLegal = document.getElementById('sidebarLegal');
    document.getElementById('headerContentRightLogout').style.display = 'none'
    highlightSidebarBtn(sidebarLegal);
}

/**
 * renders help desk information
 */
function showHelpScreen() {
    contentSection.innerHTML = generateHelpScreenHTML();
    let helpLogoBtn = document.getElementById('helpLogoBtn');
    document.getElementById('headerContentRightLogout').style.display = 'none'
    highlightSidebarBtn(helpLogoBtn);
}

/**
 * renders contact user information
 */
function getJoinData(allData) {
    let name = allData['name'];
    let email = allData['email'];
    let phone = allData['phone'];
    let color = allData['color'];
    let initials = allData['initials'];
    let group = allData['group'];
    return { name, email, phone, color, initials, group };
}

/**
 * stops closing information
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * logout user
 * leads to login page
 * deletes actual user from local storage
 */
function logOut() {
    window.location.replace("./templates/html/login.html");
    localStorage.removeItem("currentEmail");
}

/**
 * displayes logout div
 */
function showLogOut() {
    if (document.getElementById('headerContentRightLogout').style.display == 'none') {
        document.getElementById('headerContentRightLogout').style.display = 'block';
    } else {
        document.getElementById('headerContentRightLogout').style.display = 'none';
    }
}

/**
 * highlight sidebar elements
 * @param {button} element 
 */
function highlightSidebarBtn(element) {
    const buttons = document.getElementsByClassName('sidebarBtn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('sidebarBtnActive');
    }
    element.classList.add('sidebarBtnActive');
}

/**
 * return to last active page
 */
function returnToLastActivePage() {
    let nextScreen = document.getElementById(`${lastActivePage}`);
    nextScreen.click();
}

/**
 * remove class content section AddTask
 */
function removeClassContentSectionAddTask() {
    document.getElementById('contentSection').classList.remove('contentSectionAddTask');
}