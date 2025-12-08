// assets/js/index.js
import { loadIncludes } from './include-handler.js';
import { initSidebarToggle } from './module/sidebar/sidebar.js';
import { initDashboardStatus } from './module/dashboard/dashboard.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Carrega o sidebar
  await loadIncludes();
  
  // 2. Só depois, inicializa o toggle
  initSidebarToggle();
  initDashboardStatus(); // ← agora o DOM contém o painel
});