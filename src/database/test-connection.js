// Load the correct .env file based on NODE_ENV
const envFile = process.env.NODE_ENV === 'development' ? '.env.development' : '.env';
require('dotenv').config({ path: envFile });

const db = require('./database');

async function testConnection() {
  try {
    await db.raw('SELECT 1');
    console.log(`Database connection successful! (${process.env.NODE_ENV} environment)`);
    console.log('Connection details:', {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      port: process.env.DB_PORT
    });
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await db.destroy();
  }
}

testConnection(); 