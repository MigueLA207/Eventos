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

const emailRegister = JSON.parse(localStorage.getItem('correosRegistrados'));

const deleteRegister = document.getElementById("deleteRegister");


emailRegister.forEach((correo, index) => {
    const tableEmails = document.getElementById("tableEmails").innerHTML += `                    
                        <tbody id="subscriptionsTableBody">
                        <tr>
                            <th scope="row">${index+1}</th>
                            <td>${correo}</td>
                            <td>
                                <button id="deleteRegister"  class="btn-delete btn-sm" data-index="${index}">
                                    <i class="fas fa-trash"></i> Eliminar
                                </button>
                            </td>
                        </tr>
                    </tbody>`;

    
});

document.addEventListener("click", function (e) {
    if (e.target.matches(".btn-delete")) {
        const index = parseInt(e.target.getAttribute("data-index"));
        emailRegister.splice(index, 1);
        localStorage.setItem("correosRegistrados", JSON.stringify(emailRegister));
        location.reload(); 
    }
});