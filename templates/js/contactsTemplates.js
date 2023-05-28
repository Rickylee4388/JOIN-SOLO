function initContacts() {
    includeHTML();
    renderContentSectionContacts();
}

function renderContentSectionContacts() {
    contentSection.innerHTML = generateContactsHTML();
}

function generateContactsHTML() {
    return /*html*/ `
  <div class="contactsSection">
  <div class="contactsList">
            <div class="contactsListLetterSection">
                <div class="contactsListLetterSectionHead">
                <p>A</p>
                </div>
                <div class="contactsListLetterSectionContent"  style="background-color: #2A3647; color: white" >
                    <h4>AD</h4>
                    <div>
                        <p class="contactsListLetterSectionContentName">Armin Dev</p>
                        <p class="contactsListLetterSectionContentMail">testemail@dev.com</p>
                    </div>
                </div>
            </div>
            <div class="contactsListLetterSection">
                <div class="contactsListLetterSectionHead">
                <p>B</p>
                </div>
                <div class="contactsListLetterSectionContent">
                    <h4>BD</h4>
                    <div>
                        <p class="contactsListLetterSectionContentName">Bertha Dev</p>
                        <p class="contactsListLetterSectionContentMail">testemail@dev.com</p>
                    </div>
                </div>
                <div class="contactsListLetterSectionContent">
                    <h4>BD</h4>
                    <div>
                        <p class="contactsListLetterSectionContentName">Boris Dev</p>
                        <p class="contactsListLetterSectionContentMail">testemail@dev.com</p>
                    </div>
                </div>
            </div>
            <div class="contactsListLetterSection">
                <div class="contactsListLetterSectionHead">
                <p>C</p>
                </div>
                <div class="contactsListLetterSectionContent">
                    <h4>CD</h4>
                    <div>
                        <p class="contactsListLetterSectionContentName">Carmen Dev</p>
                        <p class="contactsListLetterSectionContentMail">testemail@dev.com</p>
                    </div>
                </div>
            </div>
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
                <img src="/../img/newContactIconBig.svg" alt="newContactIconBig">
            </div>
        </div>
    </div>
    `
}