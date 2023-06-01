let allContacts = [
{name: 'Jürger Jonas', email: 'testdev@web.de', phone: '34567534256', color: 'rgb(253,153,63)', initials: 'JJ'}, 
{name: 'Claudia Braun', email: 'testdev2@web.de', phone: '457445364535', color: 'rgb(38 201 140)', initials: 'CB'},
{name: 'Jonas Carlsson', email: 'testdev3@web.de', phone: '2435634635', color: 'rgb(201 38 68)', initials: 'JC'},
{name: 'Bertha Dübel', email: 'testdev4@web.de', phone: '24356534563', color: 'rgb(38 62 201)', initials: 'BD'}];

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

function renderContactsSection() {
    contentSection.innerHTML = generateContactsHTML();
}

function renderContactsList() {
    for (let i = 0; i < allContacts.length; i++) {
        let name = allContacts[i]['name'];
        let email = allContacts[i]['email'];
        let color = allContacts[i]['color'];
        let initials = allContacts[i]['initials'];
        document.getElementById('contactsList').innerHTML += generateContactsListHTML(name, email, color, initials);
    }  
}

async function createContact() {
    let name = document.getElementById('addContactName').value;
    let email = document.getElementById('addContactEmail').value;
    let phone = document.getElementById('addContactPhone').value;
    let bgColor = getBgColor();
    let initials = getInitials(name);
    allContacts.push({
        name: name,
        email: email,
        phone: phone,
        color: bgColor,
        initials: initials,
    })
    //await setItem('contacts', JSON.stringify(allContacts));
    document.getElementById('contactsList').innerHTML = '';
    renderContactsList();
    document.getElementById('overlaySection').classList.add('d-none');
    document.getElementById('formResetButton').click();
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

function getInitials(name) {
    let names = name.split(' ');
    let initials = '';
    for (let i = 0; i < names.length; i++) {
      initials += names[i].charAt(0).toUpperCase();
    }
    return initials;
  }

function getBgColor() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let bgColor = "rgb(" + x + "," + y + "," + z + ")"; 
    return bgColor;
  }

  
  