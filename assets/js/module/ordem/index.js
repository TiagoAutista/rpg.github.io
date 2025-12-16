// Função para formatar data (YYYY-MM-DD → DD/MM/YYYY)
function formatDate(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// Função para exibir mensagens de feedback
function displayMessage(msg, isSuccess = true) {
    const el = document.getElementById('message');
    if (!el) return;
    el.textContent = msg;
    el.style.color = isSuccess ? '#66ff66' : '#ff6666';
    setTimeout(() => el.textContent = '', 4000);
}

// Função principal: carrega e exibe ordens
function loadAndDisplayOrders() {
    const tbody = document.querySelector('#orderList tbody');
    if (!tbody) return;

    try {
        // Carrega e filtra ordens válidas
        const ordens = JSON.parse(localStorage.getItem('ordens') || '[]')
            .filter(o => o && typeof o === 'object' && o.ponOrdem);

        // Limpa tabela
        tbody.innerHTML = '';

        // Mensagem se vazio
        if (ordens.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="no-data">Nenhuma ordem encontrada.</td></tr>`;
        } else {
            // Renderiza cada ordem
            ordens.forEach(o => {
                const escapedPon = (o.ponOrdem || '').replace(/'/g, "\\'");
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${o.ponOrdem}</td>
                    <td>${o.tecnico || ''}</td>
                    <td>${o.descricao || ''}</td>
                    <td>${formatDate(o.dataOrdem)}</td>
                    <td>${o.status || ''}</td>
                    <td>${o.cpfCnpj || ''}</td>
                    <td>
                        <button class="btn arcade" onclick="iniciarEdicao('${escapedPon}')">Editar</button>
                        <button class="btn arcade" style="background:#dc3545;margin-left:4px;" onclick="excluirOrdem('${escapedPon}')">🗑️</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Atualiza contagem
        const countEl = document.getElementById('countOrderMessage');
        if (countEl) {
            countEl.textContent = `Total de Ordens Cadastradas: ${ordens.length}`;
        }

    } catch (error) {
        console.error('Erro ao carregar ordens:', error);
        tbody.innerHTML = `<tr><td colspan="7" style="color:#ff6666;text-align:center;">Erro ao carregar dados.</td></tr>`;
    }
}

// ===== FUNÇÕES DE EDIÇÃO/EXCLUSÃO (mantidas para onclick) =====
function iniciarEdicao(ponOrdem) {
    displayMessage(`Editar ordem ${ponOrdem} (implementar depois)`, true);
    console.log('Editar:', ponOrdem);
}

function excluirOrdem(ponOrdem) {
    if (!confirm(`Excluir ordem ${ponOrdem}?`)) return;
    try {
        const ordens = JSON.parse(localStorage.getItem('ordens') || '[]');
        const filtradas = ordens.filter(o => o.ponOrdem !== ponOrdem);
        localStorage.setItem('ordens', JSON.stringify(filtradas));
        loadAndDisplayOrders(); // Atualiza visualmente
        displayMessage('Ordem excluída com sucesso!', true);
    } catch (e) {
        displayMessage('Erro ao excluir ordem.', false);
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // 1. Carrega ordens ao iniciar
    loadAndDisplayOrders();

    // 2. Atualiza contagem ao clicar no botão (se existir)
    const updateBtn = document.getElementById('updateCountOrderBtn');
    if (updateBtn) {
        updateBtn.addEventListener('click', () => {
            const count = JSON.parse(localStorage.getItem('ordens') || '[]').filter(o => o.ponOrdem).length;
            document.getElementById('countOrderMessage').textContent = `Total de Ordens Cadastradas: ${count}`;
        });
    }

    // 3. Busca em tempo real (se campo existir)
    const searchInput = document.getElementById('searchOrder');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const term = searchInput.value.toLowerCase().trim();
            if (!term) {
                loadAndDisplayOrders();
                return;
            }
            try {
                const ordens = JSON.parse(localStorage.getItem('ordens') || '[]')
                    .filter(o => o && o.ponOrdem);
                const filtradas = ordens.filter(o =>
                    (o.ponOrdem || '').toLowerCase().includes(term) ||
                    (o.tecnico || '').toLowerCase().includes(term) ||
                    (o.descricao || '').toLowerCase().includes(term) ||
                    (o.cpfCnpj || '').includes(term)
                );
                const tbody = document.querySelector('#orderList tbody');
                if (tbody) {
                    tbody.innerHTML = '';
                    if (filtradas.length === 0) {
                        tbody.innerHTML = `<tr><td colspan="7" class="no-data">Nenhuma ordem encontrada.</td></tr>`;
                    } else {
                        filtradas.forEach(o => {
                            const escapedPon = (o.ponOrdem || '').replace(/'/g, "\\'");
                            const tr = document.createElement('tr');
                            tr.innerHTML = `
                                <td>${o.ponOrdem}</td>
                                <td>${o.tecnico || ''}</td>
                                <td>${o.descricao || ''}</td>
                                <td>${formatDate(o.dataOrdem)}</td>
                                <td>${o.status || ''}</td>
                                <td>${o.cpfCnpj || ''}</td>
                                <td>
                                    <button class="btn arcade" onclick="iniciarEdicao('${escapedPon}')">Editar</button>
                                    <button class="btn arcade" style="background:#dc3545;margin-left:4px;" onclick="excluirOrdem('${escapedPon}')">🗑️</button>
                                </td>
                            `;
                            tbody.appendChild(tr);
                        });
                    }
                }
            } catch (e) {
                console.error('Erro na busca:', e);
            }
        });
    }
});