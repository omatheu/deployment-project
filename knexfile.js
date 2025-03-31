const path = require('path');

// Load the correct .env file based on NODE_ENV
const envFile = process.env.NODE_ENV === 'development' ? '.env.development' : '.env';
require('dotenv').config({ path: envFile });

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: path.join(__dirname, 'src', 'database', 'migrations')
  },
  seeds: {
    directory: path.join(__dirname, 'src', 'database', 'seeds')
  }
};

module.exports = {
  development: {
    ...baseConfig,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    },
    debug: true
  },

  production: {
    ...baseConfig,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}; 