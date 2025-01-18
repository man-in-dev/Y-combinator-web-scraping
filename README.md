# Hacker News Real-Time Scraper

A Node.js service to periodically scrape real-time stories from [Hacker News](https://news.ycombinator.com/), broadcast updates to connected users via WebSocket, and store the data in a MySQL database.  

---

## Features

- **Real-Time Scraping**: Periodically scrapes the latest stories from Hacker News.
- **WebSocket Updates**: Streams new stories in real-time to connected clients.
- **Data Storage**: Saves stories in a MySQL database, ensuring no duplicates and keeping timestamps updated.
- **Efficient Data Management**: Handles duplicate entries and keeps data up-to-date with `ON DUPLICATE KEY UPDATE`.

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/hacker-news-scraper.git
   cd hacker-news-scraper
2. Navigate inside server folder and run npm install.
3. Inside server add .env file, take inspiration from .env.example.
4. Now get out from server folder.
5. Navigate to client folder and run npm install
6. open the site on localhost, you will get the list of news.

## API
- /api/v1/news: Fetch all News.
