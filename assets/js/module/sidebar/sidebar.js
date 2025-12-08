export function initSidebarToggle() {
  const container = document.querySelector('.sidebar-container');
  const sidebar = container?.querySelector('.sidebar');
  const toggleBtn = document.getElementById('toggleSidebar');

  if (!container || !sidebar || !toggleBtn) return;

  // Detecta se é mobile
  const isMobile = window.innerWidth <= 768;
  let isHidden = isMobile; // ✅ Em mobile, inicia escondido

  // Aplica estado inicial
  if (isHidden) {
    container.setAttribute('hidden', '');
    toggleBtn.textContent = '➤';
    toggleBtn.setAttribute('aria-label', 'Expandir menu lateral');
    toggleBtn.setAttribute('aria-expanded', 'false');
  } else {
    toggleBtn.textContent = '◅';
    toggleBtn.setAttribute('aria-label', 'Recolher menu lateral');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function showSidebar() {
    container.removeAttribute('hidden');
    container.offsetHeight; // força reflow
    container.classList.remove('hiding');
    
    toggleBtn.textContent = '◅';
    toggleBtn.setAttribute('aria-label', 'Recolher menu lateral');
    toggleBtn.setAttribute('aria-expanded', 'true');
    sidebar.removeAttribute('aria-hidden');
    sidebar.querySelectorAll('[tabindex="-1"]').forEach(el => el.removeAttribute('tabindex'));
    
    isHidden = false;
  }

  function hideSidebar() {
    container.classList.add('hiding');
    
    toggleBtn.textContent = '➤';
    toggleBtn.setAttribute('aria-label', 'Expandir menu lateral');
    toggleBtn.setAttribute('aria-expanded', 'false');
    sidebar.setAttribute('aria-hidden', 'true');
    sidebar.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
      .forEach(el => el.setAttribute('tabindex', '-1'));

    setTimeout(() => {
      container.setAttribute('hidden', '');
      isHidden = true;
    }, 300);
  }

  toggleBtn.addEventListener('click', () => {
    if (isHidden) showSidebar();
    else hideSidebar();
  });
}