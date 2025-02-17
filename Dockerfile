# Estágio 1: Construir a aplicação Angular
FROM node:latest AS angular

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Servir a aplicação com Nginx
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular /app/dist/project-base /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf