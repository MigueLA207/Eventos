let active = 0;
let canceled = 0;
let inactive = 0;
let total = 0; 

function renderStatistics(){
    const activeNumber = document.getElementById("activeEvents");
    const canceledNumber = document.getElementById("canceledEvents");
    const inactiveNumber = document.getElementById("inactiveEvents");
    const totalNumber = document.getElementById("totalEvents");
    const events = JSON.parse(localStorage.getItem("events")) || [];
    actives = events.filter(active => active.eventStatus == "activo").length;
    canceled = events.filter(canceled => canceled.eventStatus == "cancelado").length;
    inactive = events.filter(inactive => inactive.eventStatus == "inactivo").length;

    activeNumber.textContent = actives;
    canceledNumber.textContent = canceled;
    inactiveNumber.textContent = inactive;
    totalNumber.textContent = actives + canceled + inactive;
}

addEventListener("DOMContentLoaded",renderStatistics)

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
    document.querySelector('.main-content').classList.toggle('collapsed-content');
}

document.getElementById('mobileToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('show-mobile');
});

document.getElementById('closeSidebar').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('show-mobile');
});

const res = fetch("https://discord.com/api/webhooks/1391908704521031703/MFRRZoqdgXnPBk3pr3VRZOwMA39VY1Gc83un_N6lOOTZWRtiRNK2IomgXevTrWCoz6uU")