
// CONFIGURAÇÃO DO PRV
const CONFIG_PRV = {
    PONTOS_POR_ORDEM: 0.8,
    BONUS_ASSIDUIDADE: 0.50,
    BONUS_PAUSA: 0.30,
    LIMITE_MULTIPLICADOR: 800,
    DIAS_UTEIS_MES: 22,
    META_ORDENS_MES: 1000
};

// Estado
let currentTheme = localStorage.getItem('dashboardTheme') || 'dark';
if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
}

// Função de validação de CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    return rev === parseInt(cpf.charAt(10));
}

// Calcular nível com base nos pontos
function calcularNivel(pontosProducao) {
    return Math.floor(pontosProducao / 200) + 1;
}

// Cálculo PRV
function calcularPRV(ordensConcluidas) {
    const producao = ordensConcluidas * CONFIG_PRV.PONTOS_POR_ORDEM;
    const multiplicadorAtivo = producao >= CONFIG_PRV.LIMITE_MULTIPLICADOR;
    const pontuacaoFinal = multiplicadorAtivo
        ? producao * (1 + CONFIG_PRV.BONUS_ASSIDUIDADE + CONFIG_PRV.BONUS_PAUSA)
        : producao;
    const nivel = calcularNivel(producao);

    return {
        ordens: ordensConcluidas,
        producao: producao,
        pontuacaoFinal: pontuacaoFinal,
        multiplicadorAtivo: multiplicadorAtivo,
        progressoPercentual: Math.min(100, (producao / CONFIG_PRV.LIMITE_MULTIPLICADOR) * 100),
        faltaParaMultiplicador: Math.max(0, CONFIG_PRV.LIMITE_MULTIPLICADOR - producao),
        nivel: nivel
    };
}

// Atualizar interface PRV
function atualizarInterfacePRV(pr) {
    document.getElementById('prv-ordens').textContent = pr.ordens;
    document.getElementById('prv-producao').textContent = pr.producao.toFixed(1);
    document.getElementById('prv-final').textContent = pr.pontuacaoFinal.toFixed(1);

    const progresso = pr.progressoPercentual;
    document.getElementById('prv-progress-bar').style.width = `${progresso}%`;
    document.getElementById('prv-progress-text').textContent = `${pr.producao.toFixed(1)} / ${CONFIG_PRV.LIMITE_MULTIPLICADOR}`;

    const statusEl = document.getElementById('multiplier-status');
    if (pr.multiplicadorAtivo) {
        statusEl.className = 'multiplier-status multiplier-active';
        statusEl.textContent = '✅ MULTIPLIER ACTIVATED!';
    } else {
        statusEl.className = 'multiplier-status multiplier-inactive';
        statusEl.textContent = `⚠️ ${pr.faltaParaMultiplicador.toFixed(1)} PTS TO ACTIVATE`;
    }

    document.getElementById('kpi-level').textContent = pr.nivel;
}

// Atualizar perfil gamificado com moldura
function atualizarPerfilGamificado(pontosProducao) {
    const nivel = Math.floor(pontosProducao / 200) + 1;
    const xpAtual = pontosProducao % 200;
    const porcentagemXP = (xpAtual / 200) * 100;

    document.getElementById('profile-level-badge').textContent = nivel;
    const fillElement = document.getElementById('profile-xp-fill');
    const currentElement = document.getElementById('profile-xp-current');

    if (fillElement && currentElement) {
        fillElement.style.width = `${porcentagemXP}%`;
        currentElement.textContent = xpAtual.toFixed(1);
        const progressBar = fillElement.parentElement;
        if (progressBar) {
            progressBar.setAttribute('aria-valuenow', xpAtual.toFixed(1));
        }
    }
}

// Atualizar KPIs
function atualizarKPIs(ordensConcluidas, clientesAtivos) {
    document.getElementById('kpi-clientes').textContent = clientesAtivos;

    const metaDiaria = Math.ceil(CONFIG_PRV.META_ORDENS_MES / CONFIG_PRV.DIAS_UTEIS_MES);
    document.getElementById('kpi-meta-diaria').textContent = metaDiaria;

    const cumprimento = Math.min(100, Math.round((ordensConcluidas / CONFIG_PRV.META_ORDENS_MES) * 100));
    document.getElementById('kpi-cumprimento').textContent = `${cumprimento}%`;
}

// Atualizar dashboard completo
function atualizarDashboardCompleto() {
    const registros = JSON.parse(localStorage.getItem('registro_unificado') || '[]');
    const ordensConcluidas = registros.filter(r => r.statusOrdem === 'concluida').length;
    const clientesAtivos = registros.filter(r =>
        r.statusOrdem === 'concluida' && r.cpf && validarCPF(r.cpf)
    ).length;

    const pr = calcularPRV(ordensConcluidas);
    atualizarInterfacePRV(pr);
    atualizarPerfilGamificado(pr.producao);
    atualizarKPIs(ordensConcluidas, clientesAtivos);
}

// Eventos
document.getElementById('toggleTheme').addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light-theme');
    localStorage.setItem('dashboardTheme', currentTheme);
});

document.getElementById('exportReport').addEventListener('click', () => {
    const registros = JSON.parse(localStorage.getItem('registro_unificado') || '[]');
    const relatorio = registros.map(r => ({
        PON: r.pon,
        CPF: r.cpf || '',
        "DATA CRIACAO": r.dataCriacao || '',
        STATUS: r.statusOrdem === 'concluida' ? "CONCLUIDA" : "PENDENTE",
        VALIDADO: r.cpf && validarCPF(r.cpf) ? "SIM" : "NAO"
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(relatorio);
    XLSX.utils.book_append_sheet(wb, ws, "RELATORIO PRV");
    XLSX.writeFile(wb, `RELATORIO_PRV_${new Date().toISOString().slice(0, 10)}.XLSX`);
});

// Inicialização
atualizarDashboardCompleto();
setInterval(atualizarDashboardCompleto, 3000);
window.addEventListener('storage', atualizarDashboardCompleto);
