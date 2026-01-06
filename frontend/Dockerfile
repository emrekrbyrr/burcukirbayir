FROM node:20-alpine AS build

WORKDIR /app/frontend

COPY package.json yarn.lock* /app/frontend/
RUN yarn install --frozen-lockfile

COPY . /app/frontend/
RUN yarn build


FROM nginx:1.25-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
