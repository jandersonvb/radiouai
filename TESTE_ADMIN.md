# Guia de Testes - Painel Administrativo Radio UAI

## 📋 Pré-requisitos

1. **Instalar dependências** (se necessário):
```bash
npm install
```

2. **Rodar o servidor de desenvolvimento**:
```bash
npm run dev
```

3. **Acessar o site**: http://localhost:3000

---

## 🔐 Teste 1: Autenticação do Admin

### Passos:
1. Navegue para http://localhost:3000/admin
2. Você verá uma tela de login
3. Digite a senha: `radiouai2024`
4. Clique em "Entrar"

### ✅ Resultado Esperado:
- Login bem-sucedido
- Redirecionamento para o Dashboard
- Sidebar visível à esquerda
- Header com título "Dashboard"

### ⚠️ Teste Negativo:
- Tente senha errada → deve mostrar "Senha incorreta"

---

## 📊 Teste 2: Dashboard Principal

### Passos:
1. No Dashboard (`/admin`), observe os 4 cards no topo

### ✅ Resultado Esperado:
- **Patrocinadores Ativos**: deve mostrar "1" (Mauro Sorvetes)
- **Programas na Grade**: deve mostrar "1"
- **Plays Hoje**: deve mostrar "0" (ou número de vezes que tocou)
- **Visitas Hoje**: deve mostrar número de acessos

### 💡 Dica:
- Clique nos cards para navegar para as seções correspondentes

---

## 👥 Teste 3: Gestão de Patrocinadores

### 3.1 - Visualizar Lista
1. Clique em "Patrocinadores" na sidebar
2. Ou acesse: http://localhost:3000/admin/patrocinadores

### ✅ Resultado Esperado:
- Lista mostrando "Mauro Sorvetes"
- Badge verde "Ativo"
- Botões: Ver página, Ativar/Desativar, Editar, Excluir

### 3.2 - Criar Novo Patrocinador
1. Clique em "Novo Patrocinador" (botão vermelho)
2. Preencha o formulário:
   - **Nome**: Padaria Pão Quente
   - **Categoria**: Padaria
   - **Descrição**: A melhor padaria de Itajubá
   - **Logo**: Arraste uma imagem OU cole URL
   - **Endereço**: Rua Teste, 100
   - **Telefone**: (35) 3622-0000
   - **Horário**: Seg-Dom: 6h às 20h
   - **Site**: https://exemplo.com.br
3. Clique em "Criar Patrocinador"

### ✅ Resultado Esperado:
- Modal fecha
- Novo patrocinador aparece na lista
- Total atualiza para "2 patrocinadores cadastrados"

### 3.3 - Upload de Imagem
1. No formulário de novo patrocinador:
   - **Opção 1**: Arraste uma imagem para a área de upload
   - **Opção 2**: Clique na área para selecionar arquivo
   - **Opção 3**: Cole uma URL no campo abaixo
2. A imagem deve aparecer em preview

### ✅ Resultado Esperado:
- Preview da imagem carregada
- Botão X para remover
- Badge "Base64" se for upload local

### 3.4 - Editar Patrocinador
1. Clique no ícone de lápis (Editar) em qualquer patrocinador
2. Altere o nome ou categoria
3. Clique em "Salvar Alterações"

### ✅ Resultado Esperado:
- Alterações salvas
- Lista atualizada com novos dados

### 3.5 - Ativar/Desativar
1. Clique no ícone de olho em um patrocinador
2. O status muda para "Inativo" (badge cinza)

### ✅ Resultado Esperado:
- Patrocinador fica semitransparente
- **IMPORTANTE**: Vá para a home (/) e verifique que ele NÃO aparece mais na seção de patrocinadores

### 3.6 - Reordenar (Drag & Drop)
1. Clique e segure no ícone ⋮⋮ (grip) de um patrocinador
2. Arraste para cima ou para baixo
3. Solte

### ✅ Resultado Esperado:
- Ordem alterada
- Vá para a home (/) e veja que a ordem mudou lá também

### 3.7 - Excluir Patrocinador
1. Clique no ícone de lixeira (vermelho)
2. Confirme a exclusão no modal

### ✅ Resultado Esperado:
- Modal de confirmação aparece
- Após confirmar, patrocinador é removido
- Contador diminui

