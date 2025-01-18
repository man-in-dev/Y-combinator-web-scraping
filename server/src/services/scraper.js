import axios from 'axios';
import * as cheerio from 'cheerio';
import { sub } from 'date-fns';

import db from '../config/db.js';

// Function to convert relative time to a Date object
const parseRelativeTime = (relativeTime) => {
    const [value, unit] = relativeTime.split(' ');
    return sub(new Date(), { [unit]: parseInt(value) });
};

const scrapeHackerNews = async () => {
    try {
        const { data: html } = await axios.get('https://news.ycombinator.com/');

        // Load the HTML into Cheerio
        const $ = cheerio.load(html);

        // Array to hold the scraped data
        const data = [];
        let news = [];

        $('#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr').each((index, element) => {
            data.push($.html(element));
        });

        for (let i = 0; i < data.length - 2; i += 3) {
            const title = $(data[i]).find('.titleline > a').text();
            const url = $(data[i]).find('.titleline > a').attr('href');
            const siteName = $(data[i]).find('.titleline span a span').text();
            const author = $(data[i + 1]).find('.hnuser').text();
            const publishTime = $(data[i + 1]).find('.age').text();


            const existingNews = await db.query('SELECT * FROM news WHERE title = ? AND url = ?', [title, url]);

            if (existingNews[0].length === 0) {
                news.push({
                    title,
                    url,
                    siteName,
                    author,
                    publishTime
                });
            }
        }

        // Save to database
        for (const n of news) {
            await db.query(
                `INSERT INTO news (title, url, siteName, author, publishTime)
                VALUES (?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE publishTime = VALUES(publishTime)`,
                [n.title, n.url, n.siteName, n.author, parseRelativeTime(n.publishTime)]
            );
        }

        return news;
    } catch (error) {
        console.error('Error scraping Hacker News:', error);
    }
};

export default scrapeHackerNews;
