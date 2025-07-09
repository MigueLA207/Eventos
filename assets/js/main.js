document.addEventListener("DOMContentLoaded", function() {

    const events = JSON.parse(localStorage.getItem("events")) || [];
    

    const eventsContainerIndex = document.getElementById("eventosDinamicos");

    if (eventsContainerIndex) {
        eventsContainerIndex.innerHTML = "";

        if (events.length === 0) {
            eventsContainerIndex.innerHTML = `
                <div class="col-12 text-center text-white-50">
                    <p>No hay eventos disponibles en este momento. ¡Pronto tendremos más!</p>
                </div>
            `;
        } else {
            events.forEach(event => {
                const eventCol = document.createElement("div");
                eventCol.classList.add("col");
                eventCol.innerHTML = `
                    <div class="card bg-negro-azulado text-white h-100 border-0">
                        <img src="${event.eventImg}" class="card-img-top" alt="${event.eventTitle}" loading="lazy">
                        <div class="card-body">
                            <h5 class="card-title">${event.eventTitle}</h5>
                            <p class="card-text small">${event.eventDescription}</p>
                            <a href="#" class="text-magenta text-decoration-none fw-bold">ver detalles</a>
                        </div>
                    </div>
                `;

                eventsContainerIndex.appendChild(eventCol);
            });
        }
    }
});

const buttonRegisterEmail = document.getElementById("buttonRegisterEmail");
buttonRegisterEmail.addEventListener("click", captureEmail);

function captureEmail() {
    const inputEmail = document.getElementById("inputEmail");

  
    let emailRegister = JSON.parse(localStorage.getItem('correosRegistrados')) || [];


    emailRegister.push(inputEmail.value);


    localStorage.setItem('correosRegistrados', JSON.stringify(emailRegister));


    inputEmail.value = "";
}