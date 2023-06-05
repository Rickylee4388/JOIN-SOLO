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
        <div class="contactsDetailBottomBtn" onclick="addNewContact()">
            <p>New Contact</p>
            <img src="/../img/newContactIcon.svg" alt="newContactIconBig">
        </div>
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
                    <h4>Email</h4>
                    <p class="contactsListContactMail">${email}</p>
                    <h4>Phone</h4>
                    <p>${phone}</p>
                </div>
                <div class="contactsDetailInfoContentRight">
                    <div class="contactsDetailInfoContentRightEdit" onclick="editContact(${i})">
                    <img src="/../img/editContactIcon.svg" alt="editContactIcon">
                        <h3>Edit Contact</h3>
                    </div>
                </div>
            </div>`
}

// <h3 onclick="">Delete Contact</h3>

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
    <div onclick="showContactDetails(${i})" class="contactsListGroupContact contactsListGroupContactBgInactive" id="contactsListGroupContact${i}">
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
                    <div class="overlayAddContactRightInputSectionHead">
                        <img onclick="closeContactOverlay()" src="/../img/addContactOverlayClose.svg" alt="closeButton">
                    </div>
                    <form onsubmit="createContact(); return false;">
                        <input id="addContactName" class="contactOverlayNameIcon" required type="text" placeholder="Name" oninvalid="this.setCustomValidity('Please enter Surname and Name!')" oninput="this.setCustomValidity('')">
                        <input id="addContactEmail" class="contactOverlayEmailIcon" required type="email" placeholder="Email" oninvalid="this.setCustomValidity('Please enter an Email first!')" oninput="this.setCustomValidity('')">
                        <input id="addContactPhone" class="contactOverlayPhoneIcon" required type="number" placeholder="Phone" oninvalid="this.setCustomValidity('Please enter a Number first!')" oninput="this.setCustomValidity('')">
                        <div class="overlayAddContactRightButtonSection">
                            <button type="reset" class="contactsDetailBottomBtnAlt">
                                <p>Cancel</p>
                                <img src="/../img/cancelCheckmarkContacts.svg" alt="newContactIconBig">
                            </button > 
                            <button type="submit" class="contactsDetailBottomBtn">
                                <p>Create Contact</p>
                                <img src="/../img/checkmarkContacts.svg" alt="newContactIconBig">
                            </button>  
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
                <div class="overlayAddContactRightInputSectionHead">
                        <img onclick="closeContactOverlay()" src="/../img/addContactOverlayClose.svg" alt="closeButton">
                    </div>
                    <form onsubmit="saveEditedContact(${i}); return false;">
                        <input id="editContactName" class="contactOverlayNameIcon" required type="text" placeholder="Name" value="${name}">
                        <input id="editContactEmail" class="contactOverlayEmailIcon" required type="text" placeholder="Email" value="${email}">
                        <input id="editContactPhone" class="contactOverlayPhoneIcon" required type="number" placeholder="Phone" value="${phone}">
                        <div class="overlayAddContactRightButtonSection">
                            <button type="reset" class="contactsDetailBottomBtnAlt" onclick="deleteContact(${i})">
                                <p>Delete</p>
                                <img src="/../img/cancelCheckmarkContacts.svg" alt="newContactIconBig">
                            </button >
                            <button type="submit" class="contactsDetailBottomBtn">
                                <p>Save Contact</p>
                                <img src="/../img/checkmarkContacts.svg" alt="newContactIconBig">
                            </button> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `
}
