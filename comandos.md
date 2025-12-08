1. Clonar o repositório (primeira vez)

git clone https://github.com/TiagoAutista/rpg.github.io.git

Baixa uma cópia do projeto do GitHub para seu computador.

2. Entrar na pasta do projeto

cd rpg.github.io

Navega até a pasta do projeto após clonar.

3. Verificar status das alterações

git status

Mostra quais arquivos foram modificados, adicionados ou não rastreados.

4. Adicionar arquivos para commit

git add .

Adiciona todos os arquivos alterados à área de preparação (stage).
⚠️ Use com cuidado! Para adicionar só um arquivo: git add nome-do-arquivo.html.

5. Criar um commit

git commit -m "Descreva sua alteração aqui"

Salva um "ponto de restauração" com suas mudanças.
✅ Exemplos: "Adiciona página de regras", "Corrige layout do menu".

6. Enviar alterações para o GitHub

git push origin main

Envia seu commit para o GitHub.
⚠️ Se seu projeto usa master em vez de main, substitua: git push origin master.

7. Atualizar seu código local com o GitHub

git pull origin main

Baixa as alterações mais recentes do GitHub para seu computador (útil se você editou algo no site ou em outro dispositivo).

8. Verificar branch atual

git branch

Mostra em qual branch você está (normalmente main ou master). A branch ativa aparece com *.

9. Verificar URL do repositório remoto

git remote -v

Confirma o link do repositório no GitHub.
Se estiver errado (ex: com espaços), corrija com:  

git remote set-url origin https://github.com/TiagoAutista/rpg.github.io.git

10. Publicar no GitHub Pages

Não é um comando! Faça isso no site:

    Acesse: https://github.com/TiagoAutista/rpg.github.io
    Clique em Settings → Pages
    Em Branch, selecione main (ou master) e / (root)
    Clique em Save

Seu site ficará disponível em:
🔗 https://tiagoautista.github.io/rpg.github.io/

✅ Dica final

Sempre que fizer alterações:

git add .
git commit -m "Minha atualização"
git push origin main
