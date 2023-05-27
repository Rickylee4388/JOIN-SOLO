function initContacts() {
    includeHTML();
    renderContentSection();
}

function renderContentSection() {
    contentSection.innerHTML = generateContactsHTML();
}

function generateContactsHTML() {
    return /*html*/ `
  <div class="contactsSection">
  <div class="contactsList">
            <div class="contactsListLetterSection">
                <div class="contactsListLetterSectionContent">
                    <h4>TT</h4>
                    <div>
                        <p>Testname Dev</p>
                        <p>testemail@dev.com</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="contactsDetail">
            <div class="contactsDetailHead">
                <h2>Contacts</h2>
                <img src="/../img/contactsHeadIcon.svg" alt="contactsHeadIcon">
                <p>Better with a team</p>
            </div>
            <div class="contactsDetailInfo">

            </div>
            <div class="contactsDetailBottom">

            </div>
        </div>
    </div>


    `
}