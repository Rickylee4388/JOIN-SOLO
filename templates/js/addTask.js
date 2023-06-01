function clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    document.getElementById('subtasks').value = '';
    clearPrioButtons();
}


function clearPrioButtons() {
    document.getElementById('urgent').classList.remove('urgent');
    document.getElementById('medium').classList.remove('medium');
    document.getElementById('low').classList.remove('low');
}


function urgent() {
    document.getElementById('urgent').classList.add('urgent');
    document.getElementById('medium').classList.remove('medium');
    document.getElementById('low').classList.remove('low');
}


function medium() {
    document.getElementById('medium').classList.add('medium');
    document.getElementById('urgent').classList.remove('urgent');
    document.getElementById('low').classList.remove('low');
}


function low() {
    document.getElementById('low').classList.add('low');
    document.getElementById('medium').classList.remove('medium');
    document.getElementById('urgent').classList.remove('urgent');
}