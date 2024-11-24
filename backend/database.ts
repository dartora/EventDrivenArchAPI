import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';


const configService = new ConfigService(); // Create an instance of ConfigService

// Create a new instance of Sequelize
const sequelize = new Sequelize({
  database: configService.get<string>('DB_NAME'), // Database name
  username: configService.get<string>('DB_USERNAME'), // Database username
  password: configService.get<string>('DB_PASSWORD'), // Database password
  host: configService.get<string>('DB_HOST'), // Host (use 'postgres' for Docker or 'localhost' for local)
  dialect: configService.get<'postgres' | 'mysql' | 'sqlite' | 'mssql'>('DB_DIALECT'), // Database dialect
  models: [__dirname + '/models'], // Path to your models directory
  logging: false, // Disable logging; enable if debugging
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