---

## 📅 Teste 4: Gestão de Programação

### 4.1 - Criar Programa
1. Vá para "Programação" na sidebar
2. Clique em "Novo Programa"
3. Preencha:
   - **Nome**: Tarde UAI
   - **Apresentador**: João Silva
   - **Descrição**: Música e conversa à tarde
   - **Início**: 14:00
   - **Término**: 16:00
   - **Dias**: Clique em "Seg a Sex"
4. Clique em "Criar Programa"

### ✅ Resultado Esperado:
- Programa criado
- Aparece na lista
- Grid de visualização mostra o programa nos dias selecionados

### 4.2 - Editar Programa
1. Clique em Editar (lápis)
2. Altere o horário ou dias
3. Salve

### ✅ Resultado Esperado:
- Alterações refletidas na lista e no grid

### 4.3 - Grid de Visualização
1. Role até "Visualização da Grade"
2. Observe o grid de horários por dia

### ✅ Resultado Esperado:
- Programas aparecem nas células dos dias corretos
- Cores vermelhas para programas ativos
- Cinza para slots vazios

### 4.4 - Validação
1. Tente criar um programa com:
   - Horário de término ANTES do início
   
### ✅ Resultado Esperado:
- Erro: "Horário de término deve ser após o início"

---

## 📈 Teste 5: Analytics

### 5.1 - Verificar Dashboard
1. Vá para "Analytics" na sidebar
2. Observe os cards no topo

### ✅ Resultado Esperado:
- "Plays Hoje", "Visitas Hoje", "Cliques Parceiros"
- Valores iniciais em 0 ou próximo

### 5.2 - Gerar Métricas
1. **Teste de Play**:
   - Vá para a home (/)
   - Clique no botão Play do player
   - Volte para Analytics
   - "Plays Hoje" deve aumentar

2. **Teste de Clique em Patrocinador**:
   - Vá para a home (/)
   - Clique em um patrocinador
   - Volte para Analytics
   - "Cliques Parceiros" deve aumentar
   - Verifique "Top Patrocinadores"

3. **Teste de Visitas**:
   - Navegue por várias páginas
   - Volte para Analytics
   - "Visitas Hoje" aumenta

### 5.3 - Gráfico de Plays
1. Após gerar alguns plays, observe o gráfico "Plays por Dia"

### ✅ Resultado Esperado:
- Barra para a data de hoje
- Altura proporcional ao número de plays

### 5.4 - Filtros de Período
1. Clique em "7 dias" e "30 dias"

### ✅ Resultado Esperado:
- Dados ajustados para o período
- Botão ativo fica vermelho

---

## 🏠 Teste 6: Integração com a Home

### 6.1 - Programação Dinâmica
1. Vá para a home (/)
2. Observe a seção "Programação" (direita)

### ✅ Resultado Esperado:
- Mostra programas do dia atual
- Seletor de dias da semana funcional
- Programa "AO VIVO" destacado se estiver no horário

### 6.2 - Testar "Ao Vivo"
1. No Admin, edite um programa para ter horário ATUAL
   - Ex: Se são 15h, coloque 14:00 - 16:00
2. Vá para a home

### ✅ Resultado Esperado:
- Badge "AO VIVO" aparece
- Programa destacado em vermelho
- Informações do programa aparecem no topo (OnAirHero)

### 6.3 - Mudar Dia da Semana
1. Na home, clique nos dias (Seg, Ter, etc.)

### ✅ Resultado Esperado:
- Lista de programas atualiza
- Mostra apenas programas daquele dia

### 6.4 - Patrocinadores Dinâmicos
1. Na home, veja a seção "Nossos Patrocinadores"

### ✅ Resultado Esperado:
- Apenas patrocinadores ATIVOS aparecem
- Ordem corresponde à definida no admin
- Cliques são registrados no Analytics

---

## 🔄 Teste 7: Persistência de Dados

### 7.1 - Teste LocalStorage
1. Crie vários patrocinadores e programas
2. **Feche o navegador completamente**
3. Abra novamente e acesse /admin

### ✅ Resultado Esperado:
- Todos os dados ainda estão lá
- Dados salvos no localStorage do navegador

