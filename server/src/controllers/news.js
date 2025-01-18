const db = require("../config/db")

const getNews = async (req, res) => {
    const stories = await db.query(`SELECT * FROM news`);
    res.json({ success: true, data: stories[0] });
}

module.exports = {
    getNews
}