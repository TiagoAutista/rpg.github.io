// assets/js/components/dashboard.js
/**
 * Inicializa o painel de status do personagem (dashboard).
 * Deve ser chamado após o partial 'dashboard-status.html' ser carregado.
 */
export function initDashboardStatus() {
  const panel = document.querySelector('.character-status-panel');
  if (!panel) {
    console.warn('[Dashboard] ⚠️ .character-status-panel não encontrado.');
    return;
  }

  // Simulação de dados do usuário
  const userData = {
    name: "AETHERN",
    level: 12,
    currentXp: 142,
    xpToNext: 200
  };

  try {
    // Atualiza elementos
    const usernameEl = panel.querySelector('.username');
    const levelBadge = document.getElementById('profile-level-badge');
    const xpCurrent = document.getElementById('profile-xp-current');
    const progressFill = document.getElementById('profile-xp-fill');

    if (usernameEl) usernameEl.textContent = userData.name;
    if (levelBadge) levelBadge.textContent = userData.level;
    if (xpCurrent) xpCurrent.textContent = userData.currentXp;

    if (progressFill) {
      const percent = Math.min((userData.currentXp / userData.xpToNext) * 100, 100);
      progressFill.style.width = `${percent}%`;

      const progressBar = progressFill.closest('.progress-bar');
      if (progressBar) {
        progressBar.setAttribute('aria-valuenow', userData.currentXp);
        progressBar.setAttribute('aria-valuemax', userData.xpToNext);
      }
    }

    // Mostra o painel
    panel.removeAttribute('hidden');
    console.log('[Dashboard] ✅ Painel inicializado.');

    // Inicializa interações
    initDashboardToggle(panel);
    initSidebarOpener();

  } catch (error) {
    console.error('[Dashboard] ❌ Erro:', error);
  }
}

/**
 * Toggle para recolher/expandir o painel
 */
function initDashboardToggle(panel) {
  const toggleBtn = document.getElementById('toggleDashboardPanel');
  if (!toggleBtn) return;

  let isCollapsed = false;

  toggleBtn.addEventListener('click', () => {
    isCollapsed = !isCollapsed;
    panel.classList.toggle('collapsed', isCollapsed);

    if (isCollapsed) {
      toggleBtn.textContent = '▾';
      toggleBtn.setAttribute('aria-label', 'Expandir painel de status');
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      toggleBtn.textContent = '▴';
      toggleBtn.setAttribute('aria-label', 'Recolher painel de status');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });
}

/**
 * Botão "MENU" que abre o sidebar
 */
function initSidebarOpener() {
  const openSidebarBtn = document.getElementById('openSidebarFromDashboard');
  if (!openSidebarBtn) return;

  openSidebarBtn.addEventListener('click', () => {
    const sidebarToggle = document.getElementById('toggleSidebar');
    if (sidebarToggle) {
      sidebarToggle.click(); // Reutiliza a lógica existente
    }
  });
}