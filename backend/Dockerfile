# Etapa 1 — Imagem base
FROM node:18-alpine

# Etapa 2 — Diretório da aplicação
WORKDIR /usr/src/app

# Etapa 3 — Copia package.json e instala dependências
COPY package*.json ./

# Instala apenas dependências de produção
RUN npm install --omit=dev

# Etapa 4 — Copia o restante do código
COPY . .

# Etapa 5 — Expõe a porta (ajuste se necessário)
EXPOSE 8085

# Etapa 6 — Comando para rodar o servidor
CMD ["npm", "start"]
