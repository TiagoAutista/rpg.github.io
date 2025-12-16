// Função exportada para inicializar o toggle do sidebar
export function initSidebarToggle() {
  const sidebar = document.querySelector('.sidebar');
  const toggleBtn = document.getElementById('toggleSidebar');

  if (!sidebar || !toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const isHidden = sidebar.getAttribute('aria-hidden') === 'true';
    if (isHidden) {
      sidebar.setAttribute('aria-hidden', 'false');
      sidebar.style.display = '';
      toggleBtn.setAttribute('aria-label', 'Ocultar menu de navegação');
    } else {
      sidebar.setAttribute('aria-hidden', 'true');
      sidebar.style.display = 'none';
      toggleBtn.setAttribute('aria-label', 'Mostrar menu de navegação');
    }
  });
}