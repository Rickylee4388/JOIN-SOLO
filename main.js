let allContacts = []

function init() {
    includeHTML();
    initSummary();
}

function renderSummary() {
    initSummary();
    let sidebarSummary = document.getElementById('sidebarSummary');
    highlightSidebarBtn(sidebarSummary);
}

function renderBoard() {
    renderBoardHTML();
    let sidebarBoard = document.getElementById('sidebarBoard');
    highlightSidebarBtn(sidebarBoard);
}

function renderAddTask() {
    initAddTask();
    let sidebarAddTask = document.getElementById('sidebarAddTask');
    highlightSidebarBtn(sidebarAddTask);
}

function renderContacts() {
    initContacts();
    let sidebarContacts = document.getElementById('sidebarContacts');
    highlightSidebarBtn(sidebarContacts);
}

function showLegalNoticeScreen() {
    contentSection.innerHTML = generateLegalNoticeScreenHTML();
    let sidebarLegal = document.getElementById('sidebarLegal');
    highlightSidebarBtn(sidebarLegal);
}

function showHelpScreen() {
    contentSection.innerHTML = generateHelpScreenHTML();
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






//---------------------------------html---------------------------------------//





function generateHelpScreenHTML() {
    return /*html*/ `
    <div class="helpScreenSection">
        <h1>Help</h1>
        <h2>What is Join?</h2>
        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic recusandae dolorem corporis aspernatur magnam ipsa quidem. Culpa praesentium fugiat ea nostrum atque laborum, iste, quis eum vero voluptate ipsam alias.</span>
        <h2>How to use it</h2>
        <ol>
            <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, autem magnam ducimus libero ex eos aspernatur ullam, aliquam cum iusto ab nam modi laudantium adipisci sunt corporis ut, perspiciatis omnis?</li>
            <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, autem magnam ducimus libero ex eos aspernatur ullam, aliquam cum iusto ab nam modi laudantium adipisci sunt corporis ut, perspiciatis omnis?</li>
            <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, autem magnam ducimus libero ex eos aspernatur ullam, aliquam cum iusto ab nam modi laudantium adipisci sunt corporis ut, perspiciatis omnis?</li>
        </ol>
    </div>
   
    `;
}

function generateLegalNoticeScreenHTML() {
    return /*html*/ `
    <div class="helpScreenSection">
    <h1>Legal Notice</h1>
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