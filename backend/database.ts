import { Sequelize } from 'sequelize-typescript';
// Create a new instance of Sequelize
const sequelize = new Sequelize({
  database: 'postgres',             // Database name
  username: 'your_username',        // Database username
  password: 'your_password',        // Database password
  host: 'postgres',                 // Host (use 'postgres' for Docker or 'localhost' for local)
  dialect: 'postgres',              // Database dialect
  models: [__dirname + '/models'],  // Path to your models directory
  logging: false,                   // Disable logging; enable if debugging
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
