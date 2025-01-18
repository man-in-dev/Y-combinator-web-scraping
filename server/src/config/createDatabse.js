import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        const connection = await pool.getConnection();

        // Create the database if it doesn't exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS hacker_news`);
        console.log("Database 'hacker_news' created or already exists.");
        connection.release();

        // Close the initial pool
        await pool.end();

        // Create a new pool to connect to the hacker_news database
        const dbPool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'hacker_news',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        // Create the 'stories' table
        const createTableQuery = `
              CREATE TABLE IF NOT EXISTS news (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          url VARCHAR(255) NOT NULL,
          siteName VARCHAR(255) NOT NULL,
          author VARCHAR(255) NOT NULL,
          publishTime VARCHAR(255) NOT NULL
        );
       `;
        await dbPool.query(createTableQuery);
        console.log("Table 'stories' created or already exists.");

        // Close the new pool
        await dbPool.end();
        console.log('Database setup complete!');
    } catch (error) {
        console.error('Error setting up the database:', error.message);
    }
}

export default setupDatabase;
