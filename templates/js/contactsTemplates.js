function generateContactsHTML() {
    return /*html*/ `
    <div class="contactsList" id="contactsList">
    </div>
    <div class="contactsDetail">
    <div>
        <div class="contactsDetailHead">
            <h2>Contacts</h2>
            <img src="/../img/contactsHeadIcon.svg" alt="contactsHeadIcon">
            <p>Better with a team</p>
        </div>
        <div class="contactsDetailInfo">
            <div class="contactsDetailInfoHead">
                <h4>TD</h4>
                <div>
                <p class="contactsDetailInfoHeadName">Armin Dev</p>
                <p class="contactsDetailInfoHeadAddTask">+ Add Task</p>
                </div>
            </div>
            <div class="contactsDetailInfoContent">
                <div class="contactsDetailInfoContentLeft">
                    <h3>Contact Information</h3>
                    <p>Email</p>
                    <p>testdev@dev.de</p>
                    <p>Phone</p>
                    <p>+49123456789</p>
                </div>
                <div class="contactsDetailInfoContentRight">
                    <h3>Edit Contact</h3>
                </div>
            </div>
        </div>
    </div>
    <div class="contactsDetailBottom">
        <img onclick="addNewContact()" src="/../img/newContactIconBig.svg" alt="newContactIconBig">
    </div>
</div>

    `
}

function generateContactsListHTML(name, email, color, initials) {
    return /*html*/ `
    <div class="contactsListLetterSection">
        <div class="contactsListLetterSectionHead">
            <p>A</p>
        </div>
        <div class="contactsListLetterSectionContent">
            <h4 style="background:${color}">${initials}</h4>
                <div>
                    <p class="contactsListLetterSectionContentName">${name}</p>
                    <p class="contactsListLetterSectionContentMail">${email}</p>
                </div>
        </div>
    </div>`
}


