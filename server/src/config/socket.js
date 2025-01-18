import db from './db.js';

const handleSocketConnection = (io) => {
    io.on('connection', async (socket) => {
        console.log('Client connected:', socket.id);

        // Send number of news published in the last 5 minutes
        const [rows] = await db.query(
            `SELECT * FROM news WHERE publishTime >= NOW() - INTERVAL 5 MINUTE`
        );
        socket.emit('last_5_min_news', { news: rows });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};

export default handleSocketConnection;
