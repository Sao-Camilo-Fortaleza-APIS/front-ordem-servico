# Apenas o estágio de build é necessário
FROM node:18-alpine

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos de dependências
COPY package.json package-lock.json ./

# Instalando dependências
RUN npm ci

# Copiando o resto dos arquivos do projeto
COPY . .

# Gerando build de produção
RUN npm run build

# Verificando se a pasta dist foi criada e tem arquivos
RUN ls -la dist && test -f dist/index.html

# Instalando serve para disponibilizar os arquivos estáticos
RUN npm install -g serve

# Expondo a porta (pode ser alterada conforme necessidade)
EXPOSE 5175

# Comando para servir os arquivos estáticos
CMD ["serve", "-s", "dist", "-l", "5175", "--cors"]