import cors from 'cors';
import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

// enviroment configuration
dotenv.config()

// modules
import setupDatabase from './config/createDatabse.js';
import handleSocketConnection from './config/socket.js';
import scrapeHackerNews from './services/scraper.js';
import newRoutes from './routes/news.js';

//setup databse
setupDatabase();

// app initializaton
const app = express();
const PORT = process.env.PORT || 8000;

// server configuration
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    },
});

app.use(cors())
app.use(express.json());

app.use('/api/v1', newRoutes);

// Setup WebSocket
handleSocketConnection(io);

// Periodic scraping
setInterval(async () => {
    const newNews = await scrapeHackerNews();
    if (newNews?.length !== 0) io.emit('new_news', newNews);
}, 5 * 1000);

//starting server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
