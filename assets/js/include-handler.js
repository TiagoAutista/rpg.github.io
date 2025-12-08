// assets/js/includeHandler.js
/**
 * Carrega todos os elementos com [data-include] de forma confiável.
 * Funciona com sidebar, dashboard, footer, etc.
 */
export async function loadIncludes() {
  const placeholders = document.querySelectorAll('[data-include]');
  
  if (placeholders.length === 0) {
    return;
  }

  // Usa Promise.all para esperar todas as requisições
  const loadPromises = Array.from(placeholders).map(async (placeholder) => {
    const url = placeholder.getAttribute('data-include');
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ${response.status} ao carregar ${url}`);
      }
      
      const html = await response.text();
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html.trim();
      
      // Substitui o placeholder pelo conteúdo real
      placeholder.replaceWith(...wrapper.childNodes);
      
    } catch (error) {
      console.error('❌ Falha ao carregar include:', url, error);
      
      // Opcional: exibe mensagem de erro no lugar
      const errorEl = document.createElement('div');
      errorEl.className = 'include-error';
      errorEl.style.cssText = 'color: #ff6b6b; padding: 10px; border: 1px dashed #ff6b6b;';
      errorEl.textContent = `Erro ao carregar: ${url}`;
      placeholder.replaceWith(errorEl);
    }
  });

  // Aguarda todas as promessas serem resolvidas
  await Promise.all(loadPromises);
}