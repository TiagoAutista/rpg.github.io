// initSidebarToggle.js
export function initSidebarToggle() {
    const container = document.querySelector('.sidebar-container');
    const sidebar = container?.querySelector('.sidebar');
    const menuButton = document.getElementById('openSidebarFromDashboard'); // Usando o botão existente

    if (!container || !sidebar || !menuButton) return;

    // Inicializa o estado do sidebar
    const isMobile = window.innerWidth <= 1920;
    let isHidden = isMobile; // Em mobile, inicia escondido

    // Aplica estado inicial
    if (isHidden) {
        container.setAttribute('hidden', '');
        sidebar.setAttribute('aria-hidden', 'true');
    } else {
        sidebar.removeAttribute('aria-hidden');
    }

    function showSidebar() {
        container.removeAttribute('hidden');
        container.offsetHeight; // Força reflow
        sidebar.removeAttribute('aria-hidden');
        sidebar.querySelectorAll('[tabindex="-1"]').forEach(el => el.removeAttribute('tabindex'));
        isHidden = false;
    }

    function hideSidebar() {
        container.setAttribute('hidden', '');
        sidebar.setAttribute('aria-hidden', 'true');
        sidebar.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
            .forEach(el => el.setAttribute('tabindex', '-1'));
        isHidden = true;
    }

    // Adiciona evento de clique ao botão que abre o sidebar
    menuButton.addEventListener('click', () => {
        if (isHidden) {
            showSidebar();
        } else {
            hideSidebar();
        }
    });
}

// Função para controlar o painel de status do dashboard
export function initDashboardToggle() {
    const toggleButton = document.getElementById('toggleDashboardPanel');
    const dashboardPanel = document.querySelector('.dashboard-panel');

    if (!toggleButton || !dashboardPanel) return;

    toggleButton.addEventListener('click', () => {
        const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';

        // Alternar a exibição do painel
        if (isExpanded) {
            dashboardPanel.style.display = 'none'; // Ocultar painel
            toggleButton.setAttribute('aria-expanded', 'false');
            toggleButton.setAttribute('aria-label', 'Expandir painel de status');
            toggleButton.innerHTML = '▾'; // Atualiza o ícone
        } else {
            dashboardPanel.style.display = 'block'; // Mostrar painel
            toggleButton.setAttribute('aria-expanded', 'true');
            toggleButton.setAttribute('aria-label', 'Recolher painel de status');
            toggleButton.innerHTML = '▴'; // Atualiza o ícone
        }
    });
}

// Inicialize as funções
initSidebarToggle();
initDashboardToggle();