### 7.2 - Limpar Dados (Opcional)
1. Abra DevTools (F12)
2. Console → digite:
```javascript
localStorage.clear()
```
3. Recarregue a página

### ✅ Resultado Esperado:
- Volta aos dados iniciais (1 patrocinador, 1 programa)

---

## 🔐 Teste 8: Logout e Sessão

### 8.1 - Logout
1. No admin, clique em "Sair" (parte inferior da sidebar)

### ✅ Resultado Esperado:
- Volta para tela de login
- Não consegue acessar /admin sem fazer login novamente

### 8.2 - Sessão Persistente
1. Faça login
2. Navegue entre páginas do admin
3. **Feche a aba** (não o navegador)
4. Abra nova aba e vá para /admin

### ✅ Resultado Esperado:
- Ainda está logado (sessionStorage)
- Ao fechar o navegador, precisa fazer login novamente

---

## 🎨 Teste 9: Responsividade

### 9.1 - Mobile
1. Abra DevTools (F12)
2. Clique no ícone de dispositivo móvel
3. Selecione iPhone ou similar

### ⚠️ Nota:
- O admin foi projetado para desktop
- A sidebar fica fixa em 256px
- Em mobile, pode haver overflow horizontal

### 9.2 - Home Responsiva
1. Teste a home (/) em mobile

### ✅ Resultado Esperado:
- Grid vira coluna única
- Seletor de dias rolável
- Cards de patrocinadores ajustados

---

## 🐛 Teste 10: Casos Extremos

### 10.1 - Formulários Vazios
1. Tente criar patrocinador sem preencher campos obrigatórios

### ✅ Resultado Esperado:
- Mensagens de erro em vermelho
- Formulário não é enviado

### 10.2 - Muitos Itens
1. Crie 10+ patrocinadores
2. Veja como a lista se comporta

### 10.3 - Imagens Grandes
1. Tente fazer upload de imagem > 2MB

### ✅ Resultado Esperado:
- Erro: "Imagem muito grande. Máximo: 2MB"

### 10.4 - URLs Inválidas
1. Cole URLs de imagens quebradas
2. Veja na home

### ✅ Resultado Esperado:
- Next.js pode mostrar erro de imagem
- Considere adicionar fallback depois

---

## 📊 Checklist Final

- [ ] Login funciona
- [ ] Dashboard mostra dados corretos
- [ ] Criar patrocinador funciona
- [ ] Upload de imagem funciona
- [ ] Editar patrocinador funciona
- [ ] Ativar/Desativar funciona
- [ ] Excluir patrocinador funciona
- [ ] Reordenar funciona
- [ ] Criar programa funciona
- [ ] Grid de programação aparece correto
- [ ] Analytics registra plays
- [ ] Analytics registra cliques
- [ ] Home mostra programação dinâmica
- [ ] Programa "Ao Vivo" funciona
- [ ] Home mostra patrocinadores corretos
- [ ] Dados persistem após fechar navegador
- [ ] Logout funciona

---

## 🔧 Configurações Adicionais

### Mudar Senha do Admin
1. Abra `.env.local` (crie se não existir)
2. Adicione:
```
NEXT_PUBLIC_ADMIN_PASSWORD=sua_senha_aqui
```
3. Reinicie o servidor

### Dados Iniciais Diferentes
1. Edite `lib/sponsors.ts` → `initialSponsors`
2. Edite `lib/schedule.ts` → `initialSchedule`

---

## 🆘 Problemas Comuns

### "Dados não salvam"
- Verifique localStorage no DevTools → Application → Local Storage
- Certifique-se de estar usando o mesmo navegador

### "Imagens não aparecem"
- URLs externas: verifique se estão acessíveis
- Base64: limite de 2MB
- Adicione domínios no `next.config.ts` se necessário

### "Analytics não atualiza"
- Recarregue a página /admin/analytics
- Clique em "Atualizar"
- Verifique localStorage → `radiouai_analytics`

---

## 🎉 Próximos Passos

Após testar tudo:
1. Ajuste dados iniciais conforme necessário
2. Configure senha do admin
3. Adicione mais patrocinadores e programas
4. Considere adicionar backup/export de dados
5. Em produção, considere migrar para banco de dados real

---

**Divirta-se testando! 🚀**
