
# **Liszt**

**Liszt** é uma plataforma que conecta **pacientes** e **psicoterapeutas**, permitindo o gerenciamento de sessões, diários de emoções e sonhos, e o agendamento de sessões. Ele oferece uma interface intuitiva para psicoterapeutas e pacientes interagirem de forma eficaz e segura.

## **Infraestrutura da Aplicação**

A infraestrutura do projeto inclui:

- **Back:**
  - Node.js
  - JWT
  - Sequelize
  - Swagger
  - Jest
  - ESLint
  - CORS
- **Front:**
  - Next.js
  - Tailwind CSS
  - Radix UI + shadcn/ui
  - Framer Motion
  - Sonner Toast
  - Lucide-react
  - React Hook Form + Zod
  - Zustand
  - ESLint
- **Design:** Figma / Canva
- **BD:** PostgreSQL
- **Docs:** Google Docs compartilhado
- **Infraestrutura:** VPS Ubuntu na Hostinger com Coolify
- **Docker:** Dockerfile
- **CDN:** Firebase
- **Versionamento:** Git

### **Infraestrutura**
- VPS Ubuntu (Hostinger)
- Coolify para deploy
- Firebase CDN
- PostgreSQL
- Nginx

## **Começando**

### **Pré-requisitos**
- Node.js 18+
- PostgreSQL 15+
- npm

### **Configuração do Ambiente**

1. Clone o repositório:
```bash
git clone https://github.com/paivs/liszt.git
cd liszt
```

2. Configure as variáveis de ambiente:
```bash
# Backend
cd backend
cp .env.example .env
# Configure as variáveis no .env

# Frontend
cd ../frontend
cp .env.example .env
# Configure as variáveis no .env
```

3. Instale as dependências:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

4. Inicie o banco de dados:
```bash
cd bd
docker build -t liszt-postgres .

docker run -d --name liszt-db -e POSTGRES_DB=liszt  -e POSTGRES_USER=liszt_user -e POSTGRES_PASSWORD=supersecret -p 5432:5432 liszt-postgres
```

5. Inicie os serviços:
```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev
```

## **Documentação**

- [Infraestrutura](/docs/infraestrutura.md)
- [Roadmap](/docs/roadmap.md)
- **API:** [http://localhost:8085/api-docs](http://localhost:8085/api-docs) (Swagger)

## **Desenvolvimento**

### **Estrutura do Projeto**

```
liszt/
├── backend/         # API Node.js
├── frontend/        # Aplicação Next.js
├── docs/            # Documentação
└── tests/           # Testes
```

### **Padrões de Código**
- **ESLint** para linting
- **Prettier** para formatação
- **Conventional Commits**

## **Deploy**

O deploy é feito automaticamente via **Coolify** sempre que há um push na branch `main`. Os Dockerfiles necessários estão na raiz de cada projeto (**frontend**/**backend**).

## Estrutura de Branches

### main
- Ambiente de produção
- Contém o código estável e testado que está em produção
- Apenas código que passou por todos os testes e homologação deve ser mergeado aqui

### staging
- Ambiente de homologação
- Usada para testes de integração e homologação
- Código das features será mergeado aqui primeiro para testes antes de ir para produção

## Fluxo de Trabalho

1. **Desenvolvimento**
   - Criar branches de feature a partir de staging
   - Nomear branches seguindo o padrão: `feature/nome-da-feature`
   - Desenvolver e testar localmente

2. **Homologação**
   - Mergear features para staging para testes
   - Realizar testes de integração
   - Validar funcionalidades

3. **Produção**
   - Após validação em staging
   - Mergear de staging para main
   - Deploy para produção

## Comandos Git Úteis

```bash
# Criar nova branch de feature
git checkout staging
git pull origin staging
git checkout -b feature/nome-da-feature

# Atualizar branch com staging
git checkout staging
git pull origin staging
git checkout feature/nome-da-feature
git merge staging

# Enviar feature para homologação
git checkout staging
git merge feature/nome-da-feature
git push origin staging

# Enviar para produção
git checkout main
git merge staging
git push origin main
```

## Boas Práticas

- Sempre mantenha sua branch atualizada com staging
- Faça commits pequenos e descritivos
- Resolva conflitos em sua branch antes de fazer merge
- Teste suas alterações antes de enviar para staging
- Mantenha a comunicação clara sobre o status das features

## **Licença**
Este projeto está licenciado sob a **GNU General Public License v3.0** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
