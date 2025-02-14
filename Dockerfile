# Usa a imagem oficial do Node.js
FROM node:16

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de dependência para o contêiner
COPY package*.json ./

# Instala as dependências
RUN npm install --legacy-peer-deps

# Copia o restante do código para o contêiner
COPY . .

# Gera o build da aplicação
RUN npm run build

# Exponde a porta 4200
EXPOSE 4200

# Comando para rodar a aplicação Angular
CMD ["npm", "start"]
