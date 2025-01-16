# Etapa 1: Construção do Angular App
FROM node:18 AS builder

WORKDIR /app

# Copiar os arquivos do projeto Angular
COPY ./package*.json ./
RUN npm install

# Copiar os outros arquivos do projeto
COPY ./ /app

# Etapa 2: Servir a aplicação
FROM node:18

WORKDIR /app

# Instalar o Angular CLI globalmente
RUN npm install -g @angular/cli@13

# Copiar o diretório do builder (com dependências já instaladas)
COPY --from=builder /app /app

# Expor a porta 4200 para o Angular
EXPOSE 4200

# Comando para rodar o Angular com proxy
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--proxy-config", "proxy.conf.json"]
