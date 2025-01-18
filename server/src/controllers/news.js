import db from "../config/db.js";

export const getNews = async (req, res) => {
    const stories = await db.query(`SELECT * FROM news`);
    res.json({ success: true, data: stories[0] });
}