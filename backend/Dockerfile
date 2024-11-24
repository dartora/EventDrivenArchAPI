FROM node:22
WORKDIR /app
COPY package*.json ./
# RUN npm install -g @nestjs/cli
# RUN npm install @nestjs/sequelize sequelize sequelize-typescript pg pg-hstore
RUN npm install
COPY . .
COPY .env ./
# Build the application (if necessary)
RUN npm run build
EXPOSE 8080
# Start the application
CMD ["npm", "run","start:prod"]
