
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

## **Licença**
Este projeto está licenciado sob a **GNU General Public License v3.0** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
