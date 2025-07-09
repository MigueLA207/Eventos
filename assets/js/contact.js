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