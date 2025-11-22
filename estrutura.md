Main/
│
├── index.html                     ← Página principal
│
├── estrutura.md                  ← Documentação da estrutura (opcional)
│
├── assets/
│   ├── css/
│   │   ├── base/                 ← Estilos globais e reset
│   │   │   └── base.css
│   │   ├── components/           ← Estilos reutilizáveis por componente
│   │   │   ├── header.css
│   │   │   ├── nav-footer.css
│   │   │   └── dashboard-status.css
│   │   └── main.css              ← Arquivo principal (pode importar os demais ou conter estilos específicos da página)
│   │
│   ├── img/
│   │   ├── avatar/
│   │   │   ├── avatar-main.png
│   │   │   ├── moldura-avatar.png
│   │   │   └── avatar-perfil.png
│   │   └── main/
│   │       └── hero-banner.png   ← ou outro nome descritivo
│   │
│   ├── js/
│   │   ├── modules/
│   │   │   └── perfil.js         ← Módulo de funcionalidades do perfil
│   │   └── main.js               ← Script principal da página
│   │
│   └── json/
│       └── main.json             ← Dados usados na página principal
│
└── partials/
    ├── header.html
    ├── dashboard-status.html
    └── nav-footer.html