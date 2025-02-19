# Estágio 1: Build da aplicação
FROM node:18 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de definição de dependências
COPY package.json package-lock.json* ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o projeto NestJS
RUN npm run build

# Estágio 2: Execução da aplicação
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos necessários do estágio de build
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]