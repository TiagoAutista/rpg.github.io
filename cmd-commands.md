# Criar um arquivo vazio
New-Item -Path "filename.txt" -ItemType File

# Criar múltiplos arquivos
New-Item file1.md, file2.md, file3.md -ItemType File

# Criar arquivo com conteúdo
Set-Content -Path "readme.md" -Value "# Meu Projeto"

# 🖥️ Guia Rápido: Comandos de Prompt no Windows  
*Para CMD e PowerShell — Útil para VS Code, Desenvolvimento e Automação*

> Ideal para técnicos, desenvolvedores e equipes de campo  
> Projeto: **PRV GAMER DASHBOARD** • Técnico: João Silva • Dez/2025

---

## 📌 Índice
- [CMD (Command Prompt)](#-cmd-command-prompt)
- [PowerShell](#-powershell)
- [VS Code + Terminal](#-vs-code--terminal)
- [Dicas Rápidas](#-dicas-rápidas)

---

## 🪟 CMD (Command Prompt)

| Comando | Descrição |
|--------|----------|
| `dir` | Lista arquivos e pastas no diretório atual |
| `cd nome_pasta` | Entra na pasta |
| `cd ..` | Volta para a pasta anterior |
| `cd \` | Vai para a raiz do drive |
| `cls` | Limpa a tela do terminal |
| `md nome_pasta` ou `mkdir nome_pasta` | Cria uma nova pasta |
| `type nul > arquivo.txt` | Cria um arquivo vazio |
| `echo Olá > nota.txt` | Cria arquivo com texto |
| `copy origem.txt destino.txt` | Copia um arquivo |
| `del arquivo.txt` | Remove um arquivo |
| `rmdir nome_pasta` | Remove pasta **vazia** |
| `rmdir /s nome_pasta` | Remove pasta e **todo o conteúdo** |
| `ipconfig` | Mostra o endereço IP da máquina |
| `ping google.com` | Testa conexão com a internet |
| `systeminfo` | Exibe informações detalhadas do sistema |

---

## ⚡ PowerShell (Padrão no VS Code no Windows)

| Comando | Descrição |
|--------|----------|
| `Get-ChildItem` ou `ls` ou `dir` | Lista arquivos/pastas |
| `Set-Location nome_pasta` ou `cd` | Navega entre pastas |
| `Get-Location` ou `pwd` | Mostra o caminho atual |
| `New-Item -Path arquivo.md -ItemType File` | Cria um arquivo |
| `New-Item -Path "assets/pages/" -ItemType Directory` | Cria uma pasta |
| `Set-Content arquivo.txt "conteúdo"` | Escreve conteúdo em arquivo |
| `Copy-Item a.txt b.txt` | Copia arquivo |
| `Remove-Item arquivo.txt` | Remove arquivo |
| `Remove-Item pasta -Recurse` | Remove pasta e subpastas |
| `Get-NetIPConfiguration` | Mostra configuração de rede |
| `Test-NetConnection google.com` | Ping avançado |
| `Get-ComputerInfo` | Informações do sistema (modelo, OS, etc.) |
| `code .` | Abre o VS Code na pasta atual *(se configurado)* |

> 💡 **Dica**: No PowerShell, use `Tab` para autocompletar nomes de arquivos/pastas!

---

## 🧩 VS Code + Terminal

### Abrir terminal no VS Code:
- Atalho: `` Ctrl + ` `` (backtick)
- Ou: `Terminal > New Terminal`

### Comandos úteis dentro do VS Code:
```powershell
# Criar estrutura de projeto rapidamente
New-Item -Path "assets/css", "assets/js", "partials" -ItemType Directory
New-Item -Path "index.html", "assets/css/main.css", "README.md" -ItemType File