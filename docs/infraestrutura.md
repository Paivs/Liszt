# Infraestrutura do Neuman

## Visão Geral
O Neuman é hospedado em uma VPS Ubuntu na Hostinger e utiliza Coolify para deploy. A arquitetura é composta por:

- Frontend (Next.js)
- Backend (Node.js)
- Banco de dados (MySQL)
- CDN (Firebase Storage)

## Componentes

### Frontend
- **Tecnologia**: Next.js
- **Deploy**: Dockerfile via Coolify
- **URL**: [A ser definida]
- **Dependências principais**:
  - Tailwind CSS para estilização
  - Radix UI + shadcn/ui para componentes
  - Framer Motion para animações
  - React Hook Form + Zod para formulários
  - Zustand para gerenciamento de estado

### Backend
- **Tecnologia**: Node.js
- **Deploy**: Dockerfile via Coolify
- **Porta**: 8085
- **Endpoints**: Documentação disponível via Swagger em `/api-docs`

### Banco de Dados
- **Tecnologia**: PostGres
- **Porta**: 5432
- **Backup**: [Definir estratégia] 
- **Persistência**: Volume Docker

### CDN
- **Serviço**: Firebase Storage
- **Uso**: Armazenamento de documentos e arquivos
- **Segurança**: Regras de acesso configuradas no Firebase

## Deploy

### Processo de Deploy
1. Push para a branch main
2. Coolify detecta alterações
3. Build do Dockerfile
4. Deploy automático

## Monitoramento
[A ser definido - Quais ferramentas serão usadas para monitoramento?]

## Backup
[A ser definido - Qual será a estratégia de backup?]

## Segurança
- HTTPS em todas as conexões
- Tokens JWT para autenticação
- Regras de firewall na VPS
- Secrets gerenciados pelo Coolify

## Escalabilidade
[A ser definido - Como o sistema pode escalar?] 