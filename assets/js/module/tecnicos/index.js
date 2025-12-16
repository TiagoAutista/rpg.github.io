// ============ VARIÁVEIS ============
let ordens = [];
let tecnicos = [];
let editingPon = null;

// ============ UTILITÁRIOS ============
function displayMessage(msg, type) {
    const el = document.getElementById('message');
    if (!el) return;
    el.textContent = msg;
    el.className = `message ${type === 'success' ? 'message-success' : 'message-error'}`;
    setTimeout(() => {
        el.textContent = '';
        el.className = 'message';
    }, 4000);
}

function resetForm() {
    const form = document.getElementById('orderForm');
    if (form) form.reset();

    const cancelBtn = document.getElementById('cancelEditOrderBtn');
    if (cancelBtn) cancelBtn.style.display = 'none';

    editingPon = null;

    const submitBtn = document.querySelector('#orderForm button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'CADASTRAR ORDEM';
}

function formatDate(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// ============ CARREGAMENTO SEGURO DE DADOS ============
function loadTecnicos() {
    try {
        const data = localStorage.getItem('tecnicos');
        tecnicos = data ? (Array.isArray(JSON.parse(data)) ? JSON.parse(data) : []) : [];
    } catch (e) {
        console.error('Erro ao carregar técnicos:', e);
        tecnicos = [];
        localStorage.removeItem('tecnicos');
    }
}

function loadOrdens() {
    try {
        const data = localStorage.getItem('ordens');
        if (!data) {
            ordens = [];
            return;
        }

        const parsed = JSON.parse(data);
        if (!Array.isArray(parsed)) {
            throw new Error('Dados não são um array');
        }

        // 🔁 FILTRO: mantém só ordens com estrutura válida (nova)
        ordens = parsed.filter(ordem =>
            ordem &&
            typeof ordem === 'object' &&
            ordem.ponOrdem !== undefined &&
            ordem.tecnico !== undefined &&
            ordem.descricao !== undefined &&
            ordem.dataOrdem !== undefined &&
            ordem.status !== undefined &&
            ordem.cpfCnpj !== undefined
        );

        // ✅ Salva de volta (remove lixo antigo)
        localStorage.setItem('ordens', JSON.stringify(ordens));
    } catch (e) {
        console.error('Erro ao carregar ordens:', e);
        ordens = [];
        localStorage.removeItem('ordens');
    }
}

function saveOrdens() {
    try {
        localStorage.setItem('ordens', JSON.stringify(ordens));
    } catch (e) {
        console.error('Falha ao salvar ordens:', e);
        displayMessage('Erro ao salvar. Verifique o espaço de armazenamento.', 'error');
    }
}

// ============ RENDERIZAÇÃO ============
function displayOrders(ordersList = ordens) {
    const tbody = document.querySelector('#orderList tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (ordersList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="no-data">Nenhuma ordem encontrada.</td></tr>`;
        return;
    }

    ordersList.forEach(ordem => {
        const escapedPon = (ordem.ponOrdem || '').replace(/'/g, "\\'");
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${ordem.ponOrdem || ''}</td>
            <td>${ordem.tecnico || ''}</td>
            <td>${ordem.descricao || ''}</td>
            <td>${formatDate(ordem.dataOrdem)}</td>
            <td>${ordem.status || ''}</td>
            <td>${ordem.cpfCnpj || ''}</td>
            <td>
                <button class="btn arcade" onclick="iniciarEdicao('${escapedPon}')">Editar</button>
                <button class="btn arcade" style="background:#dc3545;margin-left:4px;" onclick="excluirOrdem('${escapedPon}')">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function updateOrderCount() {
    const el = document.getElementById('countOrderMessage');
    if (el) {
        el.textContent = `Total de Ordens Cadastradas: ${ordens.length}`;
    }
}

// ============ EDIÇÃO / EXCLUSÃO ============
function iniciarEdicao(ponOrdem) {
    const ordem = ordens.find(o => o.ponOrdem === ponOrdem);
    if (!ordem) return;

    editingPon = ponOrdem;
    document.getElementById('ponOrdem').value = ordem.ponOrdem;
    document.getElementById('tecnico').value = ordem.tecnico;
    document.getElementById('descricao').value = ordem.descricao;
    document.getElementById('dataOrdem').value = ordem.dataOrdem;
    document.getElementById('status').value = ordem.status;
    document.getElementById('cpfCnpj').value = ordem.cpfCnpj;

    verificarTecnico();

    const submitBtn = document.querySelector('#orderForm button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'SALVAR ALTERAÇÕES';

    const cancelBtn = document.getElementById('cancelEditOrderBtn');
    if (cancelBtn) cancelBtn.style.display = 'inline-block';
}

function excluirOrdem(ponOrdem) {
    if (!confirm(`Deseja excluir a ordem ${ponOrdem}?`)) return;
    ordens = ordens.filter(o => o.ponOrdem !== ponOrdem);
    saveOrdens();
    displayOrders();
    updateOrderCount();
    displayMessage('Ordem excluída com sucesso!', 'success');
}

// ============ TÉCNICOS ============
function verificarTecnico() {
    const matInput = document.getElementById('tecnico');
    const nomeInput = document.getElementById('tecnicoNome');
    const telInput = document.getElementById('tecnicoTelefone');
    const btn = document.getElementById('btnCadastrarTecnico');

    if (!matInput || !nomeInput || !telInput) return;

    const matricula = matInput.value.trim();
    nomeInput.value = '';
    telInput.value = '';

    if (!matricula) {
        if (btn) btn.disabled = true;
        return;
    }

    const tecnico = tecnicos.find(t => t.matricula === matricula);
    if (tecnico) {
        nomeInput.value = tecnico.nome || '';
        telInput.value = tecnico.telefone || '';
        if (btn) {
            btn.disabled = true;
            btn.title = "Técnico já cadastrado.";
        }
    } else {
        if (btn) {
            btn.disabled = false;
            btn.title = "Técnico não encontrado. Clique para cadastrar.";
        }
    }
}

// ============ BUSCA ============
function searchOrder() {
    const term = (document.getElementById('searchOrder')?.value || '').toLowerCase().trim();
    if (!term) {
        displayOrders();
        return;
    }

    const filtered = ordens.filter(o =>
        (o.ponOrdem || '').toLowerCase().includes(term) ||
        (o.tecnico || '').toLowerCase().includes(term) ||
        (o.descricao || '').toLowerCase().includes(term) ||
        (o.cpfCnpj || '').includes(term)
    );
    displayOrders(filtered);
}

// ============ INICIALIZAÇÃO ============
document.addEventListener('DOMContentLoaded', () => {
    // 1. Carrega dados
    loadTecnicos();
    loadOrdens(); // ← Filtra e limpa dados antigos automaticamente

    // 2. Renderiza
    displayOrders();
    updateOrderCount();

    // 3. Formulário de ordem
    const form = document.getElementById('orderForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const ponOrdem = document.getElementById('ponOrdem')?.value.trim();
            const tecnico = document.getElementById('tecnico')?.value.trim();
            const descricao = document.getElementById('descricao')?.value;
            const dataOrdem = document.getElementById('dataOrdem')?.value;
            const status = document.getElementById('status')?.value;
            const cpfCnpj = document.getElementById('cpfCnpj')?.value.trim();

            if (!ponOrdem || !tecnico || !descricao || !dataOrdem || !status || !cpfCnpj) {
                displayMessage('Preencha todos os campos.', 'error');
                return;
            }

            if (!tecnicos.some(t => t.matricula === tecnico)) {
                displayMessage('Técnico não cadastrado! Use "+ TÉCNICO".', 'error');
                return;
            }

            if (editingPon === null && ordens.some(o => o.ponOrdem === ponOrdem)) {
                displayMessage('PON já cadastrada!', 'error');
                return;
            }

            const novaOrdem = { ponOrdem, tecnico, descricao, dataOrdem, status, cpfCnpj };

            if (editingPon !== null) {
                const idx = ordens.findIndex(o => o.ponOrdem === editingPon);
                if (idx !== -1) ordens[idx] = novaOrdem;
                editingPon = null;
                displayMessage('Ordem atualizada!', 'success');
            } else {
                ordens.push(novaOrdem);
                displayMessage('Ordem cadastrada com sucesso!', 'success');
            }

            saveOrdens(); // ← Salva imediatamente
            resetForm();
            displayOrders();
            updateOrderCount();
        });
    }

    // 4. Botões
    const cancelBtn = document.getElementById('cancelEditOrderBtn');
    if (cancelBtn) cancelBtn.addEventListener('click', resetForm);

    const searchInput = document.getElementById('searchOrder');
    if (searchInput) searchInput.addEventListener('input', searchOrder);

    const countBtn = document.getElementById('updateCountOrderBtn');
    if (countBtn) countBtn.addEventListener('click', updateOrderCount);

    // 5. Modal técnico
    const modal = document.getElementById('modalTecnico');
    const openBtn = document.getElementById('btnCadastrarTecnico');
    if (openBtn && modal) {
        openBtn.addEventListener('click', () => modal.style.display = 'flex');
        document.getElementById('closeModal')?.addEventListener('click', () => modal.style.display = 'none');
        document.getElementById('cancelTecnico')?.addEventListener('click', () => modal.style.display = 'none');
        window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

        document.getElementById('tecnicoForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const mat = document.getElementById('matriculaTecnico')?.value.trim();
            const nome = document.getElementById('nomeTecnico')?.value.trim();
            if (!mat || !nome) {
                alert('Matrícula e nome são obrigatórios!');
                return;
            }
            if (tecnicos.some(t => t.matricula === mat)) {
                alert('Matrícula já cadastrada!');
                return;
            }
            tecnicos.push({
                matricula: mat,
                nome: nome,
                telefone: document.getElementById('telefoneTecnico')?.value.trim() || ''
            });
            localStorage.setItem('tecnicos', JSON.stringify(tecnicos));
            document.getElementById('tecnico').value = mat;
            verificarTecnico();
            modal.style.display = 'none';
            alert('Técnico cadastrado com sucesso!');
        });
    }

    // 6. Eventos iniciais
    const tecnicoInput = document.getElementById('tecnico');
    if (tecnicoInput) {
        tecnicoInput.addEventListener('input', verificarTecnico);
        verificarTecnico(); // executa uma vez para valores pré-existentes
    }
});