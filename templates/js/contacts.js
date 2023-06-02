let allContacts = [
    { name: 'Jürger Jonas', email: 'testdev@web.de', phone: '34567534256', color: 'rgb(253,153,63)', initials: 'JJ', group: 'J' },
    { name: 'Claudia Braun', email: 'testdev2@web.de', phone: '457445364535', color: 'rgb(38 201 140)', initials: 'CB', group: 'C' },
    { name: 'Jarne Carlsson', email: 'testdev3@web.de', phone: '2435634635', color: 'rgb(201 38 68)', initials: 'JC', group: 'J' },
    { name: 'Bertha Dübel', email: 'testdev4@web.de', phone: '24356534563', color: 'rgb(38 62 201)', initials: 'BD', group: 'B' }];

async function initContacts() {
    //includeHTML();
    //await loadContacts();
    renderContactsSection();
    renderContactsList();
}

/*async function loadContacts() {
    try {
        allContacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}*/

function sortContacts() {
    allContacts.sort(function(a, b) {
        var nameA = a.name.toUpperCase(); // Großbuchstaben für Vergleich
        var nameB = b.name.toUpperCase(); 
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
    console.log(groupCounts);
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
        document.getElementById(`contactsListGroup${group}`).innerHTML += generateContactsListGroupContact(name, email, color, initials, i);
    }
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
    //await setItem('contacts', JSON.stringify(allContacts));
    document.getElementById('contactsList').innerHTML = '';
    renderContactsList();
    document.getElementById('overlaySection').classList.add('d-none');
    document.getElementById('formResetButton').click();
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
}

function addNewContactClose() {
    document.getElementById('overlaySection').classList.add('d-none');
}

function doNotClose(event) {
    event.stopPropagation();
}