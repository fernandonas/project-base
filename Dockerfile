FROM node:latest AS angular

WORKDIR /app
COPY package.json package-lock.json* ./ 
RUN npm install
COPY . . 
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular /app/dist/project-base/browser /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 4200

CMD ["nginx", "-g", "daemon off;"]