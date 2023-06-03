let allContacts = []
    
async function initContacts() {
    await loadContacts();
    renderContactsSection();
    renderContactsList();
}

async function loadContacts() {
    try {
        allContacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

function sortContacts() {
    allContacts.sort(function(a, b) {
        let nameA = a.name.toUpperCase(); // Großbuchstaben für Vergleich
        let nameB = b.name.toUpperCase(); 
        if (nameA < nameB) {
            return -1; // a kommt vor b
        }
        if (nameA > nameB) {
            return 1; // a kommt nach b
        }
        return 0; // a und b sind gleich
    });
}

function renderContactsSection() {
    contentSection.innerHTML = generateContactsHTML();
}

function renderContactsList() {
    sortContacts();
    renderContactsListGroup();
    renderContactsListGroupContact();
}

function renderContactsListGroup() {
    let groupCounts = countGroupObjects(allContacts);   //Gibt Objekt mit allen Gruppenbuchstaben und deren Anzahl aus Array zurück
    let groupLetters = Object.keys(groupCounts);    //Filtert nur die Buchstaben aus Objekt
    for (let i = 0; i < groupLetters.length; i++) {
        let groupLetter = groupLetters[i];
        document.getElementById('contactsList').innerHTML += generateContactsListGroupHTML(groupLetter);
    }
}

function renderContactsListGroupContact() { 
    for (let i = 0; i < allContacts.length; i++) {
        let name = allContacts[i]['name'];
        let email = allContacts[i]['email'];
        let color = allContacts[i]['color'];
        let initials = allContacts[i]['initials'];
        let group = allContacts[i]['group'];
        document.getElementById(`contactsListGroup${group}`).innerHTML += generateContactsListGroupContactHTML(name, email, color, initials, i);
    }
}

function showContactDetails(i) {
    let name = allContacts[i]['name'];
    let email = allContacts[i]['email'];
    let color = allContacts[i]['color'];
    let initials = allContacts[i]['initials'];
    let phone = allContacts[i]['phone'];
    document.getElementById('contactsDetailInfo').innerHTML = generateContactsDetailContentHTML(name, email, phone, color, initials, i);
}

async function createContact() {
    let name = document.getElementById('addContactName').value;
    let email = document.getElementById('addContactEmail').value;
    let phone = document.getElementById('addContactPhone').value;
    let bgColor = getBgColor();
    let initials = getInitials(name);
    let group = getContactGroup(name);
    allContacts.push({
        name: name,
        email: email,
        phone: phone,
        color: bgColor,
        initials: initials,
        group: group,
    })
    await setItem('contacts', JSON.stringify(allContacts));
    document.getElementById('contactsList').innerHTML = '';
    renderContactsList();
    document.getElementById('formResetButton').click();
    document.getElementById('overlaySection').innerHTML += `<img class="overlayAddContactSuccess" src="/../img/newContactSuccess.svg">`;
    setTimeout(function() {
        document.getElementById('overlaySection').classList.add('d-none');
    }, 1000);
    let index =  getCreatedContact(name);
    showContactDetails(index);
}

async function saveEditedContact(i) {
    let editedName = document.getElementById('editContactName').value;
    let editedEmail = document.getElementById('editContactEmail').value;
    let editedPhone = document.getElementById('editContactPhone').value;

    allContacts[i]['name'] = editedName;
    allContacts[i]['email'] = editedEmail;
    allContacts[i]['phone'] = editedPhone;

    await setItem('contacts', JSON.stringify(allContacts));
    document.getElementById('contactsList').innerHTML = '';
    renderContactsList();
    showContactDetails(i);
    document.getElementById('overlaySection').classList.add('d-none');
}

async function deleteContact(i) {
    let contactToDelete = allContacts[i];
    delete contactToDelete;
    allContacts.splice(i, 1);
    await setItem('contacts', JSON.stringify(allContacts));
    document.getElementById('contactsList').innerHTML = '';
    document.getElementById('contactsDetailInfo').innerHTML = '';
    document.getElementById('overlaySection').classList.add('d-none');
    renderContactsList();
}

function getInitials(name) {
    let names = name.split(' ');
    let initials = '';
    for (let i = 0; i < names.length; i++) {
        initials += names[i].charAt(0).toUpperCase();
    }
    return initials;
}

function getContactGroup(name) {
    let names = name.split(' ');
    let group = '';
    group = names[0].charAt(0).toUpperCase();
    return group;
}

function getBgColor() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let bgColor = "rgb(" + x + "," + y + "," + z + ")";
    return bgColor;
}

function getCreatedContact(name) {
    let index = allContacts.findIndex(function(contact) {
        return contact.name === name;
      });
      
      return index;

}

function countGroupObjects(x) {
    let groupCounts = {};
    for (let i = 0; i < x.length; i++) {
      let group = x[i].group;
      if (groupCounts[group]) {     //Falls Gruppe mit Buchstaben schon vorhanden wird deren anzahl um 1 erhöht
        groupCounts[group]++;
      } else {
        groupCounts[group] = 1;     // Falls Gruppe noch nicht vorhanden, wird Buchstaben mit 1 ausgegeben
      }
    }
    return groupCounts;             // Ergebnis bspw. = {B: 1, C: 1, J: 2}
  }
  








function addNewContact() {
    document.getElementById('overlaySection').classList.remove('d-none');
    document.getElementById('overlaySection').innerHTML = generateContactsOverlayAddHTML();
}

function editContact(i) {
    let name = allContacts[i]['name'];
    let email = allContacts[i]['email'];
    let phone = allContacts[i]['phone'];
    let color = allContacts[i]['color'];
    let initials = allContacts[i]['initials'];
    document.getElementById('overlaySection').classList.remove('d-none');
    document.getElementById('overlaySection').innerHTML = generateContactsOverlayEditHTML(name, email, phone, color, initials, i);
}

function closeContactOverlay() {
    document.getElementById('overlaySection').classList.add('d-none');
}

function doNotClose(event) {
    event.stopPropagation();
}