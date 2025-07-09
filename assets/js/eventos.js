const events = JSON.parse(localStorage.getItem("events")) || [];
const btnSaveEvent = document.getElementById("saveEvent");
const cancelEdit = document.getElementById("cancelEdit");
const formCreateEvent = document.getElementById("eventForm");
const searchEvent = document.getElementById("searchEvent");
let currentEditIndex = null;



function renderEvents(){
    const eventsConainers = document.getElementById("eventContainer");
    eventsConainers.innerHTML = "";

    events.forEach((event,index) => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("card-event");
        eventCard.innerHTML = `
            <div class="card custom-card shadow-sm">
                <div class="card-body d-flex flex-column flex-md-row align-items-start gap-3">
                    <img src="${event.eventImg}" alt="Imagen de ${event.eventTitle}" class="img-size rounded" >
                    <div class="flex-grow-1 my-auto">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h5 class="eventTitle mb-1">${event.eventTitle}</h5>
                                <div class="description-container">
                                    <p class="card-description">${event.eventDescription}</p>
                                </div>
                            </div>
                            <button class="btn btn-sm btn-edit-event" data-index="${index}">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge status-badge">${event.eventStatus}</span>
                            <small class="text-muted">${event.eventDate}</small>
                            <button class="btn btn-primary btn-add-gallery mt-2" data-index="${index}">Agregar galeria</button>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        eventsConainers.appendChild(eventCard);
    });

};

function saveEvent() {
    const eventTitle = document.getElementById("eventTitle").value;
    const eventLocation = document.getElementById("eventLocation").value;
    const eventDescription = document.getElementById("eventDescription").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventStatus = document.getElementById("eventStatus").value;
    const eventImgInput = document.getElementById("eventImg");
    const archive = eventImgInput.files[0];


    const reader = new FileReader();

    reader.onload = function(e) {
        const imgBase64 = e.target.result;
        const event = {
            eventTitle,
            eventLocation,
            eventDescription,
            eventDate,
            eventStatus,
            eventImg: imgBase64
        };

        if (currentEditIndex === null) {
            events.push(event);
        } else {
            event.eventImg = archive ? imgBase64 : events[currentEditIndex].eventImg;
            events[currentEditIndex] = event;
            currentEditIndex = null;
        }
        localStorage.setItem("events", JSON.stringify(events));
        renderEvents();
        formCreateEvent.reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalEvento'));
        modal.hide();
        console.log(events);
    };

    if (archive) {
        reader.readAsDataURL(archive);
    } else if (currentEditIndex !== null) {
        const event = {
            eventTitle,
            eventLocation,
            eventDescription,
            eventDate,
            eventStatus,
            eventImg: events[currentEditIndex].eventImg
        };

        events[currentEditIndex] = event;
        localStorage.setItem("events", JSON.stringify(events));
        renderEvents();
        formCreateEvent.reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalEvento'));
        modal.hide();
        currentEditIndex = null;
        console.log(events);
    } else {
        alert("Por favor selecciona una imagen.");
    };
};


function EditEvent(index){
    const modal = new bootstrap.Modal(document.getElementById('modalEvento'));
    modal.show();

    const event = events[index];
    document.getElementById("eventTitle").value = event.eventTitle;
    document.getElementById("eventLocation").value = event.eventLocation;
    document.getElementById("eventDescription").value = event.eventDescription;
    document.getElementById("eventDate").value = event.eventDate;
    document.getElementById("eventStatus").value = event.eventStatus;

    currentEditIndex = index;
}

eventContainer.addEventListener("click", function(e) {
    const button = e.target.closest(".btn-edit-event");
    if (button) {
        const index = button.getAttribute("data-index");
        EditEvent(index);
    }
});

document.addEventListener("DOMContentLoaded", renderEvents);
btnSaveEvent.addEventListener("click",saveEvent);
cancelEdit.addEventListener("click", ()=>{
    formCreateEvent.reset();
});



// Parte para agregar la galeria de imagenes
eventContainer.addEventListener("click", function(e) {
    const addGalleryBtn = e.target.closest(".btn-add-gallery");
    if (addGalleryBtn) {
        const index = addGalleryBtn.getAttribute("data-index");
        openGalleryModal(index);
    }
});


let currentGalleryIndex = null;
const galleryInput = document.getElementById("galleryInput");

function openGalleryModal(index) {
    currentGalleryIndex = index;
    galleryInput.value = "";
    const modal = new bootstrap.Modal(document.getElementById("modalGallery"));
    modal.show();
}

galleryInput.addEventListener("change", function () {
    const files = Array.from(galleryInput.files);

    if (files.length > 4) {
        alert("Solo puedes subir máximo 4 imágenes.");
        galleryInput.value = "";
    }
});

document.getElementById("saveGallery").addEventListener("click", function() {
    if (currentGalleryIndex === null) return;

    const files = Array.from(galleryInput.files);
    if (files.length === 0) {
        alert("Selecciona al menos una imagen antes de guardar.");
        return;
    }

    const galleryImagesBase64 = [];
    let readCount = 0;

    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function (ev) {
            galleryImagesBase64.push(ev.target.result);
            readCount++;
            if (readCount === files.length) {
                saveGalleryToEvent(currentGalleryIndex, galleryImagesBase64);
                const modal = bootstrap.Modal.getInstance(document.getElementById("modalGallery"));
                modal.hide();
                document.getElementById("searchEvent").focus();
            }
        };
        reader.readAsDataURL(file);
    });
});

function saveGalleryToEvent(index, galleryImages) {
    if (!events[index].eventGallery) {
        events[index].eventGallery = [];
    }
    events[index].eventGallery = galleryImages; 
    localStorage.setItem("events", JSON.stringify(events));
    galleryInput.value = "";
    console.log(galleryImages);
}


function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
    document.querySelector('.main-content').classList.toggle('collapsed-content');
}

// Mostrar sidebar en móvil
document.getElementById('mobileToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('show-mobile');
});

// Cerrar sidebar en móvil
document.getElementById('closeSidebar').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('show-mobile');
});


