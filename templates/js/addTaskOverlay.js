function openAddTaskOverlay() {
    document.getElementById('overlaySection').classList.remove('d-none');
    document.getElementById('overlaySection').innerHTML = generateAddTaskOverlay();
}


function generateAddTaskOverlay() {
    document.getElementById('overlaySection').innerHTML = generateAddTaskContent();
    renderHeadline();
}