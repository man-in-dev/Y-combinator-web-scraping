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
   git clone https://github.com/man-in-dev/Y-combinator-web-scraping.git
   cd Y-combinator-web-scraping
2. open new terminal and navigate to server folder and run the below command.
   ```bash
    npm install
3. Inside server add .env file, take inspiration from .env.example.
4. Inside server run the below command.
   ```bash
   npm run dev
5. Now open new terminal and navigate to client folder.
6. Inside client folder run the below command.
   ```bash
   npm install
   npm run dev.
7. open the site on localhost, you will get the list of news.

## API
- /api/v1/news: Fetch all News.
