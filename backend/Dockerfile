FROM node:22
WORKDIR /app
COPY package*.json ./
# RUN npm install -g @nestjs/cli
# RUN npm install @nestjs/sequelize sequelize sequelize-typescript pg pg-hstore
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "start:prod"]
