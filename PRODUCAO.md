# ✅ Checklist para Produção - Rádio UAI

## 🔐 Antes de Subir (OBRIGATÓRIO)

### 1. Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` (não suba no Git!):

```bash
# Copie o exemplo
cp .env.local.example .env.local

# Edite e coloque suas informações
NEXT_PUBLIC_ADMIN_PASSWORD=SuaSenhaSuperSecreta123!
NEXT_PUBLIC_CONTACT_EMAIL=contato@radiouai.com.br
NEXT_PUBLIC_WHATSAPP_NUMBER=5535988312020
```

### 2. Adicionar ao .gitignore
Certifique-se que `.env.local` está no `.gitignore`:

```
.env*.local
.env.local
```

### 3. Configurar na Vercel/Netlify
No painel da plataforma de deploy:
- Adicione `NEXT_PUBLIC_ADMIN_PASSWORD` com senha forte
- Adicione outras variáveis de ambiente

---

## ⚠️ Limitações Atuais (LocalStorage)

### O que acontece:
- ✅ **Funciona perfeitamente** para uso individual
- ⚠️ Dados salvos **apenas no navegador** do usuário
- ⚠️ Se trocar de computador/navegador, dados não aparecem
- ⚠️ Se limpar cache, **perde tudo**

### Solução: Fazer Backup Regular
1. Acesse `/admin/configuracoes`
2. Clique em **"Exportar Dados"**
3. Salve o arquivo `.json` em local seguro
4. Faça isso **semanalmente** ou após cada mudança importante

### Para Restaurar:
1. Acesse `/admin/configuracoes`
2. Clique em **"Importar Dados"**
3. Selecione o arquivo de backup

---

## 📋 Checklist de Deploy

### Pré-Deploy
- [ ] Senha do admin configurada (forte e aleatória)
- [ ] `.env.local.example` atualizado
- [ ] `.env.local` NÃO está no Git
- [ ] Testar tudo localmente (`npm run build`)

### Pós-Deploy
- [ ] Testar login no admin
- [ ] Criar primeiro backup dos dados
- [ ] Adicionar patrocinadores iniciais
- [ ] Configurar programação
- [ ] Testar em mobile e desktop

### Manutenção Semanal
- [ ] Fazer backup dos dados
- [ ] Verificar analytics
- [ ] Atualizar programação se necessário

---

## 🚀 Como Fazer Deploy

### Vercel (Recomendado)
```bash
# Instalar CLI da Vercel
npm i -g vercel

# Deploy
vercel

# Adicionar variáveis de ambiente no dashboard
```

### Netlify
```bash
# Instalar CLI do Netlify
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

---

## 🔄 Workflow Recomendado

### Cenário: Usar em Casa e no Escritório

**PROBLEMA**: Dados não sincronizam entre computadores

**SOLUÇÃO**:

#### Opção 1: Backup Manual (Grátis)
1. No final do dia no escritório:
   - `/admin/configuracoes` → Exportar Dados
   - Salvar no Google Drive/Dropbox
2. Em casa:
   - Baixar backup do Drive
   - `/admin/configuracoes` → Importar Dados

#### Opção 2: Um Computador Principal
- Use sempre o mesmo computador/navegador
- Faça backups periódicos apenas por segurança

#### Opção 3: Backend Simples (Futuro)
- Firebase (grátis até 10GB)
- Supabase (grátis até 500MB)
- Sincronização automática entre dispositivos

---

## 🛡️ Segurança

### Senha do Admin
**ATUAL**: Visível no código JavaScript do navegador
- ✅ OK para site pequeno/interno
- ⚠️ Qualquer um técnico pode descobrir
- **Dica**: Use senha forte e mude regularmente

### Melhorar Depois (Se Necessário):
- Autenticação com backend (NextAuth.js)
- Session tokens
- Rate limiting

---

## 📊 Analytics

### Funciona Assim:
- Registra: plays, cliques, visitas
- Salvo no localStorage
- **Limitação**: Só conta no navegador do usuário
- Não é preciso como Google Analytics

### Para Analytics Real:
- Adicionar Google Analytics 4
- Ou usar Vercel Analytics (pago)

---

## 🎨 Imagens

### Sistema Atual:
- Upload → Converte para Base64
- Salvo no localStorage
- **Limite**: ~2MB por imagem

### Melhorar Depois:
- Usar serviço de imagens:
  - Cloudinary (grátis 25GB)
  - ImgBB (grátis)
  - Imgur
- Mais rápido e sem limite

---

## 🐛 Problemas Comuns

### "Dados sumiram"
- Cache limpo ou navegador diferente
- **Solução**: Importar último backup

### "Não consigo fazer login"
- Senha errada
- Variável de ambiente não configurada
- **Solução**: Verificar `.env.local` ou painel da Vercel

### "Imagem não carrega"
- URL externa inválida
- Base64 muito grande
- **Solução**: Usar imagens menores (<2MB)

---

## ✅ Está Pronto para Produção?

### SIM, se:
- ✅ Uma pessoa gerencia
- ✅ Sempre usa mesmo computador/navegador
- ✅ Faz backup semanal
- ✅ Site pequeno/médio porte
- ✅ Senha forte configurada

### CONSIDERE MELHORIAS se:
- ⚠️ Várias pessoas precisam editar
- ⚠️ Precisa acessar de vários lugares
- ⚠️ Muitas imagens grandes
- ⚠️ Precisa analytics preciso
- ⚠️ Mais de 100 visitantes/dia

---

## 🎯 Resumo

**PODE SUBIR ASSIM?** 
✅ **SIM!** Funciona perfeitamente para o caso de uso descrito.

**O QUE FAZER AGORA:**
1. Mudar senha do admin
2. Fazer primeiro backup após configurar
3. Subir para produção
4. Criar rotina de backup semanal

**PRÓXIMAS MELHORIAS (Opcional/Futuro):**
- Backend para sincronizar dados
- Upload de imagens em serviço externo
- Autenticação mais robusta
- Analytics profissional

---

## 📞 Suporte

Em caso de dúvidas sobre:
- Deploy
- Backup/Restore
- Configuração

Entre em contato ou consulte a documentação do Next.js.

---

**Boa sorte com o lançamento! 🚀📻**
