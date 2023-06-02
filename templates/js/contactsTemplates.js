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
        <div class="contactsDetailInfo" id="contactsDetailInfo">
            
        </div>
    </div>
    <div class="contactsDetailBottom">
        <img onclick="addNewContact()" src="/../img/newContactIconBig.svg" alt="newContactIconBig">
    </div>
</div>
`
}

function generateContactsDetailContentHTML(name, email, phone, color, initials, i) {
    return /*html*/ `
        <div class="contactsDetailInfoHead">
                <h4 style="background:${color}">${initials}</h4>
                <div>
                <p class="contactsDetailInfoHeadName">${name}</p>
                <p class="contactsDetailInfoHeadAddTask">+ Add Task</p>
                </div>
            </div>
            <div class="contactsDetailInfoContent">
                <div class="contactsDetailInfoContentLeft">
                    <h3>Contact Information</h3>
                    <p>Email</p>
                    <p>${email}</p>
                    <p>Phone</p>
                    <p>${phone}</p>
                </div>
                <div class="contactsDetailInfoContentRight">
                    <h3 onclick="editContact(${i})">Edit Contact</h3>
                    <h3 onclick="deleteContact(${i})">Delete Contact</h3>
                </div>
            </div>`
}

function generateContactsListGroupHTML(groupLetter) {
    return /*html*/ `
    <div class="contactsListGroup" id="contactsListGroup${groupLetter}">
    <div class="contactsListGroupHead" id="contactsListGroupHead">
            <p>${groupLetter}</p>
        </div>   
    </div>
    `
}

function generateContactsListGroupContactHTML(name, email, color, initials, i) {
    return /*html*/ `
    <div onclick="showContactDetails(${i})" class="contactsListGroupContact" id="contactsListGroupContact${i}">
            <h4 style="background:${color}">${initials}</h4>
                <div>
                    <p class="contactsListContactName">${name}</p>
                    <p class="contactsListContactMail">${email}</p>
                </div>
        </div>`
}

function generateContactsOverlayAddHTML() {
    return /*html*/ `
<div class="overlayAddContact" id="overlayAddContact" onclick="doNotClose(event)">
            <div class="overlayAddContactLeft">
                <div class="overlayAddContactLeftContent">
                    <img class="overlayAddContactLeftContentLogo" src="/../img/sidebarLogo.svg" alt="sidebarLogo">
                    <p class="overlayAddContactLeftHeadline">Add Contact</p>
                    <p class="overlayAddContactLeftCaption">Tasks are better with a team!</p>
                    <img class="overlayAddContactLeftContentLine" src="/../img/addContactOverlayLine.svg"
                        alt="underline">
                </div>
            </div>
            <div class="overlayAddContactRight">
                <div class="overlayAddContactRightProfilepic">
                    <img src="/../img/addContactOverlayEmptyProfile.svg" alt="ProfilePicEmpty">
                </div>
                <div class="overlayAddContactRightInputSection">
                    <form onsubmit="createContact(); return false;">
                        <input id="addContactName" required type="text" placeholder="Name">
                        <input id="addContactEmail" required type="text" placeholder="Email">
                        <input id="addContactPhone" required type="number" placeholder="Phone">
                        <div class="overlayAddContactRightButtonSection">
                            <button id="formResetButton" type="reset">Cancel</button>
                            <button type="submit">Create Contact</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>`
}

function generateContactsOverlayEditHTML(name, email, phone, color, initials, i) {
    return /*html*/ `
    <div class="overlayAddContact" id="overlayAddContact" onclick="doNotClose(event)">
            <div class="overlayAddContactLeft">
                <div class="overlayAddContactLeftContent">
                    <img class="overlayAddContactLeftContentLogo" src="/../img/sidebarLogo.svg" alt="sidebarLogo">
                    <p class="overlayAddContactLeftHeadline">Edit Contact</p>
                    <img class="overlayAddContactLeftContentLine" src="/../img/addContactOverlayLine.svg"
                        alt="underline">
                </div>
            </div>
            <div class="overlayAddContactRight">
                <div class="overlayAddContactRightProfilepic">
                    <h4 style="background:${color}">${initials}</h4>
                </div>
                <div class="overlayAddContactRightInputSection">
                    <form onsubmit="saveEditedContact(${i}); return false;">
                        <input id="editContactName" required type="text" placeholder="Name" value="${name}">
                        <input id="editContactEmail" required type="text" placeholder="Email" value="${email}">
                        <input id="editContactPhone" required type="number" placeholder="Phone" value="${phone}">
                        <div class="overlayAddContactRightButtonSection">
                            <button type="submit">Save Contact</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `
}
