let allContacts = [];
let lastActivePage = 'sidebarSummary';

async function init() {
    await loadContacts();
    await loadTasks();
    includeHTML();
    initSummary();
}

function renderSummary() {
    initSummary();
    let sidebarSummary = document.getElementById('sidebarSummary');
    highlightSidebarBtn(sidebarSummary);
    lastActivePage = 'sidebarSummary';
}

function renderBoard() {
    giveTaskId();
    renderBoardHTML();
    let sidebarBoard = document.getElementById('sidebarBoard');
    highlightSidebarBtn(sidebarBoard);
    lastActivePage = 'sidebarBoard';
}

function renderAddTask() {
    initAddTask();
    let sidebarAddTask = document.getElementById('sidebarAddTask');
    highlightSidebarBtn(sidebarAddTask);
    lastActivePage = 'sidebarAddTask';
}

function renderContacts() {
    initContacts();
    let sidebarContacts = document.getElementById('sidebarContacts');
    highlightSidebarBtn(sidebarContacts);
    lastActivePage = 'sidebarContacts';
}

function showLegalNoticeScreen() {
    contentSection.innerHTML = generateLegalNoticeScreenHTML();
    let sidebarLegal = document.getElementById('sidebarLegal');
    document.getElementById('headerContentRightLogout').style.display = 'none'
    highlightSidebarBtn(sidebarLegal);
}

function showHelpScreen() {
    contentSection.innerHTML = generateHelpScreenHTML();
    let helpLogoBtn = document.getElementById('helpLogoBtn');
    document.getElementById('headerContentRightLogout').style.display = 'none'
    highlightSidebarBtn(helpLogoBtn);
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

function doNotClose(event) {
    event.stopPropagation();
}

function logOut() {
    window.location.replace("/../templates/html/login.html");
}

function showLogOut() {
    if (document.getElementById('headerContentRightLogout').style.display == 'none') {
        document.getElementById('headerContentRightLogout').style.display = 'block';
    } else {
        document.getElementById('headerContentRightLogout').style.display = 'none';
    }
}

function highlightSidebarBtn(element) {
    const buttons = document.getElementsByClassName('sidebarBtn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('sidebarBtnActive');
    }
    element.classList.add('sidebarBtnActive');
}

function returnToLastActivePage() {
    let nextScreen = document.getElementById(`${lastActivePage}`);
    nextScreen.click();
}





//---------------------------------html---------------------------------------//





function generateHelpScreenHTML() {
    return /*html*/ `
    <div class="helpScreenSection">
        <div class="helpScreenSectionHeadline">
            <h1>Help</h1>
            <img onclick="returnToLastActivePage()" class="contactsDetailHeadPic2" src="/../img/returnArrowDark.svg" alt="returnToListBtn">
        </div>
        <h2>What is Join?</h2>
        <span>This tool is a versatile solution that incorporates a Kanban board.
            It enables you to efficiently organize and track your tasks within projects or business processes, 
            making it an ideal choice for seamless collaboration with your team. 
            By utilizing this tool, you can enhance productivity, ensuring that all tasks are well-managed and deadlines are never missed.
            Its intuitive user interface further simplifies task management, catering to both individual users and teams striving for effective and efficient task organization.</span>
        <h2>To maximize the benefits of the task management tool, follow these simple steps:</h2>
        <ol>
            <li><b>Create and manage tasks effortlessly:</b> Provide a title, description, and category to specify the task details.
                Assign tasks to team members from your existing contact list or invite new contacts to collaborate on the task.</li>
                <br>
            <li><b>Track task progress on the Kanban board:</b> Monitor the current status of your tasks on the Kanban board.
                Easily modify the task status by utilizing the drag-and-drop feature. Additionally, you can edit task details as needed.</li>
                <br>
            <li><b>Build a contact list for seamless communication:</b> Add team members to your contact list for quick and easy communication.
                Assign tasks directly to your contacts, streamlining task allocation and collaboration.
                Having your team members in the contact list also facilitates organized project management by consolidating relevant contact information in one centralized location.</li>
        </ol>
        <h3>By following these guidelines, you can leverage the task management tool to streamline your workflow,
            improve collaboration, and effectively manage your tasks and projects.</h3>
    </div>`;
}

function generateLegalNoticeScreenHTML() {
    return /*html*/ `
    <div class="helpScreenSection">
    <div class="helpScreenSectionHeadline">
    <h1>Legal Notice</h1>
    <img onclick="returnToLastActivePage()" class="contactsDetailHeadPic2" src="/../img/returnArrowDark.svg" alt="returnToListBtn">
    </div>
    <h2>Impressum</h2>
    <h3>Angaben gemäß § 5 TMG</h3>
    <h4>Max Mustermann<br>
        Mustermannstraße 5<br>
        Musterhause<br>
    </h4>
    <h2>Kontakt</h2>
    <h2>Quellen</h2>
    <h2>Datenschutzerklärung</h2>
    </div>
    `;
}