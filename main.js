function init() {
    includeHTML();
    initSummary();
}

function renderSummary() {
    initSummary();
}

function renderBoard() {
    renderBoardHTML();
}

function renderAddTask() {
    initAddTask();
    /*contentSection.innerHTML = '<h2>Add Task</h2>';*/
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

function logOut() {
    window.location.replace("/../templates/html/login.html");
}

function showLogOut() {
    if(document.getElementById('headerContentRightLogout').style.display == 'none') {
        document.getElementById('headerContentRightLogout').style.display = 'block';
    } else {
        document.getElementById('headerContentRightLogout').style.display = 'none';
    }
}

function showHelpScreen() {
    contentSection.innerHTML = generateHelpScreenHTML();
}

function generateHelpScreenHTML() {
    return /*html*/ `
    <div class="helpScreenSection">
        <h2>Hilfe Hilfe ich komm net weiter!!!</h2>
        <img onclick="()" class="contactsDetailHeadPic" src="/../img/returnArrow.svg" alt="returnToListBtn">
    </div>
   
    `;
}

function showLegalNoticeScreen() {
    contentSection.innerHTML = generateLegalNoticeScreenHTML();
}

function generateLegalNoticeScreenHTML() {
    return /*html*/ `
    <div class="helpScreenSection">
    <h2>Legal Notice</h2>
    <img onclick="()" class="contactsDetailHeadPic" src="/../img/returnArrow.svg" alt="returnToListBtn">
    </div>
    
    `;
}