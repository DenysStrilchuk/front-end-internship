FROM node:22.3.0 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Передаємо змінну середовища під час збірки
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
