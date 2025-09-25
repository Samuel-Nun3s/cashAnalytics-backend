# Imagem base
FROM node:20-alpine

# Diretorio de trabalho
WORKDIR /app

# Instala dependencias de build (ex: Prisma pode precisar de openssl)
RUN apk add --no-cache openssl

# Copiar arquivos de dependencias primeiro (melhor cache das camadas)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar codigo
COPY . .

# Gerar cliente Prisma (apos copiar schema)
RUN npx prisma generate

# Expor a porta da API
EXPOSE 3000

# Comando de start
CMD ["npm", "run", "dev"]