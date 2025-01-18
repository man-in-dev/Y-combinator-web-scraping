require("dotenv").config();
const cors = require('cors');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const handleSocketConnection = require('./config/socket');
const scrapeHackerNews = require('./services/scraper');
const newRoutes = require('./routes/news');

const app = express();
const PORT = process.env.PORT || 8000;
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

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
